import React from 'react'
import logo from './logo.svg';
import mojangLogo from './logo/mojang.jpg';
import LoginToDiscord from './components/LoginToDiscord/LoginToDiscord.js';
import Error from './components/Error/Error';
import Success from './components/Success/Success';
import Loading from './components/Loading/Loading';
import TypeAuthServer from './components/TypeAuthServer/TypeAuthServer';
//import { useParams } from "react-router";
import { useParams, HashRouter } from "react-router-dom";
import './App.css';
import ConnectionCheck from './components/functions/ConnectionCheck';
import DiscordOAuth from './components/functions/DiscordOAuth';
import DiscordLoggedIn from './components/DiscordLoggedIn/DiscordLoggedIn';
import LoginToMojang from './components/LoginToMojang/LoginToMojang';
import MojangById from './components/LoginConfirm/ById/ById';
import MojangAccountHelp from './components/Help/MojangLogin/MojangLogin';
import MojangOAuth from './components/functions/MojangOAuth';

class App extends React.Component {
  state = {
    stateInitialized: true,
    mounted: false,
    dark: true,
    error: false,
    authServer: false,
    serverInfo: false,
    query: false,
    discordOAuth: false,
    mojangReady: false,
    mojangUserInfo: {
      id: false,
    },
    idReady: false,
    idGo: false,
    helpRequired: false,
    successInfo: false
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const query = window.location.search.substr(1).split("&").map(data => {
      const result = data.split("=");
      return {
        title: result[0],
        value: result[1]
      };
    });
    await this.setState({
      query
    });

    if (query.some(data => data.title == "authServer")) {
      let authServer = query.find(data => data.title == "authServer").value;
      if (authServer.indexOf("http") === -1) {
        authServer = "https://" + authServer;
      }
      this.setState({ authServer });
    } else {
      //console.log("None");
    }
  }

  toggleDark = () => {
    this.setState({ dark: !this.state.dark });
  }

  stateAccessor = (data) => {
    this.setState(data);
  }

  screenChanger = () => {
    if (this.state.error !== false) {
      return (
        <Error errorData={this.state.error} accessor={this.stateAccessor}/>
      )
    } else if (this.state.successInfo !== false) {
      return (
        <Success successInfo={this.state.successInfo} />
      )
    } else if (this.state.helpRequired !== false) {
      switch (this.state.helpRequired) {
        case "mojang_account":
          return (
            <MojangAccountHelp accessor={this.stateAccessor} authServer={this.state.authServer} serverOwner={this.state.serverInfo.serverOwner} />
          )
      }
    } else if (this.state.authServer === false) {
      return (
        <TypeAuthServer accessor={this.stateAccessor} />
      )
    } else if (this.state.serverInfo === false) {
      ConnectionCheck(this.state.authServer + "/serverStatus", this.stateAccessor);
      return (
        <Loading loadingData={{ title: "お待ちください...", description: `認証サーバー(${this.state.authServer})に接続しています...` }} />
      )
    } else if (this.state.mojangReady) {
      if (this.state.idGo) {
        MojangOAuth(this.state.authServer + "/mojangOAuth", "id", this.state.mojangUserInfo, this.stateAccessor, this.state.serverInfo.serverName, this.state.discordOAuth);
        return (
          <Loading loadingData={{ title: "ログインしています...", description: `しばらくお待ちください...` }} />
        )
      }
      if (this.state.idReady) {
        return (
          <MojangById accessor={this.stateAccessor} id={this.state.mojangUserInfo.id} serverName={this.state.serverInfo.serverName} />
        )
      }
      return (
        <LoginToMojang discordName={this.state.discordOAuth.userInfo.username} serverName={this.state.serverInfo.serverName} accessor={this.stateAccessor} />
      )

    } else if (this.state.discordOAuth.access_token !== undefined) {
      return (
        <DiscordLoggedIn accessor={this.stateAccessor} userName={this.state.discordOAuth.userInfo.username} serverName={this.state.serverInfo.serverName} />
      )
    } else if (this.state.discordOAuth === false) {
      return (
        <LoginToDiscord serverName={this.state.serverInfo.serverName} accessor={this.stateAccessor} discordGuildName={this.state.discord_guild_name} oauthTypes={this.state.oauthTypes} />
      )
    } else if (this.state.discordOAuth.access_token === undefined) {
      DiscordOAuth(this.state.authServer + "/discordOAuth", this.state.discordOAuth.code, this.stateAccessor);
      return (
        <Loading loadingData={{ title: "お待ちください...", description: "認証しています..." }} />
      )
    }
  }

  render() {
    return (
      <div className={this.state.dark ? "App dark" : "App"}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r dark:bg-gray-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white dark:bg-gray-700 shadow-lg sm:rounded-3xl sm:p-20">
              <this.screenChanger />
            </div>
          </div>
          <div className="fixed w-full text-center bottom-0">
            <div className="bg-white inline-block content-center p-3 rounded-t-xl shadow-xl ">
              <p className="p-2 text-center text-xs text-black ">Login Form Developed by Bony_Chops<br />{(this.state.serverInfo !== false) ? `Server Hosted by ${this.state.serverInfo.serverOwner}` : null}</p>
              <button onClick={this.toggleDark} className="rounded-xl hover:bg-black bg-white shadow-md focus:outline-none p-2">
                <p className="text-gray-500">{this.state.dark ? "ライトテーマ" : "ダークテーマ"}</p>
              </button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
