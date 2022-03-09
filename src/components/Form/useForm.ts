import { useRef } from "react"
import { Callbacks, FormInstance, Store } from "./interface";

type StoreProps =  {
  [key in string]: any
}
class FormStore {
  private store:StoreProps = {}
  private fieldEntities: any[] = []
  private callbacks: Callbacks = {};
  constructor() {
    this.store = {}
    // 组件实例
    this.fieldEntities = []
  }
  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };
  registerField = (fieldEntities: any) => {
    this.fieldEntities.push(fieldEntities)
  }
  getFieldValue = (name: keyof StoreProps) => {
    return this.store[name]
  }
  getFieldsValue = () => {
    return {...this.store}
  }
  setFieldsValue = (newStore: Store) => {
    const prevStore = {...this.store}
    this.store = {
      ...this.store,
      ...newStore
    }
    this.fieldEntities.forEach((entity) => {
      entity?.onStoreChange(prevStore);
    })
  }
  submit = () => {
    const { onFinish } = this.callbacks
    if(onFinish) {
      onFinish({...this.store})
    }
  }
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      setCallbacks: this.setCallbacks,
      submit: this.submit
    }
  }
}
function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const formRef = useRef<FormInstance>()
  if (!formRef.current) {
    if(form) {
      formRef.current = form
    } else {
      const store = new FormStore()
      formRef.current = store.getForm()
    }
  }
  return [formRef.current]
}
export default useForm