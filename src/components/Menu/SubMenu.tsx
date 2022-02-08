import classNames from "classnames"
import React from "react"
import { FunctionComponentElement, useContext } from "react"
import { MenuItemProps } from "."
import { MenuContext } from "./Menu"

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { className, index, title, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "MenuItem") {
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem')
      }
    })
    return (
      <ul className="viking-submenu">
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes}>
      <div className="submenu-title">
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = "SubMenu"
export default SubMenu