import logo from './logo.svg';
import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md content-center flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img src={logo} class="App-logo h-12 w-12"></img>
        </div>
        <div>
          <div class="text-xl font-medium text-black">ChitChat</div>
          <p class="text-gray-500">You have a new message!</p>
          <Button></Button>
        </div>
      </div>
    </div>
  );
}

export default App;
