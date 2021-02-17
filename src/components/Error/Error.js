import React from 'react';
import ErrorIcon from '../../resources/Error';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

    goBack = () => {
        this.props.accessor({
            error: false
        })
    }

    render() {
        return (
            <div>
                {(this.props.errorData.allowBack === true) ? <div>
                    <button className="mr-auto">
                        <div>
                            <div onClick={this.goBack} className="text-sm font-small text-gray-500 dark:text-gray-400">{"<"} 戻る</div>
                        </div>
                    </button><br /><br />
                </div> : null}
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
                        <div>
                            <div className="bg-yellow-300 rounded-xl text-red-600 overflow-auto text-xs shadow-lg sm:rounded-3xl p-3 w-full">
                                <pre>
                                    <code className="">
                                        Open Console in Developer Tools to see more details.<br />
                                        {this.props.errorData.errorDetail}
                                    </code>
                                </pre>
                            </div>
                            <div className="object-right">
                                <CopyToClipboard text={this.props.errorData.errorDetail}
                                    onCopy={() => this.setState({ copied: true })}>
                                    <button onClick={() => alert("Copied!\nPlease send these info to server owner or developer to help improving service quality! Thanks!")} className="ml-auto my-2 focus:outline-none px-4 py-1 bg-blue-500 focus:ring focus:ring-indigo-200 max-w-lg rounded-xl items-center shadow-xl flex space-x-2">
                                        <div>
                                            <div className="text-sm font-small text-white">Copy to Clipboard</div>
                                        </div>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>

                    ) : null)}
                </div>
            </div>
        )
    }
}

export default Error;