import responseToObject from './responseToObject';

const ConnectionCheck = (address, accessor) => {
    fetch(address)
        .then(
            async (result) => {
                if(result.status !== 200){
                    accessor({error: {
                        title: "認証サーバーとの通信に失敗しましたq",
                        description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`,
                        errorDetail: `Server returned.${result.status}\n${JSON.stringify(await responseToObject(result), null, 2)}`
                    }})
                    return;
                }
                const data = await result.clone().json();
                console.log(data);
                if(data.serverInfo === undefined || !(["serverName", "serverOwner"]).every(key => data.serverInfo[key] !== undefined)){
                    accessor({error: {
                        title: "認証サーバーとの通信に失敗しましたq",
                        description: `サーバーのアドレス(${address})が間違っている可能性があります．再度お試しください．`,
                        errorDetail: `Returned data corrupted.\n${JSON.stringify(await responseToObject(result), null, 2)}`
                    }})
                    console.log(await result.text())
                    return;
                }
                accessor({serverInfo: data});
            },
            (error) => {
                accessor({error: {
                    title: "認証サーバーとの通信に失敗しました",
                    description: `サーバーのアドレス(${address})が間違っているか，サーバーがオフラインである可能性があります．再度お試しください．`,
                    errorDetail: error.toString()
                }})
            }
        )
    return;
}

export default ConnectionCheck;