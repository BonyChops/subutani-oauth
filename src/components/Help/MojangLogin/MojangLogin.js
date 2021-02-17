import React from 'react';
import MCLauncher from '../../../resources/mcLauncher.png';

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
                <div>
                    <button onClick={this.goBack} className="mr-auto">
                        <div>
                            <div className="text-sm font-small text-gray-500 dark:text-gray-400">{"<"} 戻る</div>
                        </div>
                    </button>
                </div>
                <div className="max-w-md mx-auto h-auto">
                    <div>

                        <br />
                        <div className="text-xl font-medium text-black dark:text-white">Mojangアカウントのパスワードはどこへ送信されますか？</div>
                        <p className="text-gray-500 dark:text-gray-400">
                            入力されたメールアドレス・パスワードは全て<span style={{ fontFamily: "Minecraftia" }}>authserver.mojang.com</span>へ送信されます．<u>MC鯖の{this.props.authServer}へはアクセストークンしか送信されないため，<b>皆さんのパスワードをBony_Chopsや{this.props.serverOwner}が見ることはありません(できません)．</b></u>普段みなさんが使っているランチャーでのログインと同じ方法です．<br />
                            <img src={MCLauncher} alt="Minecraft Launcherでのログイン" />
                            Mojangでは，サードパーティ(Mojang公式以外のデベロッパ)向けのOAuth認証/認可メソッドが提供されていません．よって，Discordのように公式のドメイン下で認証させることができず，直接サーバーを通信するしか現状では方法がありません．<br />
                            また，{this.props.authServer}へ送信されたトークンは認証が完了次第，直ちに削除されます(ただし「どの方法を使ってログインしたか」は保存されます)．<br /><br />
                        </p>
                        <div className="text-xl font-medium text-black dark:text-white">IDのみでログインできる理由を教えてください</div>
                        <p className="text-gray-500 dark:text-gray-400">
                            直接パスワードを入力することに抵抗がある方のために，IDのみでログインするメソッドを用意しました．ですがこちらの方法は厳密に言うと<u>認証をあえて<b>行わない</b></u>方法になります．あなたが所有しているアカウントか否かを確認せず登録するメソッドになるため，もしかしたら今後無効になる可能性があります．
                        </p><br /><br />
                        <div className="text-xl font-medium text-black dark:text-white">IDのみのログインメソッドが見当たりません / 使用できません</div>
                        <p className="text-gray-500 dark:text-gray-400">
                            MC鯖主{this.props.serverOwner}がこの設定を無効化している場合，表示されません．使用したい場合はMC鯖主へお問い合わせください．
                        </p><br />

                    </div>
                </div>
            </div>
        )
    }
}

export default MojangLogin;