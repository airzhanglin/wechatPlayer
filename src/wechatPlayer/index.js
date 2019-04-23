//导入单个组件

import wechatPlayer from './wechatPlayer.vue'

//为组件添加install 方法用于按需引入

wechatPlayer.install = function(Vue){
    Vue.component(wechatPlayer.name,wechatPlayer);
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) { 
    window.Vue.use(comment) 
}

export default wechatPlayer