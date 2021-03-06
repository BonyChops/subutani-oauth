import React from 'react';
import WindowOpener from 'react-window-opener'
import discordLogo from '../../logo/discord.svg';
import Button from '../Button';

class LoginToDiscord extends React.Component {

    constructor(props) {
        super(props);
    }

    responseFromDiscord = (err, res) => {
        if (err) {
            console.log(res, 'err')
        }
        if (!res.some(data => data.title === "code")) {
            this.props.accessor({
                error: {
                    title: "エラーが発生しました",
                    description: "Discordからcodeを取得できませんでした．ページを再読込して再度お試しください．何度試しても上手く行かない場合はBonyChopsまでお知らせください．",
                    errorDetail: "Recieved value from childWindow but failed to parse.\n" + JSON.stringify(res, null, 2)
                }
            })
            return;
        }
        this.props.accessor({
            discordOAuth: {
                code: res.find(data => data.title === "code").value
            }
        });
    }

    render() {
        return (
            <div>
                <div className="max-w-md mx-auto">
                    {/* <div className="flex-shrink-0">
                  <img src={logo} className="App-logo h-12 w-12"></img>
                </div> */}
                    <div>
                        <div className="text-xl font-medium text-black dark:text-white">{this.props.serverName}へようこそ</div>
                        <p className="text-gray-500 dark:text-gray-400">{this.props.discordGuildName}に参加しているアカウントでログインしてください．</p>
                        <div className="flex">
                            {
                                this.props.oauthTypes.map(type => {
                                    const url = encodeURI(
                                        "https://discord.com/api/oauth2/authorize?"
                                        + "client_id=" + type.client_id
                                        + "&redirect_uri=" + type.redirect_uri
                                        + "&response_type=" + "code"
                                        + "&scope=" + type.scope);
                                    return (
                                        <WindowOpener bridge={this.responseFromDiscord} width="400" height="700" url={url}>
                                            <Button logo={discordLogo} />
                                        </WindowOpener>
                                    );
                                })
                            }


                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default LoginToDiscord;