import React, { useState, useEffect } from 'react';
import responseToObject from './responseToObject';


const ConnectionCheck = (address, accessor) => {
    useEffect(() => {
        console.log("checking");
        fetch(address)
            .then(
                async (result) => {
                    console.log("launvh");
                    if (result.status !== 200) {
                        const body = await result.text();
                        accessor({
                            error: {
                                title: "認証サーバーとの通信に失敗しましたq",
                                description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`,
                                errorDetail: `Server returned.${result.status}\n${JSON.stringify(responseToObject(result, body), null, 2)}.`
                            }
                        })
                        return;
                    }
                    const data = await result.json();
                    if (data.serverInfo === undefined || !(["serverName", "serverOwner"]).every(key => data.serverInfo[key] !== undefined)) {
                        accessor({
                            error: {
                                title: "認証サーバーとの通信に失敗しました",
                                description: `サーバーのアドレス(${address})が間違っているか，サーバーがオフラインである可能性があります．再度お試しください．`,
                                errorDetail: `Returned data corrupted.\n${JSON.stringify(responseToObject(result, data), null, 2)}`
                            }
                        })
                        return;
                    }
                    console.log(data);
                    accessor({ serverInfo: data.serverInfo });
                },
                async (error) => {
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