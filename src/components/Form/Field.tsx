import React, { ReactElement } from "react"
import FieldContext from "./FormContext"
interface Props{
  name: string
  rules?: any
}
export interface FieldState {
  name: string
}
class Field extends React.Component<Props, FieldState> {
  static contextType  = FieldContext
  constructor(props: Props) {
    super(props)
    // const { initEntityValue } = this.context
    // initEntityValue(this)
  }
  componentDidMount() {
    const { initEntityValue } = this.context
    initEntityValue(this)
    
  }
  onStoreChange = () => {
    this.forceUpdate()
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
    console.info('render')
    const {children} = this.props
    const returnChildNode = React.cloneElement(children as ReactElement, this.getControlled())
    return returnChildNode
  }
}
export default Field