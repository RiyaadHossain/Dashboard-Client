import './App.css';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import AddProducts from './Components/AddProducts/AddProducts';
import DashBoard from './Components/DashBoard/DashBoard';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <DashBoard/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/addproduct' element={<AddProducts/>}/>
      </Routes>
    </div>
  );
}

export default App;
