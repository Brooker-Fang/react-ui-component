import { useRef } from 'react';
import { Callbacks, FieldEntity, FormInstance, Store } from './interface';

class FormStore {
  private store: Store = {};
  private fieldEntities: FieldEntity[] = [];
  private callbacks: Callbacks = {};
  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };
  registerField = (fieldEntities: FieldEntity) => {
    this.fieldEntities.push(fieldEntities);
  };
  getFieldValue = (name: keyof Store) => {
    return this.store[name];
  };
  getFieldsValue = () => {
    return { ...this.store };
  };
  setFieldsValue = (newStore: Store) => {
    const prevStore = { ...this.store };
    this.store = {
      ...this.store,
      ...newStore,
    };
    this.fieldEntities.forEach(entity => {
      entity?.onStoreChange(prevStore);
    });
  };
  submit = () => {
    const { onFinish } = this.callbacks;
    if (onFinish) {
      onFinish({ ...this.store });
    }
  };
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  };
}
function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const formRef = useRef<FormInstance>();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const store = new FormStore();
      formRef.current = store.getForm();
    }
  }
  return [formRef.current];
}
export default useForm;
