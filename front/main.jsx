import { defineModule } from '@noodl/noodl-sdk'

import App from './App'
// organisms
import AuthNode from './comps/organisms/auth/v0.0.5/main'
import AppShellNode from './comps/organisms/app-shell/v0.0.3/main'
import ETableNode from './comps/organisms/e-table/v0.0.1/main'
import FormNode from './comps/organisms/form/v0.0.2/main'
// molecules
import DrawerNode from './comps/molecules/drawer/v0.0.1/main'
// elements
import AvatarNode from './comps/elements/data-display/avatar/v0.0.1/main'
import TextNode from './comps/elements/typography/text/v0.0.1/main'
import ActionIconNode from './comps/elements/buttons/action-icon/v0.0.1/main'
import TextInputNode from './comps/elements/inputs/text-input/v0.0.1/main'
import AutocompleteNode from './comps/elements/inputs/autocomplete/v0.0.1/main'

let nodes = []
let reactNodes = [
    App,
    AuthNode, AppShellNode, ETableNode, FormNode,
    DrawerNode,
    AvatarNode, TextNode, ActionIconNode, TextInputNode, AutocompleteNode
]

defineModule({ name: 'rolder-kit', nodes, reactNodes })
