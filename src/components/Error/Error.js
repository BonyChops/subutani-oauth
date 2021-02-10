import React from 'react';
import ErrorIcon from '../../resources/Error';

class Error extends React.Component {

    state = {
        showError: false
    }
    constructor(props) {
        super(props);
    }

    toggleErrorShow = () => {
        this.setState({
            showError: !this.state.showError
        })
    }

    render() {
        return (
            <div>
                <div className="flex-shrink-0 w-12">
                    <ErrorIcon />
                </div>
                <div>
                    <div>
                        <div className="text-xl font-medium text-red-600">{this.props.errorData.title}</div>
                        <p className="text-gray-500 dark:text-gray-400">{this.props.errorData.description}</p>
                    </div>
                </div><br /><br /><br />
                <button onClick={this.toggleErrorShow} className="text-black dark:text-white">{(this.state.showError ? "▽" : "▷") + "Show more information"}</button>
                <div>
                    {((this.state.showError) ? (
                        <div className="bg-yellow-300 rounded-xl text-red-600 bg-scroll text-xs shadow-lg sm:rounded-3xl p-3 w-full">
                        <pre>
                            <code className="">
                                {this.props.errorData.errorDetail}
                            </code>
                        </pre>
                    </div>
                ) : null)}
               </div>
            </div>
        )
    }
}

export default Error;