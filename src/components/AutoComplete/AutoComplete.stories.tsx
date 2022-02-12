import { storiesOf } from "@storybook/react"
import AutoComplete, { DataSourceType } from "."
import { action } from '@storybook/addon-actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
interface SuggestionProps {
  value: string,
  name: string
}
const SimpleDataComplete = () => {
  const suggestions = ['a', 'b', 'ccc', 'cdea', 'qas', 'dashdj', 'fdhsdjkfh', 'rweorii']
  const handleFetch = (query: string) => {
    return suggestions.filter(item => item.includes(query)).map(item => ({value: item}))
  }
  const renderOption = (item: DataSourceType) => {
    const newItem = item as DataSourceType<SuggestionProps>
    return <h3>value: {newItem.value}</h3>
  }
  return (
    <AutoComplete
      placeholder="请输入查询"
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
      ></AutoComplete>
  )
}
const ComplexDataComplete = () => {
  const suggestions = [
    {name: 'adasd', value: 'adasd'},
    {name: 'fhsdj', value: 'fhsdj'},
    {name: 'yiteop', value: 'yiteop'},
    {name: 'cbmaznx', value: 'cbmaznx'},
    {name: 'adtrytuiasd', value: 'adtrytuiasd'},
    {name: 'glqweri', value: 'glqweri'},
  ]
  const handleFetch = (query: string) => {
    return suggestions.filter(item => item.name.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const newItem = item as DataSourceType<SuggestionProps>
    return <h3>name: {newItem.name}, value: {newItem.value}</h3>
  }
  return (
    <AutoComplete
      placeholder="请输入查询"
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
      ></AutoComplete>
  )
}
const AsyncDataComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        return items.slice(0, 10).map((item:any) => ({value: item.login, ...item}))
      })
  }
  const renderOption = (item: DataSourceType) => {
    const newItem = item as DataSourceType<SuggestionProps>
    return <h3>name: {newItem.name}, value: {newItem.value}</h3>
  }
  return (
    <AutoComplete
      placeholder="请输入查询"
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
      ></AutoComplete>
  )
}
storiesOf('AutComplete Component', module)
  .add('简单suggestion数据', SimpleDataComplete)
  .add('复杂suggestion数据', ComplexDataComplete)
  .add('异步获取suggestion数据', AsyncDataComplete)