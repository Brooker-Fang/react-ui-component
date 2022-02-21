import React from "react";
import { FieldData, FormInstance, Store, ValidateMessages } from "./interface";
export type Forms = Record<string, FormInstance>;
export interface FormChangeInfo {
  changeFields: FieldData[]
  forms: Forms
}
export interface FormFinishInfo {
  values: Store;
  forms: Forms;
}
export interface FormProviderProps {
  validateMessage?: ValidateMessages
  onFormChange?: (name: string, info: FormChangeInfo) => void
  onFormFinish?: (name: string, info: FormFinishInfo) => void
}
export interface FormContextProps extends FormProviderProps {
  triggerFormChange: (name: string, changedFields: FieldData[]) => void;
  triggerFormFinish: (name: string, values: Store) => void;
  registerForm: (name: string, form: FormInstance) => void;
  unregisterForm: (name: string) => void;
}
const FormContext = React.createContext<FormContextProps>({
  triggerFormChange: () => {},
  triggerFormFinish: () => {},
  registerForm: () => {},
  unregisterForm: () => {}
})
const FormProvider: React.FunctionComponent<FormProviderProps> = ({
  validateMessage,
  onFormChange,
  onFormFinish,
  children
}) => {
  const formContext = React.useContext(FormContext)
  const formsRef = React.useRef<Forms>({})
  return (
    <FormContext.Provider
      value={{
        ...formContext,
        validateMessage: {
          ...formContext.validateMessage,
          ...validateMessage
        },
        triggerFormChange: (name, changeFields) => {
          if(onFormChange) {
            onFormChange(name, {
              changeFields,
              forms: formsRef.current
            })
          }
          formContext.triggerFormChange(name, changeFields)
        },
        triggerFormFinish: (name, values) => {
          if (onFormFinish) {
            onFormFinish(name, {
              values,
              forms: formsRef.current,
            });
          }

          formContext.triggerFormFinish(name, values);
        },
        registerForm: (name, form) => {
          if(name) {
            formsRef.current = {
              ...formsRef.current,
              [name]: form
            }
          }
          formContext.registerForm(name, form)
        },
        unregisterForm: name => {
          const newForms = { ...formsRef.current };
          delete newForms[name];
          formsRef.current = newForms;

          formContext.unregisterForm(name);
        },
      }}
      >
        {children}
    </FormContext.Provider>
  )
}
export { FormProvider }
export default FormContext