import React from "react"
import FormContext from "./FormContext"
import { Callbacks, FieldData, FormInstance, Store, ValidateMessages } from "./interface"

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

type RenderProps = (values: Store, form: FormInstance) => JSX.Element | React.ReactNode

export interface FormProps<Values = any> extends BaseFormProps {
  initialValues?: Store
  form?: FormInstance<Values>
  children?: RenderProps | React.ReactNode
  component?: false | string | React.FC<any> | React.ComponentClass<any>
  fields?: FieldData[]
  name?: string
  validateMessage?: ValidateMessages
  onValuesChange?: Callbacks<Values>
  onFieldsChange?: Callbacks<Values>['onFieldsChange'];
  onFinish?: Callbacks<Values>['onFinish'];
  onFinishFailed?: Callbacks<Values>['onFinishFailed'];
  validateTrigger?: string | string[] | false;
  preserve?: boolean;
}
const Form: React.ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    name,
    initialValues,
    fields,
    form,
    preserve,
    children,
    component: Component = 'form',
    validateMessage,
    validateTrigger = 'onChange',
    onValuesChange,
    onFieldsChange,
    onFinish,
    onFinishFailed,
    ...restProps
  } : FormProps,
  ref,
) => {
  const formContext: FormContextProps = React.useContext(FormContext)
  const [formInstance] = useForm(form)
}
export default Form