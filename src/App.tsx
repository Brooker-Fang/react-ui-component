import Button, { ButtonType } from "./components/Button";
import Menu, { MenuItem } from "./components/Menu";
function App() {
  return (
    <div className="App">
      <Menu onSelect={(index) => alert(index)}>
        <MenuItem index="0">
          menu1
        </MenuItem>
        <MenuItem disabled index="1">
          menu2
        </MenuItem>
        <MenuItem index="2">
          menu3
        </MenuItem>
      </Menu>
      <code>
        const a = b
      </code>
      <Button disabled >hello</Button>
      <Button autoFocus >autoFocus</Button>
      <Button btnType={ButtonType.Danger} >error</Button>
      <Button  btnType={ButtonType.Link} href="https://baidu.com">百度</Button>
    </div>
  );
}

export default App;
