import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import OrderBook from './components/OrderBook';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <OrderBook/>
    </div>
  );
}

export default App;
