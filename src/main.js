import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueCurrencyInput from 'vue-currency-input';

import AnimateCSS from 'animate.css';
Vue.use(AnimateCSS);

Vue.use(VueCurrencyInput)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
