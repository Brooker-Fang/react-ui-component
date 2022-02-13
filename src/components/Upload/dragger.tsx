import classNames from "classnames"
import { DragEvent, useState } from "react"

export interface DraggerProps {
  onFile?: (files: FileList) => void
}
const Dragger: React.FC<DraggerProps> = (props) => {
  const {onFile, children} = props
  const [ dragOver, setDragOver] = useState(false)
  const classes = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile?.(e.dataTransfer.files)
  }
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div
      className={classes}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
     >
       {children}
    </div>
  )
}

export default Dragger