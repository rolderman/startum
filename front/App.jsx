import { useState } from 'react'
import { Notifications } from '@mantine/notifications'
import { useColorScheme, useShallowEffect, useTimeout } from '@mantine/hooks'
import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { enums } from './helpers/noodl/v0.0.2/props'
import Cookies from 'js-cookie'
import ms from 'ms'

import clone from 'just-clone'
window.clone = clone

import mustache from 'mustache'
window.Mustache = mustache

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)
window.dayjs = dayjs

import { filterBy, setRefs } from './helpers/data/v0.0.2/data'
window.filterBy = filterBy
window.setRefs = setRefs

import initBackend from './libs/init-backend'
import ErrorHandler from './libs/error-handler/v0.0.1/ErrorHandler'

import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/index.prod.js'
const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			// 🎉 only show error toasts if we already have data in the cache which indicates a failed background update
			if (query.state.data !== undefined) ErrorHandler({ title: 'Системная ошибка!', message: error.message })
		},
	}),
})
window.queryClient = queryClient
const urlParams = new URLSearchParams(window.location.search)
const debug = parseInt(urlParams.get('debug') || '0')

const App = {
	name: 'rolder-kit.app_v0.0.4',
	displayName: "App_v0.0.4",
	getReactComponent() {
		return function (props) {
			const { notificationsPosition } = props
			const { backendType = 'kuzzle', envVersion, project, dbVersion = 1, sessionTimeout = '1d', classes: cls, detectColorScheme, colorScheme: cs } = Noodl.getProjectSettings()
			cls = cls && JSON.parse(cls)

			// vaildate and refresh JWT
			const { start } = useTimeout(() => validateJWT(sessionTimeout, false), ms(sessionTimeout) - 10000)
			const validateJWT = (sessionTimeout, initial) => {
				const jwtExpireDiff = Cookies.get('jwtExpiresAt') - Date.now()
				if (jwtExpireDiff > 0) {
					const jwt = Cookies.get('jwt')
					Kuzzle.connect()
					Kuzzle.auth.checkToken(jwt).then((response) => {
						if (response.valid) {
							// restore jwt if exist							
							if (initial) {
								Kuzzle.jwt = jwt
								props.jwtValidationSucceed()
							}
							// update jwt to keep alive          
							Kuzzle.auth.refreshToken({ sessionTimeout }).then((response) => {
								Cookies.set('jwt', response.jwt, { expires: 30 })
								Cookies.set('jwtExpiresAt', Date.now() + ms(sessionTimeout), { expires: 30 })
							})
							// repeat after sessionTimeout - sometime            
							start()
						} else {
							props.jwtValidationFailed()
						}
					})
					start()
				} else props.jwtValidationFailed()
			}
			// start refresh JWT after authenticated
			useShallowEffect(() => {
				if (props.authenticated) start()
			}, [props.authenticated])

			// initialization  
			const [initialized, setInitialized] = useState(false)
			useShallowEffect(() => {
				if (project && !initialized) {
					// load libs
					if (debug > 1) console.time('Initialize performance')
					window.Rolder = { params: { project, envVersion, backendType, dbVersion, classes: cls, debug, sessionTimeout } }
					if (debug > 1) console.log('Rolder:', window.Rolder)

					// data space
					Noodl.Object.create({
						id: 'Data'
					})

					// init & connect backend
					initBackend()
						.then(() => {
							// validate JWT at first load
							validateJWT(sessionTimeout, true)
							setInitialized(true)
							if (debug > 1) console.timeEnd('Initialize performance')
						})
				}
			}, [project])

			let colorScheme = useColorScheme()
			if (!detectColorScheme) colorScheme = cs

			return (
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme,
						defaultRadius: 'md',
						globalStyles: (theme) => ({
							body: {
								backgroundColor: colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
							}
						}),
					}
					}
				>
					<DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 1 }}>
						<Notifications position={notificationsPosition} />
						<QueryClientProvider client={queryClient}>
							{props.children}
							{debug > 0 && <ReactQueryDevtools />}
						</QueryClientProvider>
					</DatesProvider>
				</MantineProvider >
			)
		}
	},
	dynamicports: [
		{
			condition: "authenticated = false",
			inputs: [
				"authenticated",
			],
		},
	],
	inputProps: {
		/* backendType: {
			type: {
				name: 'enum',
				enums: [{
					value: 'parse',
					label: 'Parse'
				}, {
					value: 'kuzzle',
					label: 'Kuzzle'
				}]
			},
			displayName: 'Backend',
			group: 'Connection',
			default: 'kuzzle',
		},
		envVersion: { type: 'string', displayName: 'Environment version', group: 'Connection', tooltip: "Examples: d2, s2, p3", },
		project: { type: 'string', displayName: 'Project name', group: 'Connection', tooltip: "Examples: rasko, tex" },
		dbVersion: { type: 'number', displayName: 'Database version', group: 'Connection', default: 1 },
		classes: { type: 'array', displayName: 'Classes', group: 'Connection', tooltip: "Examples: [{product: {version: 1}}]" },
		sessionTimeout: { type: 'string', displayName: 'Session timeout', group: 'Auth', tooltip: "milliseconds lib format: 1m, 3d" }, */
		authenticated: { type: 'boolean', displayName: 'Authenticated', group: 'Auth' },
		/* detectColorScheme: { type: 'boolean', displayName: 'Autodetect color scheme', group: 'Theme' },
		colorScheme: {
			type: {
				name: 'enum',
				enums: [{
					value: 'light',
					label: 'Light'
				}, {
					value: 'dark',
					label: 'Dark'
				}]
			},
			displayName: 'Default color scheme',
			group: 'Theme',
			default: 'light',
		}, */
		notificationsPosition: { type: { name: 'enum', enums: enums.notificationsPositions }, displayName: 'Notifications position', group: 'Notifications', default: 'bottom-right' },
	},
	outputProps: {
		jwtValidationFailed: { type: 'signal', displayName: 'JWT validation failed', group: 'Auth' },
		jwtValidationSucceed: { type: 'signal', displayName: 'JWT validation succeed', group: 'Auth' },
	}
}

export default App