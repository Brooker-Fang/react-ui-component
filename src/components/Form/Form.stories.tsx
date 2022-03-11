import { storiesOf } from '@storybook/react';
import React from 'react';
import Form, { Field } from '.';
import Button from '../Button';
import Input from '../Input';
import useForm from './useForm';

const FormStory = () => {
  const [form] = useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  const onFinishFailed = (err: any) => {
    console.log(err);
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ name: 'init' }}
      >
        <Field name="name">
          <Input placeholder="Input" type="text"></Input>
        </Field>
        <Field name="password">
          <Input placeholder="password" type="text"></Input>
        </Field>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

storiesOf('Form', module).add('Form', FormStory);
