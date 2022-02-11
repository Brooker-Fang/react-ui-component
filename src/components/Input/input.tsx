import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import Icon from "../Icon";
export type InputSize = "lg" | "sm"
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prepend?: string | ReactElement
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Input: React.FC<InputProps> = (props) => {
  const { className, children, disabled, size, prepend, append, style, icon, ...restProps } = props
  const classes = classNames('viking-input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControllerValue = (value: any) => {
    if (typeof value === "undefined" || value === "null") {
      return ''
    }
    return value
  }
  if ("value" in props) {
    delete restProps.defaultValue
    props.value = fixControllerValue(props.value)
  }
  return (
    <div className={classes} style={style}> 
      { prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      { icon && <div className="icon-wrapper"><Icon icon={icon} title={``}></Icon></div>}
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}
Input.defaultProps = {
  disabled: false
}
Input.displayName = "Input"
export default Input
