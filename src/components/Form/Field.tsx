import React, { ReactElement } from "react"
import FieldContext, { FieldContextType } from "./FormContext"
interface Props{
  name: string
  rules?: any
}
class Field extends React.Component<Props, FieldContextType> {
  static contextType  = FieldContext
  componentDidMount() {
    const { setFieldEntities } = this.context
    setFieldEntities(this)
    
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
// const Field: React.FC<Props> = (props) => {
//   const {children, name} = props
//   const context = useContext(FieldContext)
//   const [_, forceUpdate] = useState({})
//   const onStoreChange = () => {
//     forceUpdate({})
//   }
//   console.log(context)
//   const getControlled = () => {
//     const { getFieldValue, setFieldsValue } = context
//     return {
//       value: getFieldValue(name),
//       onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newValue = e.target.value
//         console.log(newValue)
//         setFieldsValue({ 
//           [name]: newValue,
//         })
//       }
//     }
//   }
//   const returnChildNode = React.cloneElement(children as ReactElement, getControlled())
//   return returnChildNode
// }
export default Field