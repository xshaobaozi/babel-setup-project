import Vue from 'vue'
import ElementUI from 'element-ui';
// import ElButton from 'element-ui/packages/button'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(ElButton);
new Vue({
  render: h => h(App),
}).$mount('#app')
