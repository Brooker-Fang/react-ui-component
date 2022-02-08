import classNames from "classnames"
import React, { useState } from "react"
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
  const [open, setOpen] = useState(false)
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
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
    }, 300)
  }
  const clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvent = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onmouseleave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}
  const renderChildren = () => {
    if(!open) {
      return null
    }
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': open
    })
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "MenuItem") {
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem')
      }
    })
    return (
      <ul className={subMenuClasses} >
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = "SubMenu"
export default SubMenu