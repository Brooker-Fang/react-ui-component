import FieldContext from './FieldContext';
import { FormProps } from './interface';
import useForm from './useForm';

const Form: React.FC<FormProps> = props => {
  const { initialValues, onFinish, onFinishFailed, form } = props;
  const [formInstance] = useForm(form);
  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  if (initialValues) {
    formInstance.setFieldsValue(initialValues);
  }
  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>{props.children}</FieldContext.Provider>
    </form>
  );
};
export default Form;
