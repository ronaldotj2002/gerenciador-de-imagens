import Vue from 'vue'
import App from './App.vue'

// importando o módulo
import VueResource from 'vue-resource';

//registrando o módulo no global view objeto
Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
