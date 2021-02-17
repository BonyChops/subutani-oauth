import React, { useState, useEffect } from 'react';
import responseToObject from './responseToObject';


const MojangOAuth = (address, oauthType, mojangOAuth, accessor, serverName, discordOAuth) => {
    Response.prototype.toJSON = async function () {
        return await Object.keys(Response.prototype).reduce(async (a, c) => {
            let aBuf = await a;
            return (typeof this[c] !== 'function') ? ((aBuf[c] = ((["body", "headers"]).includes(c) ? ({
                headers: { "content-type": this.headers.get("content-type") },
                body: (this.headers.get("content-type").indexOf("json") !== -1) ? await this.clone().json() : await this.clone().text()
            })[c] : this[c]), aBuf)) : aBuf;
        }, Promise.resolve({}))
    }
    useEffect(() => {
        fetch(address, {
            method: 'POST',
            body: JSON.stringify({
                oauth_type: oauthType,
                mojangOAuth
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: discordOAuth.access_token
            },
        })
            .then(
                async (result) => {
                    if (result.status !== 200 && result.headers.get("content-type").indexOf("json") !== -1) {
                        const body = await result.clone().json();
                        const message = {
                            access_token_expired: {
                                title: "登録に失敗しました",
                                description: `アクセストークンの有効期限(10分)が過ぎたみたいです．お手数ですが，最初からやり直してください...`
                            },
                            user_not_found: {
                                title: "ユーザーが見つかりませんでした",
                                description: `ユーザー名: ${mojangOAuth.id}が間違っている可能性があります．`,
                                allowBack: true
                            }
                        }
                        accessor({
                            idGo: false,
                            idReady: false,
                            mojangUserInfo: { id: false }
                        })
                        const titleTemplate = (v => ((v === undefined) ? {
                            title: "認証サーバーとの通信に失敗しました",
                            description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`
                        } : v))(message[body.type]);
                        accessor({
                            error: {
                                ...titleTemplate,
                                errorDetail: `Failed to parse data.\nThe address might not be auth server's one.\n${JSON.stringify(await result.toJSON(), null, 2)}.`
                            }
                        })
                        return;
                    }
                    if (result.status !== 200) {
                        accessor({
                            error: {
                                title: "認証サーバーとの通信に失敗しました",
                                description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`,
                                errorDetail: `Failed to parse data.\nThe address might not be auth server's one.\n${JSON.stringify(await result.toJSON(), null, 2)}.`
                            }
                        })
                        return;
                    }
                    const data = await result.clone().json();
                    accessor({
                        successInfo: {
                            title: (data.updated > 0) ? "更新しました" : "登録しました",
                            description: (data.updated > 0) ? "また会いましたね！idを更新しておきました👍" : `${mojangOAuth.id}として登録が完了しました！${serverName}で思いっきり楽しんでください！`,
                            detail: `${JSON.stringify(await result.toJSON(), null, 2)}.`
                        }
                    });
                },
                async (error) => {
                    console.error(error)
                    accessor({
                        error: {
                            title: "認証サーバーとの通信に失敗しました",
                            description: `サーバーのアドレス(${address})が間違っているか，サーバーがオフラインである可能性があります．再度お試しください．`,
                            errorDetail: error.toString()
                        }
                    })
                }
            )
        return;
    })
}

export default MojangOAuth;