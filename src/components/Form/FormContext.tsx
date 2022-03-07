import React from "react"
export interface FieldContextType {
  getFieldValue: (name: string) => any
  getFieldsValue: (name: string) => any
  setFieldsValue: (store: any) => void
  initEntityValue: (fields: any) => void
}
const FieldContext = React.createContext<FieldContextType>({
  getFieldValue: (name) => {},
  getFieldsValue: (name) => {},
  setFieldsValue:(store) => {},
  initEntityValue:(fieldEntities: any) => {},
})
export default FieldContext