export type StoreValue = any;
export type Store = Record<string, StoreValue>;
export interface FieldEntity {
  onStoreChange: (prevStore: Store) => void;
}
export interface FieldData {
  touched: boolean;
  validating: boolean;
  errors: string[];
  warnings: string[];
  value: StoreValue;
}
export type InternalNamePath = (string | number)[];
export interface ValidateErrorEntity<Values = any> {
  values: Values;
  errorFields: { name: InternalNamePath; errors: string[] }[];
  outOfDate: boolean;
}
export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}
export type NamePath = string;
export interface FormInstance<Values = any> {
  submit: () => void;
  setCallbacks: (callbacks: Callbacks) => void;
  getFieldValue: (name: NamePath) => StoreValue;
  setFieldsValue: (values: Partial<Values>) => void;
  registerField: (fieldEntities: any) => void;
}

export interface FieldProps {
  name: string;
}
export interface FieldState {}

export type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
export interface FormProps<Values = any> extends BaseFormProps {
  initialValues?: Store;
  form: FormInstance<Values>;
  onFinish: (values: any) => void;
  onFinishFailed: (error: any) => void;
}
