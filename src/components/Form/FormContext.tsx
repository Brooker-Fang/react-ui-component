import React from "react"
interface StoreInstance {
  getFieldValue: (name: string) => any
  setFieldsValue: (store: any) => void
  setFieldEntities: (fields: any) => void
}
const FieldContext = React.createContext<StoreInstance>({
  getFieldValue: (name) => {},
  setFieldsValue:(store) => {},
  setFieldEntities:(fieldEntities: any) => {},
})
export default FieldContext