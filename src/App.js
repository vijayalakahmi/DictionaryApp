import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Dictionary from './Pages/Dictionary';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Dictionary/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
