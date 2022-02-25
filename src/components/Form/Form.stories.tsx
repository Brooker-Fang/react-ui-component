import { storiesOf } from "@storybook/react";
import Form, { Field } from ".";
import Button from "../Button";
import Input from "../Input";
import useForm from "./useForm";

const FormStory = () => {
  const [form] = useForm();
  const onFinish = (values: any) => {
    console.log(values)
  }
  const onFinishFailed = (err: any) => {
    console.log(err)
  }
  return <div>
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Field name="name" rules={[{required: true, messages: "name must be required"}]}>
        <Input placeholder="Input" type="text"></Input>
      </Field>
      <Field name="password" rules={[{required: true, messages: "password must be required"}]}>
        <Input placeholder="password" type="text"></Input>
      </Field>
      <Button>Submit</Button>
    </Form>
  </div>
}
storiesOf('Form', module)
  .add('Form', FormStory)