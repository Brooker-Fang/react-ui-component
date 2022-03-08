import FieldContext from "./FormContext"
import { FormInstance, Store } from "./interface";
import useForm from "./useForm"



type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
interface FormProps<Values = any> extends BaseFormProps{
  initialValues?: Store;
  form: FormInstance<Values>;
  onFinish: (values: any) => void
  onFinishFailed: (error: any) => void
}
const Form: React.FC<FormProps> = (props) => {
  const { initialValues, onFinish, onFinishFailed, form } = props
  const [formInstance] = useForm(form)
  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  })
  if(initialValues) {
    formInstance.setFieldsValue(initialValues)
  }
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
