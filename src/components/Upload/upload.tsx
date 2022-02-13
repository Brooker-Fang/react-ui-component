
import axios from "axios"
import { ChangeEvent, useRef, useState } from "react"
import Button from "../Button"
import UploadList from "./uploadlist"

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
}
const Upload:React.FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError, beforeUpload, onChange, defaultFileList, onRemove } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateFileObj: Partial<UploadFile>) => {
    setFileList(preFileList => {
      return preFileList.map(file => {
        if(file.uid === updateFile.uid) {
          return {...file, ...updateFileObj}
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files) {
      return
    }
    uploadFiles(files)
    if(fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if(!beforeUpload) {
        postFile(file)
      } else {
        const result = beforeUpload(file)
        if(result && result instanceof Promise) {
          result.then(processFile => {
            postFile(processFile)
          })
        } else if(result !== false) {
          postFile(file)
        }
      }
    })
  }
  const postFile = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
      formData.append(file.name, file)
      axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if(percentage < 100) {
            updateFileList(_file, {percent: percentage, status: 'uploading'})
            onProgress?.(percentage, file)
          }
        }
      })
      .then(res => {
        updateFileList(_file, {status: 'success', response: res.data})
        onSuccess?.(res.data, file)
        onChange?.(file)
      })
      .catch(err => {
        updateFileList(_file, {status: 'error', error: err})
        onError?.(err, file)
        onChange?.(file)
      })
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove?.(file)
  }
  return (
    <div className="viking-upload-component">
      <Button btnType="primary" onClick={handleClick}>Upload</Button>
      <input
         className="viking-file-input"
         type="file" 
         style={{display: 'none'}}
         ref={fileInput}
         onChange={handleFileChange}>
          
        </input>
        <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}
export default Upload