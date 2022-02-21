import React from "react";
import { Callbacks, FieldEntity, FieldError, FormInstance, InternalFormInstance, InternalHooks, InternalNamePath, Store, StoreValue, ValidateMessages } from "./interface";

interface UpdateAction {
  type: 'updateValue';
  namePath: InternalNamePath;
  value: StoreValue;
}

interface ValidateAction {
  type: 'validateField';
  namePath: InternalNamePath;
  triggerName: string;
}

export type ReducerAction = UpdateAction | ValidateAction;
export class FormStore {
  private formHooked: boolean = false;

  private forceRootUpdate: () => void;

  private subscribable: boolean = true;

  private store: Store = {};

  private fieldEntities: FieldEntity[] = [];

  private initialValues: Store = {};

  private callbacks: Callbacks = {};

  private validateMessages: ValidateMessages = null;

  private preserve?: boolean = null;

  private lastValidatePromise: Promise<FieldError[]> = null;
  constructor(forceRootUpdate : ()=> void) {
    this.forceRootUpdate = forceRootUpdate
  }
  public getForm = (): InternalFormInstance => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    getFieldError: this.getFieldError,
    getFieldWarning: this.getFieldWarning,
    getFieldsError: this.getFieldsError,
    isFieldsTouched: this.isFieldsTouched,
    isFieldTouched: this.isFieldTouched,
    isFieldValidating: this.isFieldValidating,
    isFieldsValidating: this.isFieldsValidating,
    resetFields: this.resetFields,
    setFields: this.setFields,
    setFieldsValue: this.setFieldsValue,
    validateFields: this.validateFields,
    submit: this.submit,

    getInternalHooks: this.getInternalHooks,

  })
  private getInternalHooks = (key: string): InternalHooks | null => {
    if(key === HOOK_MARK)
  }
}
function useForm<Values = any> (form?: FormInstance<Values>): [FormInstance<Values>] {
  const formRef = React.useRef<FormInstance>()
  const [, forceUpdate] = React.useState({})
  if(!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const forceReRender = () => {
        forceUpdate({})
      }
      const formStore: FormStore = new FormStore(forceReRender)
      formRef.current = formStore.getForm()
    }
  }
  return [formRef.current]
}
export default useForm