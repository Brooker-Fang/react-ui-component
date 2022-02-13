import { storiesOf } from "@storybook/react"
import { action } from '@storybook/addon-actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Upload from "."
import { UploadFile } from "./upload"
import '../../styles/index.scss'
import Button from "../Button"
import Icon from "../Icon"

library.add(fas)
const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('process')}
      onSuccess={action('success')}
      onError={action('error')}
      >
        <Button>Upload</Button>
      </Upload>
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
      >
      <Button>Upload</Button>
        </Upload>
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
      >
      <Button>Upload</Button>
        </Upload>
  )
}
const TestUploadList = () => {
  const defaultFileList:UploadFile[] = [
    { uid: '1', size: 100, name: 'test.txt', status: 'uploading', percent: 30 },
    { uid: '12', size: 200, name: 'test.txt', status: 'success', percent: 100 },
    { uid: '13', size: 300, name: 'test.txt', status: 'error', percent: 100 },
  ]
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('change')}
      defaultFileList={defaultFileList}
      onRemove={action('remove')}
      name="filename"
      data={{'key': 'value'}}
      header={{'X-Powered-By': 'vikingship'}}
      accept=".png"
      multiple
      >
        <Button>Upload</Button>
        </Upload>
  )
}
const TestDragUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('change')}
      onRemove={action('remove')}
      drag
      >
        <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drag file over to upload</p>
        </Upload>
  )
}
storiesOf('Upload 组件', module)
  .add('default Upload', SimpleUpload)
  .add('测试beforeUpload', TestBeforeUpload)
  .add('测试异步beforeUpload', TestAsyncBeforeUpload)
  .add('测试上传文件列表', TestUploadList)
  .add('测试拖动上传文件', TestDragUpload)