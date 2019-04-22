# wechatplayer

> A Vue 2.x audio player component based on [wechatplayer](https://github.com/airzhanglin/wechatPlayer).


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
| url | String |  | 播放地址 |
| title | String |  | 音乐名称 |
| autoplay | Boolean | false | 是否自动播放（移动无法自动播放） |
| styleObject | Object | { width: "289px",  height: "71px"} | 播放器带下和其他自定义样式 |

## Method
| 名称 | 参数 | 描述 |
| ---- | ------ | ----------- |
| play | none | 播放 |
| pause | none | 暂停 |


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

