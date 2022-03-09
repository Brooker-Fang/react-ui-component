import React, { ReactElement } from "react"
import FieldContext from "./FormContext"
import { Store } from "./interface"
interface Props{
  name: string
}
export interface FieldState {}
class Field extends React.Component<Props, FieldState> {
  static contextType  = FieldContext
  componentDidMount() {
    const { registerField } = this.context
    registerField(this)
  }
  onStoreChange = (prevStore: Store) => {
    const { getFieldValue } = this.context
    const { name } = this.props
    const prevValue = prevStore[name]
    const curValue = getFieldValue(name)
    if (curValue !== prevValue) {
      this.forceUpdate()
      return;
    }
  }
  getControlled = () => {
    const { name } = this.props
    const { getFieldValue, setFieldsValue } = this.context
    return {
      value: getFieldValue(name),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setFieldsValue({ 
          [name]: newValue,
        })
      }
    }
  }
  render() {
    const {children} = this.props
    const returnChildNode = React.cloneElement(children as ReactElement, this.getControlled())
    return returnChildNode
  }
}
export default Field