import React from 'react';
import { Callbacks, FieldEntity, FormInstance } from './interface';
const FieldContext = React.createContext<FormInstance>({
  getFieldValue: name => {},
  setFieldsValue: store => {},
  registerField: (fieldEntities: FieldEntity) => {},
  submit: () => {},
  setCallbacks: (callbacks: Callbacks) => {},
});
export default FieldContext;
