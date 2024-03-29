import React from 'react';
import { ReactElement, useState } from 'react';

const FormModel = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: null,
  });
  return (
    <form>
      <input
        placeholder="name"
        value={formData.name}
        onChange={e => {
          setFormData(prev => ({ ...prev, name: e.target.value }));
        }}
      ></input>
      <input
        placeholder="age"
        value={formData.name}
        onChange={e => {
          setFormData(prev => ({ ...prev, name: e.target.value }));
        }}
      ></input>
    </form>
  );
};
const Field = (props: any) => {
  const { children, setFormData, name, formData } = props;
  const getControlled = () => {
    return {
      value: formData[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFormData((prev: any) => ({ ...prev, [name]: newValue }));
      },
    };
  };
  const returnChildNode = React.cloneElement(children as ReactElement, getControlled());
  return returnChildNode;
};
const FormModel2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: null,
  });
  return (
    <form>
      <Field name="name" form={formData} setFormData={setFormData}>
        <input placeholder="name"></input>
      </Field>
      <Field name="age" form={formData} setFormData={setFormData}>
        <input placeholder="age"></input>
      </Field>
    </form>
  );
};

const FieldContext = React.createContext({});
class Field2 extends React.Component {
  static contextType = FieldContext;
  getControlled = () => {
    const { name } = this.props as any;
    const { formData, setFormData } = this.context;
    return {
      value: formData[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFormData((prev: any) => ({ ...prev, [name]: newValue }));
      },
    };
  };
  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children as ReactElement, this.getControlled());
    return returnChildNode;
  }
}
const FormModel3 = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: null,
  });
  return (
    <form>
      <FieldContext.Provider value={{ formData, setFormData }}>
        <Field name="name">
          <input placeholder="name"></input>
        </Field>
        <Field name="age">
          <input placeholder="age"></input>
        </Field>
      </FieldContext.Provider>
    </form>
  );
};
