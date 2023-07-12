import init from "./kuzzle/v0.0.5/init"

const initBackend = async () => {
    const { backendType, project, envVersion, debug } = window.Rolder.params
    switch (backendType) {
        case 'kuzzle':
            const Kuzzle = init({ project, envVersion })
            try {
                await Kuzzle.connect()
                window.Kuzzle = Kuzzle

                if (debug > 0) console.log('Kuzzle initialized: ' + project + '-' + envVersion)
            } catch (error) {
                console.error(error.message)
            }
            break
    }
}

export default initBackend