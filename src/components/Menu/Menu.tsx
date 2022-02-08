import classNames from "classnames"
import React from "react"
import { createContext, useState } from "react"
import { MenuItemProps } from "."

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void
export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
}
export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const classes = classNames(className, 'viking-menu', {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })
  const handlerClick = (index: string) => {
    setCurrentIndex(index)
    onSelect?.(index)
  }
  const passedContext: IMenuContext = {
    index: currentIndex ? currentIndex : '0',
    onSelect: handlerClick
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem')
      }
    }
    )
  }
  return <ul className={classes} style={style}>
    <MenuContext.Provider value={passedContext}>
      {renderChildren()}
    </MenuContext.Provider>
    
  </ul>
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}
export default Menu