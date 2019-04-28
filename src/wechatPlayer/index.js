//导入单个组件

import wechatPlayer from './wechatPlayer.vue'

//为组件添加install 方法用于按需引入

wechatPlayer.install = function(Vue){
    Vue.component(wechatPlayer.name,wechatPlayer);
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

export default wechatPlayer