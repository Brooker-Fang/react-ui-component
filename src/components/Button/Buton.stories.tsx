import { storiesOf } from '@storybook/react';

import Button, {  } from './button';
// default
const defaultButton = () => (<Button >default</Button>)

// 不同尺寸
const buttonWithSize = () => (
  <>
    <Button size='lg'>large button</Button>
    <Button size='sm'>small button</Button>
  </>
)
storiesOf('Button Component', module)
  .add('默认 Button', defaultButton)
  .add('不同尺寸 button', buttonWithSize)


