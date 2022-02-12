import { ChangeEvent, useState } from "react"
import Input, { InputProps } from "../Input"


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  fetchSuggestion: (keyword: string) => string[]
  onSelect?: (item: string) => void
}

const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, value, ...restProps} = props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])
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
  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    onSelect?.(item)
  }
  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            return (
              <li key={item} onClick={() => handleSelect(item)}>{item}</li>
            )
          })
        }
      </ul>
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