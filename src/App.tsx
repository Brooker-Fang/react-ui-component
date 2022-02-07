import Button, { ButtonType } from "./components/Button";
function App() {
  return (
    <div className="App">
      <h1>h1</h1>
      <h2>h1</h2>
      <h3>h1</h3>
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
