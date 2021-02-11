import React from 'react';
import CheckIcon from '../../resources/Check';

class DiscordLoggedIn extends React.Component{
    render(){
        return(
<div className="flex">
                <div className="flex-shrink-0 w-12 text-xl">
                    <CheckIcon/>
                </div>
                <div>
                    <div>
                        <div className="text-xl font-medium text-black dark:text-white">おけ！</div>
                        <p className="text-gray-500 dark:text-gray-400">いんじゃないすか</p>
                    </div>

                </div>
            </div>
        )
    }
}