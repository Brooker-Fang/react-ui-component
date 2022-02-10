import classNames from "classnames"
import React, { useState } from "react"
import { FunctionComponentElement, useContext } from "react"
import { MenuItemProps } from "."
import Icon from "../Icon/Icon"
import { MenuContext } from "./Menu"
import Transition from "../Transition"
export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenu as string[]
  const { className, index, title, children } = props
  const isOpened = index && context.mode === "vertical" ? openedSubMenus.includes(index) : false
  const [open, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': open,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }
  let timer: any
  const handleMouse = (e:React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 0)
  }
  const clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvent = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}
  const renderChildren = () => {
    if(!open) {
      return null
    }
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': open
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: index + '-' + i
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem')
      }
    })
    return (
      <Transition in={open} timeout={1000} animation="zoom-in-top">
        <ul className={subMenuClasses} >
        {childrenComponent}
      </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = "SubMenu"
export default SubMenu