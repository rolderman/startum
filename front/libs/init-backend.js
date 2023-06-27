import kuzzle from './kuzzle/v0.0.3/main'

const initBackend = async (backendType, props) => {
    const { project, envVersion } = props
    switch (backendType) {        
        case 'kuzzle':
            const Kuzzle = kuzzle.init({ project, envVersion })
            try {
                await Kuzzle.connect()
                window.Kuzzle = Kuzzle
                if (window.Rolder.params.debug > 0) console.log('Kuzzle initialized: ' + project + '-' + envVersion)
            } catch (error) {
                console.error(error.message)
            }
            break
    }
}

export default initBackend