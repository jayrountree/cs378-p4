import './App.css';
import BookDisplay from './components/BookDisplay';
import Header from './components/Header';
import React, { useState } from 'react';

function App() {
  return (
    <div className='parent'>
      <div>
        <div>{<Header></Header>}</div>
        <div>{<BookDisplay></BookDisplay>}</div>
      </div>
    </div>
  );
}

export default App;
