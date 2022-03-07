import { useRef } from "react"

type StoreProps =  {
  [key in string]: any
}
class FormStore {
  private store:StoreProps = {}
  private fieldEntities: any[] = []
  constructor() {
    this.store = {}
    // 组件实例
    this.fieldEntities = []
  }
  initEntityValue = (fieldEntities: any) => {
    this.fieldEntities.push(fieldEntities)
  }
  getFieldValue = (name: keyof StoreProps) => {
    return this.store[name]
  }
  getFieldsValue = () => {
    return {...this.store}
  }
  setFieldsValue = (newStore: Partial<StoreProps>) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach(key => {
        if(key === entity.props.name) {
          entity?.onStoreChange()
        }
      })
    })
  }
  submit = () => {

  }
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      initEntityValue: this.initEntityValue,
      submit: this.submit
    }
  }
}
const useForm = (form?: any) => {
  const formRef = useRef<any>()
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