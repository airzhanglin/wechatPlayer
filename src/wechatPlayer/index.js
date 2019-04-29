//导入单个组件

import wechatPlayer from './wechatPlayer.vue'

//为组件添加install 方法用于按需引入

wechatPlayer.install = function(Vue){
    Vue.component(wechatPlayer.name,wechatPlayer);
}
// 标签的方式引入，留到后面再另开新篇讨论
  //const install = function(Vue, opts = {}) {
　//　　Vue.component(wechatPlayer.name, wechatPlayer);
　//}
/* 支持使用标签的方式引入 Vue是全局变量时，自动install */
//if (typeof window !== 'undefined' && window.Vue) {
//  install(window.Vue);
//}

export default wechatPlayer