import { defineModule } from '@noodl/noodl-sdk'

import App from './App'
// organisms
import AuthNode from './comps/organisms/auth/v0.0.5/main'
import AppShellNode from './comps/organisms/app-shell/v0.0.4/app-shell'
import TableNode from './comps/organisms/table/v0.0.3/Table'
import TableSNode from './comps/organisms/table-s/v0.0.1/TableS'
import ETableNode from './comps/organisms/e-table/v0.0.3/ETable'
import FormNode from './comps/organisms/form/v0.0.4/Form'
// molecules
import FlexNode from './comps/molecules/flex/v0.0.1/Flex'
import GroupNode from './comps/molecules/group/v0.0.1/Group'
import StackNode from './comps/molecules/stack/v0.0.1/Stack'
import DrawerNode from './comps/molecules/drawer/v0.0.2/Drawer'
import RadioGroupNode from './comps/molecules/radio-group/v0.0.2/RadioGroup'
import SwitchGroupNode from './comps/molecules/switch-group/v0.0.1/SwitchGroup'
import CheckboxGroupNode from './comps/molecules/checkbox-group/v0.0.2/CheckboxGroup'
import PopoverButtonNode from './comps/molecules/popover-button/v0.0.1/PopoverButton'
import GridNode from './comps/molecules/grid/v0.0.1/Grid'
// elements
import AvatarNode from './comps/elements/data-display/avatar/v0.0.2/Avatar'
import TextNode from './comps/elements/typography/text/v0.0.2/Text'
import ActionIconNode from './comps/elements/buttons/action-icon/v0.0.2/ActionIcon'
import TextInputNode from './comps/elements/inputs/text-input/v0.0.2/TextInput'
import SelectSNode from './comps/elements/inputs/select-s/v0.0.2/SelectS'
import SelectNode from './comps/elements/inputs/select/v0.0.3/Select'
import MultiSelectSNode from './comps/elements/inputs/multi-select-s/v0.0.2/MultiSelectS'
import DateTimePickerNode from './comps/elements/inputs/date-time-picker/v0.0.2/DateTimePicker'
import SliderNode from './comps/elements/inputs/slider/v0.0.3/Slider'
import AutocompleteNode from './comps/elements/inputs/autocomplete/v0.0.1/Autocomplete'
import SegmentedControlNode from './comps/elements/inputs/segmented-control/v0.0.1/SegmentedControl'
import CheckboxNode from './comps/elements/inputs/checkbox/v0.0.2/Checkbox'
import ButtonNode from './comps/elements/buttons/button/v0.0.1/Button'
import TextInputSNode from './comps/elements/inputs/text-input-s/v0.0.1/TextInputS'
import BadgeNode from './comps/elements/data-display/badge/v0.0.1/Badge'
import TextInputDebouncedNode from './comps/elements/inputs/text-input-debounced/v0.0.1/TextInputDebounced'

// JS comps
import { subscribe } from './libs/kuzzle/v0.0.5/subscribe'
import UseDataFetchNode from './libs/use-data/v0.0.2/UseDataFetch'
import UseDataMGetNode from './libs/use-data/v0.0.2/UseDataMGet'
import UseDataCustomFetch from './libs/use-data/v0.0.2/UseDataCustomFetch'
import UseDataDeleteNode from './libs/use-data/v0.0.2/UseDataDelete'
import UseDataMDeleteNode from './libs/use-data/v0.0.2/UseDataMDelete'

let nodes = [subscribe]
let reactNodes = [
    App, UseDataFetchNode, UseDataCustomFetch, UseDataMGetNode, UseDataDeleteNode, UseDataMDeleteNode,
    // organisms
    AuthNode, AppShellNode, FormNode, TableNode, ETableNode, TableSNode,
    // molecules
    FlexNode, StackNode, GroupNode, DrawerNode, RadioGroupNode, SwitchGroupNode, CheckboxGroupNode, PopoverButtonNode, GridNode,
    // elements
    AvatarNode, TextNode, ActionIconNode, TextInputNode, SelectSNode, SelectNode, AutocompleteNode, MultiSelectSNode,
    DateTimePickerNode, SliderNode, SegmentedControlNode, CheckboxNode, ButtonNode, TextInputSNode, BadgeNode, TextInputDebouncedNode
]

defineModule({ name: 'rolder-kit', nodes, reactNodes })