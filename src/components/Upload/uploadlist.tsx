import Icon from "../Icon";
import { UploadFile } from "./upload";

export interface UploadFileListProps {
  fileList: UploadFile[]
  onRemove?: (file: UploadFile) => void
}

const UploadList: React.FC<UploadFileListProps> = (props) => {
  const {fileList, onRemove} = props
  return (
    <ul className="viking-upload-list">
      {fileList.map((item:UploadFile) => {
        return (
          <li className="viking-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => { onRemove?.(item)}}/>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList