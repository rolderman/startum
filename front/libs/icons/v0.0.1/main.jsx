import {
    IconUsers,
    IconMessages
} from '@tabler/icons-react'

function GetIcon(iconName) {
    switch (iconName) {
        case 'IconUsers': return IconUsers
        case 'IconMessages': return IconMessages
    }
}

export default GetIcon