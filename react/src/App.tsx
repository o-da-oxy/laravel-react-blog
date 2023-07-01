import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/posts" element={<Posts />}/>
        <Route element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
