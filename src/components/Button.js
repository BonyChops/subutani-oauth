import React from 'react';
import logo from '../logo.svg';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button class="focus:outline-none content-center p-0 items-cennter justify-center flex max-h-auto shadow-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <div class="flex-shrink-0">
                <img src={logo} class="App-logo h-12 w-12"></img>
            </div>
            <div>
            <p class="text-white">認証</p>
            </div>
        </button>
    );
}

export default Button;