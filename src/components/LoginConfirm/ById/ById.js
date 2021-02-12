import React from 'react';

class ById extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex">
                <div>
                    <div>
                        <div>
                            <button className="mr-auto">
                                <div>
                                    <div className="text-sm font-small text-gray-500 dark:text-gray-400">{"<"} 戻る</div>
                                </div>
                            </button>
                        </div>
                        <br />
                        <div className="text-xl font-medium text-black dark:text-white w-full text-center" style={{fontFamily: "Minecraftia"}}>{this.props.id}</div><br />
                        <p className="text-gray-500 dark:text-gray-400 w-full text-center">上記のアカウントでログインします．<br /><span className="text-red-600">IDが間違っていても警告されません．</span><br />(何度でもやり直すことができます)</p>
                        <br />
                        <div className="object-right">
                            <button className="ml-auto focus:outline-none w-full py-4 bg-blue-500 focus:ring focus:ring-indigo-200 max-w-lg rounded-xl items-center shadow-xl flex space-x-2">
                                <div className="content-center w-full">
                                    <div className="text-xl font-small text-white text-center">ログイン</div>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ById;