import React from 'react';
import MojangIcon from '../../logo/mojang.jpg';

class LoginToMojang extends React.Component {
    state = {
        id: false,
    }

    constructor(props) {
        super(props);
    }

    serverInfoUpdate = (e) => {
        e.preventDefault();
        let authServer = this.state.authServer;
        if (authServer.indexOf("http") === -1) {
            authServer = "http://" + authServer;
        }
        this.props.accessor({ authServer });
    }

    serverInfoUpdateById = (e) => {
        e.preventDefault();
        this.props.accessor({
            mojangUserInfo: {
                id: this.state.id,
                idReady: true
            }
        });
    }

    tmpServerHandlerById = (event) => {
        this.setState({ id: event.target.value });
        console.log(event.target.value);
    }

    tmpServerHandlerBy = (event) => {
        this.setState({ authServer: event.target.value });
        console.log(event.target.value);
    }

    requireHelp = () => {
        this.props.accessor({
            helpRequired: "mojang_account"
        });
    }

    render() {
        return (
            <div className="flex">
                <div className="w-full px-7">
                    <div className="flex-shrink-0 w-12">
                        <img src={MojangIcon} class="h-10 w-10" />
                    </div>
                    <div className="text-xl font-medium text-black dark:text-white">Mojang アカウントでログイン</div>
                    <p className="text-gray-500 dark:text-gray-400">Discord: {this.props.discordName}さんのアカウントでログインしてください．</p>
                    <br />
                    <form onSubmit={this.serverInfoUpdate}>
                        <input type="email"
                            className="py-3 block w-full rounded-md border dark:text-white focus:ring focus:border-blue-300 border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-indigo-200"
                            placeholder="メールアドレス..."
                            onChange={this.tmpServerHandler}
                            required />
                        <br />
                        <input type="password" style={{ fontFamily: "Minecraftia" }}
                            className="py-3 block w-full rounded-md border dark:text-white focus:ring focus:border-blue-300 border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-indigo-200"
                            placeholder="パスワード..."
                            onChange={this.tmpServerHandler}
                            required />
                        <button className="ml-auto my-2 focus:outline-none px-4 py-1 bg-blue-500 focus:ring focus:ring-indigo-200 max-w-lg rounded-xl items-center shadow-xl flex space-x-2">
                            <div>
                                <div className="text-sm font-small text-white">ログイン</div>
                            </div>
                        </button>
                    </form>
                        <div className="w-full">
                            <button  className="focus:outline-none w-full ml-auto">
                                <div>
                                    <div  onClick={this.requireHelp} className="text-sm font-small dark:text-white text-gray-600 text-right">パスワードはどこへ送信されますか？</div>
                                </div>
                            </button>
                        </div>
                    <br />
                    <div className="text-xl font-medium text-black dark:text-white">または...</div>
                    <p className="text-gray-500 dark:text-gray-400">ゲーム内IDを直接入力することもできます．</p>
                    <form onSubmit={this.serverInfoUpdateById}>
                        <input type="text" style={{ fontFamily: "Minecraftia" }}
                            className="py-3 block w-full rounded-md border dark:text-white focus:ring focus:border-blue-300 border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-indigo-200"
                            placeholder="ゲーム内ID..."
                            onChange={this.tmpServerHandlerById}
                            required />
                        <div >
                            <button className="ml-auto my-2 focus:outline-none px-4 py-1 bg-blue-500 focus:ring focus:ring-indigo-200 max-w-lg rounded-xl items-center shadow-xl flex space-x-2">
                                <div>
                                    <div className="text-sm font-small text-white">認証</div>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginToMojang;
