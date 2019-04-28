# wechatplayer

写了一个类似于微信公众号网页播放器
![此处输入图片的描述][1]


## Install

```bash
npm install wechatplayer -S
```

## Usage

```js
import wechatPlayer from 'wechatplayer'

export default {
  components: {
    wechatPlayer
  }
}
```
## Props

| 名称    | 类型 | 默认值 | 说明 |
| ---------- | ---- | ------- | ----------- |
| playerid | String | audio-player | 定义播放器的id |
| url | String |  | 播放地址 |
| title | String |  | 音乐名称 |
| autoplay | Boolean | false | 是否自动播放（移动端无法自动播放） |
| styleObject | Object | { width: "289px",  height: "71px"} | 播放器大小和其他自定义样式 |

## Method
| 名称 | 参数 | 描述 |
| ---- | ------ | ----------- |
| play | none | 播放 |
| pause | none | 暂停 |

Example:

```js
<wechat-player ref="wechaplayer"></wechat-player>
<button @click="play">播放</button>

export default {
    methods: {
      play() {
        this.$refs.wechaplayer.play();
      }
    }
```
## Events
| 名称 | 参数 | 描述 |
| ---- | ------ | ----------- |
| play | none | 播放 |
| pause | none | 暂停 |
| canplay | none | 可以播放 |
| error | none | 播放失败 |
| ended | none | 播放完毕 |

Example:

```js
<wechat-player @play="play"></wechat-player>

export default {
    methods: {
      play() {
        console.log('play callback')
      }
    }
```


  [1]: http://shoppingmall.oss-cn-shanghai.aliyuncs.com/85b03fe8907838ab737e69806db7d2d.png