import logo from './logo.svg';
import './App.css';

function App(props) {
  const subject=props.subject;
  // console.log(props);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          说你好, {subject}！
        </p>
      </header>
    </div>
  );
}

export default App;
