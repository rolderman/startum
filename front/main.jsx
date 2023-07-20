import { defineModule } from '@noodl/noodl-sdk'

// React nodes
import App from './App'
// organisms
import AuthNode from './react-nodes/organisms/auth/v0.0.5/main'
import AppShellNode from './react-nodes/organisms/app-shell/v0.0.4/app-shell'
import TableNode from './react-nodes/organisms/table/v0.0.3/Table'
import TableSNode from './react-nodes/organisms/table-s/v0.0.1/TableS'
import ETableNode from './react-nodes/organisms/e-table/v0.0.3/ETable'
import FormNode from './react-nodes/organisms/form/v0.0.4/Form'
// molecules
import FlexNode from './react-nodes/molecules/flex/v0.0.1/Flex'
import GroupNode from './react-nodes/molecules/group/v0.0.1/Group'
import StackNode from './react-nodes/molecules/stack/v0.0.1/Stack'
import DrawerNode from './react-nodes/molecules/drawer/v0.0.2/Drawer'
import RadioGroupNode from './react-nodes/molecules/radio-group/v0.0.2/RadioGroup'
import SwitchGroupNode from './react-nodes/molecules/switch-group/v0.0.1/SwitchGroup'
import CheckboxGroupNode from './react-nodes/molecules/checkbox-group/v0.0.2/CheckboxGroup'
import PopoverButtonNode from './react-nodes/molecules/popover-button/v0.0.1/PopoverButton'
import GridNode from './react-nodes/molecules/grid/v0.0.1/Grid'
import PaperNode from './react-nodes/molecules/paper/v0.0.1/Paper'
import PaperButtonNode from './react-nodes/molecules/paper-button/v0.0.1/PaperButton'
import ScrollAreaNode from './react-nodes/molecules/scroll-area/v0.0.1/ScrollArea'
import WebCameraNode from './react-nodes/molecules/web-camera/v0.0.1/WebCamera'
// elements
import AvatarNode from './react-nodes/elements/data-display/avatar/v0.0.2/Avatar'
import TextNode from './react-nodes/elements/typography/text/v0.0.2/Text'
import TextNode_v_0_1_0 from './react-nodes/elements/typography/text/v0.1.0/Text'
import TextNode_v_0_2_0 from './react-nodes/elements/typography/text/v0.2.0/Text'
import ActionIconNode from './react-nodes/elements/buttons/action-icon/v0.0.2/ActionIcon'
import TextInputNode from './react-nodes/elements/inputs/text-input/v0.0.2/TextInput'
import SelectSNode from './react-nodes/elements/inputs/select-s/v0.0.2/SelectS'
import SelectNode from './react-nodes/elements/inputs/select/v0.0.3/Select'
import MultiSelectSNode from './react-nodes/elements/inputs/multi-select-s/v0.0.2/MultiSelectS'
import DateTimePickerNode from './react-nodes/elements/inputs/date-time-picker/v0.0.2/DateTimePicker'
import SliderNode from './react-nodes/elements/inputs/slider/v0.0.3/Slider'
import AutocompleteNode from './react-nodes/elements/inputs/autocomplete/v0.0.1/Autocomplete'
import SegmentedControlNode from './react-nodes/elements/inputs/segmented-control/v0.0.1/SegmentedControl'
import CheckboxNode from './react-nodes/elements/inputs/checkbox/v0.0.2/Checkbox'
import ButtonNode from './react-nodes/elements/buttons/button/v0.0.1/Button'
import TextInputSNode from './react-nodes/elements/inputs/text-input-s/v0.0.1/TextInputS'
import BadgeNode from './react-nodes/elements/data-display/badge/v0.0.1/Badge'
import TextInputDebouncedNode from './react-nodes/elements/inputs/text-input-debounced/v0.0.1/TextInputDebounced'
import IconNode from './react-nodes/elements/data-display/icon/v0.0.1/Icon'
import DividerNode from './react-nodes/elements/miscellaneous/divider/v0.0.1/Divider'
import LoaderNode from './react-nodes/elements/feedback/loader/v0.0.1/Loader'
import ButtonNode_v_0_0_2 from './react-nodes/elements/buttons/button/v0.0.2/Button'

// Nodes
import { subscribe, updateNode } from './libs/kuzzle/v0.0.5/noodl-nodes'
import UseDataFetchNode from './libs/use-data/v0.0.2/UseDataFetch'
import UseDataCustomFetch from './libs/use-data/v0.0.2/UseDataCustomFetch'
import UseDataGetNode from './libs/use-data/v0.0.2/UseDataGet'
import UseDataMGetNode from './libs/use-data/v0.0.2/UseDataMGet'
import UseDataDeleteNode from './libs/use-data/v0.0.2/UseDataDelete'
import UseDataMDeleteNode from './libs/use-data/v0.0.2/UseDataMDelete'
import UseDataNode from './libs/use-data/v0.0.3/UseData'
import UseDataNode_v_0_1_0 from './libs/use-data/v0.0.4/UseData'
import notificationNode from './react-nodes/elements/feedback/notification/v0.0.1/motification'
import FormatValue_v_0_0_1 from './nodes/format-value/v0.0.1/format-value'

let nodes = [subscribe, updateNode, notificationNode, FormatValue_v_0_0_1]
let reactNodes = [
    App, UseDataFetchNode, UseDataCustomFetch, UseDataGetNode, UseDataMGetNode, UseDataDeleteNode, UseDataMDeleteNode, UseDataNode, UseDataNode_v_0_1_0,
    // organisms
    AuthNode, AppShellNode, FormNode, TableNode, ETableNode, TableSNode,
    // molecules
    FlexNode, StackNode, GroupNode, DrawerNode, RadioGroupNode, SwitchGroupNode, CheckboxGroupNode, PopoverButtonNode, GridNode, PaperNode, ScrollAreaNode, PaperButtonNode,
    WebCameraNode,
    // elements
    AvatarNode, TextNode, ActionIconNode, TextInputNode, SelectSNode, SelectNode, AutocompleteNode, MultiSelectSNode, IconNode, DividerNode, ButtonNode_v_0_0_2,
    DateTimePickerNode, SliderNode, SegmentedControlNode, CheckboxNode, ButtonNode, TextInputSNode, BadgeNode, TextInputDebouncedNode, LoaderNode, TextNode_v_0_1_0,
    TextNode_v_0_2_0
]

defineModule({
    name: 'rolder-kit',
    nodes,
    reactNodes,
    settings: [
        {
            name: 'backendType',
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
        { name: 'envVersion', type: 'string', displayName: 'Environment version', group: 'Connection', tooltip: "Examples: d2, s2, p3", },
        { name: 'project', type: 'string', displayName: 'Project name', group: 'Connection', tooltip: "Examples: rasko, tex" },
        { name: 'dbVersion', type: 'number', displayName: 'Database version', group: 'Connection', default: 1 },
        { name: 'classes', type: { name: 'string', codeeditor: 'json' }, displayName: 'Classes', group: 'Connection', tooltip: "Examples: [{product: {version: 1}}]" },
        { name: 'sessionTimeout', type: 'string', displayName: 'Session timeout', group: 'Auth', tooltip: "milliseconds lib format: 1m, 3d" },
        { name: 'detectColorScheme', type: 'boolean', displayName: 'Autodetect color scheme', group: 'Theme' },
        {
            name: 'colorScheme',
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
        }
    ],
})