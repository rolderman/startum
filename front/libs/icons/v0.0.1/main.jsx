import {
    IconCalendarEvent,
    IconListDetails,
    IconChartBar
} from '@tabler/icons-react'

function GetIcon(iconName) {
    switch (iconName) {
        case 'CalendarEvent': return IconCalendarEvent
        case 'ListDetails': return IconListDetails
        case 'ChartBar': return IconChartBar
    }
}

export default GetIcon