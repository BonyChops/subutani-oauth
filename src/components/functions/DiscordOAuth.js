import React, { useState, useEffect } from 'react';
import responseToObject from './responseToObject';
let loggingIn = false;

const DiscordOAuth = (address, code, accessor) => {
    Response.prototype.toJSON = async function () {
        return await Object.keys(Response.prototype).reduce(async (a, c) => {
            let aBuf = await a;
            return (typeof this[c] !== 'function') ? ((aBuf[c] = ((["body", "headers"]).includes(c) ? ({
                headers: { "content-type": this.headers.get("content-type") },
                body: await this.clone().text()
            })[c] : this[c]), aBuf)) : aBuf;
        }, Promise.resolve({}))
    }
    useEffect(() => {
        console.log("called");
        fetch(address, {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(
                async (result) => {
                    if (loggingIn) {
                        return;
                    }
                    loggingIn = true;
                    console.log("called");
                    if (result.status !== 200) {
                        if (result.headers.get("Content-Type").indexOf("json") !== -1) {
                            const body = await result.json();
                            console.log(body);
                            const message = {
                                no_approved_guild: {
                                    title: "誰だお前！？",
                                    description: `本マインクラフト鯖は${body.guild_name}のメンバーのみが参加可能のホワイトリスト制になってます．`
                                }
                            }
                            const { title, description } = (v => ((v === undefined) ? {
                                title: "認証サーバーとの通信に失敗しました",
                                description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`
                            } : v))(message[body.type]);
                            accessor({
                                error: {
                                    title,
                                    description,
                                    errorDetail: `Server returned ${result.status}\n${JSON.stringify(await result.toJSON(), null, 2)}.`
                                }
                            })
                            return;
                        }

                    }
                    const data = await result.json();
                    accessor({ discordOAuth: data });
                    return;
                },
                (error) => {
                    console.log("Failed to connect.");
                    accessor({
                        error: {
                            title: "認証サーバーとの通信に失敗しました",
                            description: `サーバー(${address})がオフラインになったか，接続(Wi-Fiなど)が切れた可能性があります．再度お試しください．`,
                            errorDetail: error.toString()
                        }
                    })
                }
            )
        return;
    })
}

export default DiscordOAuth;