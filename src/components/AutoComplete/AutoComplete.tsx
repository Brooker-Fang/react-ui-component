import { ChangeEvent, ReactElement, useState } from "react"
import Input, { InputProps } from "../Input"

export interface DataSourceObject { 
  value: string
}
export type DataSourceType<T={}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  fetchSuggestion: (keyword: string) => DataSourceType[]
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, value, renderOption ,...restProps} = props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if(value) {
      const result = fetchSuggestion(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect?.(item)
  }
  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            return (
              <li key={item.value} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
            )
          })
        }
      </ul>
    )
  }
  const renderTemplate = (item: DataSourceType) => {
    return (
      renderOption ? renderOption(item) : item.value
    )
  }
  return (
    <div className="viking-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}></Input>
        {suggestions.length >0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete