import Noodl from "@noodl/noodl-sdk"
import { convertOne } from "./convert"
import useData from '../../use-data/v0.0.2/use-data'
import { classVersion, dbVersion } from "../../use-data/v0.0.2/versions"

export const subscribe = Noodl.defineNode({
  category: 'Backend',
  name: 'rolder-kit.subscribe_v1',
  displayName: 'Subscribe_v1',
  inputs: {},
  outputs: {},
  dynamicports: [],
  signals: {
    Subscribe: () => {
      const { classes, debug } = window.Rolder.params

      if (classes) {
        let subscribedClasses = []
        Object.keys(classes).forEach(className => {
          if (classes[className].subscribe) {
            const index = dbVersion()
            const classNameV = classVersion(className)

            Kuzzle.realtime.subscribe(index, classNameV, {},
              notif => {
                if (notif.type !== 'document') return
                if (debug > 1) console.log('new ' + classNameV + ' recieved:', convertOne(notif.result))
                useData.invalidate({className})
              }
            )
            subscribedClasses.push(classNameV)
          }
        })
        if (debug > 1) console.log('Subscribed to: ', subscribedClasses)
      }
    }
  }
})