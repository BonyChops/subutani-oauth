import React from 'react';
import logo from '../logo.svg';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button className="focus:outline-none p-3 bg-white dark:bg-gray-900 hover:bg-gray-400 dark:hover:bg-gray-700 max-w-lg rounded-xl items-center shadow-md flex space-x-4">
            <div className="flex-shrink-0">
                <img src={props.logo} className="h-12 w-12"></img>
            </div>
            <div>
                <div className="text-xl font-medium text-black dark:text-white">ログイン</div>
            </div>
        </button>
    );
}

export default Button;