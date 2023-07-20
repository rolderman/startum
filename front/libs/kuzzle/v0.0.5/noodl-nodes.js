import Noodl from "@noodl/noodl-sdk"
import { convertOne } from "./convert"
import useData from '../../use-data/v0.0.2/use-data'
import { classVersion, dbVersion } from "../../use-data/v0.0.2/versions"
import update from './update'

export const updateNode = Noodl.defineNode({
  category: 'Backend',
  name: 'rolder-kit.update_v1',
  displayName: 'Update_v1',
  inputs: {
    item: { type: 'object', displayName: 'Data object', group: 'Data', tooltip: "Example: {className: 'task', id: 'task id', body: {...}}" },
  },
  outputs: {
    isUpdating: { type: 'boolean', displayName: 'Updating', group: 'Data', default: false },
    updated: { type: 'signal', displayName: 'Updated', group: 'Data' },
  },
  dynamicports: [],
  signals: {
    Update: async function () {
      this.setOutputs({ isUpdating: true })
      update(this.inputs.item)
        .then(() => {
          this.setOutputs({ isUpdating: false })
          this.sendSignalOnOutput('updated')
        })
    }
  }
})

export const subscribe = Noodl.defineNode({
  category: 'Backend',
  name: 'rolder-kit.subscribe_v1',
  displayName: 'Subscribe_v1',
  inputs: {},
  outputs: {},
  dynamicports: [],
  signals: {
    Subscribe: function () {
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
                useData.invalidate({ className })
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