import { FC } from "react"
import Menu, {MenuProps} from "./Menu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
export { MenuItem, SubMenu };
export type { MenuItemProps , MenuProps};
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuProps>
  SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu
export default TransMenu