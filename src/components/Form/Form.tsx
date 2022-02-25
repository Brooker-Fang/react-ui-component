import FieldContext from "./FormContext"
import useForm from "./useForm"

interface FormProps{
  form: any
  onFinish: (values: any) => void
  onFinishFailed: (error: any) => void
}
const Form: React.FC<FormProps> = (props) => {
  const [formInstance] = useForm()
  return (
    <FieldContext.Provider value={formInstance}>{props.children}</FieldContext.Provider>
  )
} 
export default Form
