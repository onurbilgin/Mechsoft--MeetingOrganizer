import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Meeting} from './Meeting';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
     
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Toplantılarım
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-success" to="/meeting">
              Toplantı Düzenle
            </NavLink>
          </li>
        </ul>
      </nav>

     

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/meeting' element={<Meeting/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
