import { storiesOf } from "@storybook/react";

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <div>
        <h2>欢迎来到组件库</h2>
        <div>
          使用 <code>npm install react-ui-component</code> 进行安装
        </div>
      </div>
      
    )
  }, {
    info: {disable: true}
  })