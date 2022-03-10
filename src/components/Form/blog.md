## rc-field-form 主要实现思路
+ 用数据仓库FormStore管理数据
+ 通过Context跨层级传递store实例，让每个表单可以通过store实例去修改、获取数据
+ 在表单组件挂载的时候，将组件实例存入 store 订阅列表里，当数据变化时通知订阅列表的所有组件去更新
+ 将表单组件的子元素设置为受控组件，onChange时去改变数据仓库 store 的数据

## 简单实现
### 实现数据仓库FormStore
+ store存储数据，setFieldsValue、getFieldValue来设置、获取数据。当setFieldsValue设值时，遍历执行订阅组件实例的onStoreChange
+ fieldEntities存储表单实例，订阅数据变化，当数据变化时，执行表单实例的onStoreChange方法
+ callbacks用于存储onFinish、onFinishFailed等回调函数
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
  
  setFieldsValue = (newStore: Store) => {
    const prevStore = {...this.store}
    this.store = {
      ...this.store,
      ...newStore
    }
    // 遍历订阅组件，执行组件的onStoreChange
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
### 创建FieldContext
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
### 实现Form组件
Form组件
+ 初始化store实例，并通过FieldContext.Provider传递给子组件
+ 设置store实例的回调函数，如onFinis、onFinishFailed等
+ 设置store的初始化值
+ 表单提交时，调用store实例的submit方法
```js
const Form: React.FC<FormProps> = props => {
  const { initialValues, onFinish, onFinishFailed, form } = props;
  const [formInstance] = useForm(form);
  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  if (initialValues) {
    formInstance.setFieldsValue(initialValues);
  }
  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>{props.children}</FieldContext.Provider>
    </form>
  );
};
export default Form;
```
### 实现表单组件Field
+ 通过FieldContext获取实例及其方法
+ 表单挂载时，将组件实例注册到store的订阅列表，为表单订阅store数据变化
+ 将表单的子组件转为受控组件，添加onChange事件，通过store实例去设置数据
```js
class Field extends React.Component<FieldProps, FieldState> {
  static contextType = FieldContext;
  componentDidMount() {
    const { registerField } = this.context;
    registerField(this);
  }
  onStoreChange = (prevStore: Store) => {
    const { getFieldValue } = this.context;
    const { name } = this.props;
    const prevValue = prevStore[name];
    const curValue = getFieldValue(name);
    if (curValue !== prevValue) {
      this.forceUpdate();
      return;
    }
  };
  getControlled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFieldsValue({
          [name]: newValue,
        });
      },
    };
  };
  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children as ReactElement, this.getControlled());
    return returnChildNode;
  }
}
export default Field;
```
## 总体思路
