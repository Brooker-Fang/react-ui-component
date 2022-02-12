import { useState } from 'react'
import Button, { } from "./components/Button";
import Menu, { MenuItem , SubMenu} from "./components/Menu";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition';
import Input from './components/Input';
import AutoComplete from './components/AutoComplete';

library.add(fas)
function App() {
  const [show, setShow] = useState(false)
  const suggestions = ['a', 'b', 'ccc', 'cdea', 'qas', 'dashdj', 'fdhsdjkfh', 'rweorii']
  const handleFetch = (query: string) => {
    return suggestions.filter(item => item.includes(query))
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
      fetchSuggestion={handleFetch}
      ></AutoComplete>
    </div>
  );
}

export default App;
