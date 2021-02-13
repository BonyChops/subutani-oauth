import React, { useState, useEffect } from 'react';
import responseToObject from './responseToObject';


const ConnectionCheck = (address, accessor) => {
    Response.prototype.toJSON = async function () {
        return await Object.keys(Response.prototype).reduce(async (a, c) => {
            let aBuf = await a;
            return (typeof this[c] !== 'function') ? ((aBuf[c] = ((["body", "headers"]).includes(c) ? ({
                headers: {"content-type": this.headers.get("content-type")},
                body: await this.clone().text()
            })[c] : this[c]), aBuf)) : aBuf;
        }, Promise.resolve({}))
    }
    console.log(Response.prototype);
    console.log(Object.keys(Response.prototype));
    useEffect(() => {
        console.log("checking");
        fetch(address)
            .then(
                async (result) => {
                    console.log(await result.toJSON());
                    if (result.status !== 200 || result.headers.get("content-type").indexOf("json") === -1) {
                        accessor({
                            error: {
                                title: "認証サーバーとの通信に失敗しました",
                                description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`,
                                errorDetail: `Failed to parse data.\nThe address might not be auth server's one.\n${JSON.stringify(await result.toJSON(), null, 2)}.`
                            }
                        })
                        return;
                    }
                    const data = await result.json();
                    console.log("a");
                    if (data.serverInfo === undefined || !(["serverName", "serverOwner"]).every(key => data.serverInfo[key] !== undefined)) {
                        accessor({
                            error: {
                                title: "認証サーバーとの通信に失敗しました",
                                description: `サーバーのアドレス(${address})が間違っているか，サーバーがオフラインである可能性があります．再度お試しください．`,
                                errorDetail: `Returned data corrupted.\n${JSON.stringify(await result.toJSON()), null, 2}`
                            }
                        })
                        return;
                    }
                    console.log(data);
                    accessor({ serverInfo: data.serverInfo, discord_guild_name: data.guild_name });
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

export default ConnectionCheck;