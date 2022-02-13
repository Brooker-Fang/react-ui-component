import { storiesOf } from "@storybook/react"
import { action } from '@storybook/addon-actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Upload from "."
import { UploadFile } from "./upload"
import '../../styles/index.scss'

library.add(fas)
const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('process')}
      onSuccess={action('success')}
      onError={action('error')}
      />
  )
}
const TestBeforeUpload = () => {
  const checkFileSize = (file: File) => {
    if(Math.round(file.size) / 1024 > 500) {
      alert('file too big')
      return false
    }
    return true
  }
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('change')}
      beforeUpload={checkFileSize}
      />
  )
}
const TestAsyncBeforeUpload = () => {
  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', {type: file.type})
    return Promise.resolve(newFile)
  }
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('change')}
      beforeUpload={filePromise}
      />
  )
}
const TestUploadList = () => {
  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', {type: file.type})
    return Promise.resolve(newFile)
  }
  const defaultFileList:UploadFile[] = [
    { uid: '1', size: 100, name: 'test.txt', status: 'uploading', percent: 10 },
    { uid: '12', size: 200, name: 'test.txt', status: 'success', percent: 100 },
    { uid: '13', size: 300, name: 'test.txt', status: 'error', percent: 100 },
  ]
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('change')}
      beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      onRemove={action('remove')}
      />
  )
}
storiesOf('Upload 组件', module)
  .add('default Upload', SimpleUpload)
  .add('测试beforeUpload', TestBeforeUpload)
  .add('测试异步beforeUpload', TestAsyncBeforeUpload)
  .add('测试上传文件列表', TestUploadList)