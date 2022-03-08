import React from "react"
import { Callbacks, FormInstance } from "./interface"
const FieldContext = React.createContext<FormInstance>({
  getFieldValue: (name) => {},
  setFieldsValue:(store) => {},
  registerField:(fieldEntities: any) => {},
  submit: () => {},
  setCallbacks: (callbacks: Callbacks) => {}
})
export default FieldContext