import { ChangeEvent, ReactElement, useEffect, useState, KeyboardEvent, useRef} from "react"
import Input, { InputProps } from "../Input"
import Icon from "../Icon"
import useDebounce from "../../hooks/useDebounce"
import classNames from "classnames"
import useClickOutSide from "../../hooks/useClickOutSide"

export interface DataSourceObject { 
  value: string
}
export type DataSourceType<T={}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  fetchSuggestion: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, value, renderOption ,...restProps} = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highLightIndex, setHighLightIndex] = useState(-1)
  const debounceValue = useDebounce(inputValue, 500)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutSide(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if(debounceValue && triggerSearch.current) {
      setLoading(true)
      const result = fetchSuggestion(debounceValue)
      if (result instanceof Promise) {
        result.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setLoading(false)
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
    setHighLightIndex(-1)
  }, [debounceValue, fetchSuggestion])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    triggerSearch.current = true
  }
  const highlight = (index: number) => {
    if (index<0) index=0
    if(index >= suggestions.length) {
      index = suggestions.length -1
    }
    setHighLightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        suggestions[highLightIndex] && handleSelect(suggestions[highLightIndex])
        break
      case 38:
        highlight(highLightIndex - 1 )
        break
      case 40:
        highlight(highLightIndex + 1 )
        break
      case 27:
        setSuggestions([])
        setHighLightIndex(-1)
        break
      default: 
        break
    }
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect?.(item)
    triggerSearch.current = false
  }
  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'item-highlighted': index === highLightIndex
            })
            return (
              <li className={cnames} key={item.value} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
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
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}></Input>
        {loading && <ul><Icon icon="spinner" spin></Icon></ul>}
        {suggestions.length >0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete