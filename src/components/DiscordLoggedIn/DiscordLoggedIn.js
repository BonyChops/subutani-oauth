import React from 'react';
import CheckIcon from '../../resources/Check';
import LoadingIcon from '../../resources/Loading';

class DiscordLoggedIn extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.accessor({
                mojangReady: true
            })
        }, 3000);
    }

    render(){
        return(
<div className="flex">
                <div className="flex-shrink-0 w-12">
                    <LoadingIcon class="text-black dark:text-white h-10 w-10"/>
                </div>
                <div>
                    <div>
                        <div className="text-xl font-medium text-black dark:text-white">{this.props.userName}さん，ようこそ！</div>
                        <p className="text-gray-500 dark:text-gray-400">あなたは{this.props.serverName}へ招待されています．ささ，こちらへどうぞ．</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default DiscordLoggedIn;