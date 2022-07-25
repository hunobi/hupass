import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*
const check = () => {
    console.log("checking...")
    if(window.pywebview){
        clear();
        root.render(
            <App></App>
        );
    }
}
const timer = setInterval(check, 200);
const clear = ()=>{
    clearInterval(timer)
}
*/
root.render(
    <App></App>
);

