import { notifications } from '@mantine/notifications'
import Noodl from "@noodl/noodl-sdk"
import { enums } from '../../../../../helpers/noodl/v0.0.2/props'

const notificationNode = Noodl.defineNode({
  category: 'Notification',
  name: 'rolder-kit.notification_v1',
  displayName: 'Notification_v1',
  inputs: {
    title: { type: 'string', displayName: 'Title', group: 'Notification' },
    message: { type: 'string', displayName: 'Message', group: 'Notification' },
    autoClose: { type: 'number', displayName: 'Autoclose (ms)', group: 'Notification' },
    color: { type: { name: 'enum', enums: enums.colors }, displayName: 'Color', group: 'Style' },
  },
  outputs: {},
  dynamicports: [],
  signals: {
    Show: function () {
      notifications.show({
        title: this.inputs.title,
        message: this.inputs.message,
        color:this.inputs.color
      })
    }
  }
})

export default notificationNode