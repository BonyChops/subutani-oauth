import React from 'react';
import LoadingIcon from '../../resources/Loading';

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex">
                <div className="flex-shrink-0 w-12">
                    <LoadingIcon class="text-black"/>
                </div>
                <div>
                    <div>
                        <div className="text-xl font-medium text-red-600">{this.props.loadingData.title}</div>
                        <p className="text-gray-500 dark:text-gray-400">{this.props.loadingData.description}</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Loading;
