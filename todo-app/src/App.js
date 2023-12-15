import './App.css';
import Todo from './component/Todo';


function App() {
  return (
    <div className="App">
      <ul role='list' className='todo-list stack-large stack-exception' aria-aria-labelledby='list-heading'>
        <Todo/>
        <Todo/>
        <Todo/>


      </ul>
      
    </div>
  );
}

export default App;
