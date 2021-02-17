import React from 'react';

class ById extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        this.props.accessor({
            idReady: false
        })
    }

    go = () => {
        this.props.accessor({
            idGo: true
        });
    }

    render() {
        return (
            <div className="flex w-full">
                <div className="w-80 mx-auto">
                    <div>
                        <button className="mr-auto">
                            <div>
                                <div onClick={this.goBack} className="text-sm font-small text-gray-500 dark:text-gray-400">{"<"} 戻る</div>
                            </div>
                        </button>
                    </div>
                    <br />
                    <div className="text-xl font-medium text-black dark:text-white w-full text-center" style={{ fontFamily: "Minecraftia" }}>{this.props.id}</div><br />
                    <p className="text-gray-500 dark:text-gray-400 w-full text-center">上記のアカウントでログインします．</p>
                    <br />
                    <div className="object-right">
                        <button onClick={this.go} className="ml-auto focus:outline-none w-full py-4 bg-blue-500 focus:ring focus:ring-indigo-200 max-w-lg rounded-xl items-center shadow-xl flex space-x-2">
                            <div className="content-center w-full">
                                <div className="text-xl font-small text-white text-center">ログイン</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ById;