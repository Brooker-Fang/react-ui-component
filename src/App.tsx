import { useState } from 'react'
import Button, { } from "./components/Button";
import Menu, { MenuItem , SubMenu} from "./components/Menu";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition';
import Input from './components/Input';
import AutoComplete, { DataSourceType } from './components/AutoComplete';

library.add(fas, faSpinner)
function App() {
  const [show, setShow] = useState(false)
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        return items.slice(0, 10).map((item:any) => ({value: item.login, ...item}))
      })
  }
  const renderOption = (item: DataSourceType) => {
    const newItem = item as DataSourceType<{name:string, value: string}>
    return <h3>name: {newItem.name}, value: {newItem.value}</h3>
  }
  return (
    <div className="App">
      
      <Menu onSelect={(index) => alert(index)} >
        <MenuItem>
          menu1
        </MenuItem>
        <MenuItem disabled >
          menu2
        </MenuItem>
        <SubMenu title="SubMenu">
          <MenuItem>
            submenu1
          </MenuItem>
          <MenuItem disabled >
            submenu2
          </MenuItem>
        </SubMenu>
        <MenuItem >
          menu3
        </MenuItem>
      </Menu>
      <Menu onSelect={(index) => alert(index)} mode="vertical" defaultOpenSubMenu={['2']}>
        <MenuItem>
          menu1
        </MenuItem>
        <MenuItem disabled >
          menu2
        </MenuItem>
        <SubMenu title="SubMenu">
          <MenuItem>
            submenu1
          </MenuItem>
          <MenuItem >
            submenu2
          </MenuItem>
        </SubMenu>
        <MenuItem >
          menu3
        </MenuItem>
      </Menu>
      <Button size="lg" onClick={() => setShow(!show)}>Toggle</Button>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <Button size="lg" >a large button</Button>
      </Transition>
      <Input placeholder='hhh'></Input>
      <AutoComplete
      placeholder="请输入查询"
      fetchSuggestion={handleFetch}
      renderOption={renderOption}
      ></AutoComplete>
    </div>
  );
}

export default App;
