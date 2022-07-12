import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';
import React from 'react';


const {useState} = React;

function App() {

  const [num1 , setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <div >
        <Calculator 
        num1 = {num1}
        setNum1 = {setNum1}
        num2 = {num2}
        setNum2={setNum2}
        operation = {operation}
        setOperation = {setOperation}
        message = {message}
        setMessage ={setMessage}
        ></Calculator>
      </div>
    </div>
  );
}

export default App;
