import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/index.prod.js'
import { useState, useRef } from 'react'
import { Notifications } from '@mantine/notifications'
import { useColorScheme, useShallowEffect, useTimeout } from '@mantine/hooks'
import { MantineProvider, Center, Loader } from '@mantine/core'
import Cookies from 'js-cookie'
import ms from 'ms'

import Ajv from "ajv"
window.ajv = new Ajv()

import initBackend from './libs/init-backend'

const queryClient = new QueryClient()
window.queryClient = queryClient
const urlParams = new URLSearchParams(window.location.search)
const debug = parseInt(urlParams.get('debug') || '0')

const App = {
	name: 'rolder-kit.app_v0.0.3',
	displayName: "App_v0.0.3",
	getReactComponent() {
		return function (props) {
			const rootRef = useRef()
			const { backendType = 'kuzzle', project, envVersion, sessionTimeout = '1d' } = props

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
						} else props.jwtValidationFailed()
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
				if (props.project && !initialized) {
					// load libs
					if (debug > 1) console.time('Initialize performance')
					window.Rolder = { params: { project, envVersion, backendType, debug, sessionTimeout } }
					if (debug > 1) console.log('Rolder:', window.Rolder)

					// init & connect backend
					initBackend(backendType, { project, envVersion })
						.then(() => {
							// validate JWT at first load
							validateJWT(sessionTimeout, true)
							setInitialized(true)
							if (debug > 1) console.timeEnd('Initialize performance')
						})
				}
			}, [props.project])

			let colorScheme = useColorScheme()
			if (!props.detectColorScheme) colorScheme = props.colorScheme

			return (
				<div ref={rootRef}>
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
						<Notifications />
						<QueryClientProvider client={queryClient}>
							{props.children}
							{debug > 0 && <ReactQueryDevtools />}
						</QueryClientProvider>
						<Center h='100vh'>
							{!initialized && <Loader size={64} />}
						</Center>
					</MantineProvider >
				</div>
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
		backendType: {
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
		sessionTimeout: { type: 'string', displayName: 'Session timeout', group: 'Auth', tooltip: "milliseconds lib format: 1m, 3d" },
		authenticated: { type: 'boolean', displayName: 'Authenticated', group: 'Auth' },
		detectColorScheme: { type: 'boolean', displayName: 'Autodetect color scheme', group: 'Theme' },
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
		},
	},
	outputProps: {
		jwtValidationFailed: { type: 'signal', displayName: 'JWT validation failed', group: 'Auth' },
		jwtValidationSucceed: { type: 'signal', displayName: 'JWT validation succeed', group: 'Auth' },
	}
}

export default App