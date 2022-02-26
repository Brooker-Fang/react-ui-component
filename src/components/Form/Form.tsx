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
    <form onSubmit={(e) => {
      e.preventDefault()
      formInstance.submit()
    }}>
      <FieldContext.Provider value={formInstance}>{props.children}</FieldContext.Provider>
    </form>
    
  )
} 
export default Form
