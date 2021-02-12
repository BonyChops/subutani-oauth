import React from 'react';

class MojangLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        this.props.accessor({
            helpRequired: false
        });
    }

    render() {
        return (
            <div>
                <div className="max-w-md mx-auto">
                    <div>
                        <div>
                            <button onClick={this.goBack} className="mr-auto">
                                <div>
                                    <div className="text-sm font-small text-gray-500 dark:text-gray-400">{"<"} 戻る</div>
                                </div>
                            </button>
                        </div>
                        <br />
                        <div className="text-xl font-medium text-black dark:text-white">Mojangアカウントのパスワードはどこへ送信されますか？</div>
                        <p className="text-gray-500 dark:text-gray-400">
                            test
                        </p>

                    </div>
                </div>
            </div>
        )
    }
}

export default MojangLogin;