## rc-field-form 主要实现思路
+ 用数据仓库FormStore保存数据
+ 通过Context跨层级传递store实例，让每个表单可以通过store去修改、获取数据
+ 在表单挂载的时候，为每个表单订阅数据仓库的数据变化，当数据变化时通知表单更新
+ 将每个表单设置为受控组件，onChange时去改变数据仓库 store 的数据

## 简单实现

### 实现数据仓库管理数据
通过new FormStore创建管理数据的实例
```js
class FormStore {
  private store:Store = {}
  private fieldEntities: FieldEntity[] = []
  private callbacks: Callbacks = {};
  registerField = (fieldEntities: FieldEntity) => {
    this.fieldEntities.push(fieldEntities)
  }
  getFieldValue = (name: string) => {
    return this.store[name]
  }
  getFieldsValue = () => {
    return {...this.store}
  }
  // 遍历订阅组件，执行组件的onStoreChange
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
  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };
  // 暴露实例方法
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
```
通过useForm创建store实例，如果已经创建则返回已创建的实例
```js
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
```

### 通过Context跨层级传递store实例，让每个表单可以通过context获取数据仓库实例，在通过实例去设置或获取值
创建FieldContext
```js
const FieldContext = React.createContext<FormInstance>({
  getFieldValue: name => {},
  setFieldsValue: store => {},
  registerField: (fieldEntities: FieldEntity) => {},
  submit: () => {},
  setCallbacks: (callbacks: Callbacks) => {},
});
export default FieldContext;
```
Form组件初始化store实例，并通过FieldContext传递子组件

