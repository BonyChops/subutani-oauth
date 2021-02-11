import React from 'react';

class TypeAuthServer extends React.Component {
    state = {
        authServer: false,
    }

    constructor(props) {
        super(props);
    }

    serverInfoUpdate = (e) => {
        e.preventDefault();
        console.log(this.state.authServer);
        this.props.accessor({authServer: this.state.authServer});
    }

    tmpServerHandler = (event) => {
        this.setState({ authServer: event.target.value });
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="flex">
                <div>
                    <div>
                        <div className="text-xl font-medium text-black dark:text-white">認証サーバーを入力してください</div>
                        <p className="text-gray-500 dark:text-gray-400">ここがわからない場合は鯖主にお問い合わせくださいss！！！！！！！！！！</p>
                        <br />
                        <form onSubmit={this.serverInfoUpdate}>
                            <input type="text"
                                className="py-3 block w-full rounded-md border dark:text-white focus:ring focus:border-blue-300 border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-indigo-200"
                                placeholder="認証サーバーアドレス/IP..."
                                onChange={this.tmpServerHandler}
                                required />
                            <div className="object-right">
                                <button className="ml-auto my-2 focus:outline-none px-4 py-1 bg-blue-500 focus:ring focus:ring-indigo-200 max-w-lg rounded-xl items-center shadow-xl flex space-x-2">
                                    <div>
                                        <div className="text-sm font-small text-white">認証</div>
                                    </div>
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        )
    }
}

export default TypeAuthServer;
