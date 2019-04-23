<template>
  <div id="app">
    <wechat-player playerid="audioPlayer1" title="差不多先生-热狗.mp3123111111111111111111111111"
      url="https://shoppingmall.oss-cn-shanghai.aliyuncs.com/%E5%B7%AE%E4%B8%8D%E5%A4%9A%E5%85%88%E7%94%9F.mp3"
    ></wechat-player>
      <wechat-player playerid="audioPlayer2" title="差不多先生-热狗.mp3123111111111111111111111111"
      url="https://shoppingmall.oss-cn-shanghai.aliyuncs.com/%E5%B7%AE%E4%B8%8D%E5%A4%9A%E5%85%88%E7%94%9F.mp3"
    ></wechat-player>
  </div>
</template>

<script>
import wechatPlayer from "../dist/wechatPlayer.js";
export default {
  name: "app",
  components: { wechatPlayer },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  .wechatplayer-wraper {
    margin: auto;
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
