import { storiesOf } from "@storybook/react"
import AutoComplete from "."
import { action } from '@storybook/addon-actions'
const SimpleComplete = () => {
  const suggestions = ['a', 'b', 'ccc', 'cdea', 'qas', 'dashdj', 'fdhsdjkfh', 'rweorii']
  const handleFetch = (query: string) => {
    return suggestions.filter(item => item.includes(query))
  }
  return (
    <AutoComplete
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      ></AutoComplete>
  )
}
storiesOf('AutComplete Component', module)
  .add('SimpleComplete', SimpleComplete)