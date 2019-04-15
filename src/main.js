//Imports do vue
import Vue from 'vue'
import App from './App.vue'

//Config de console

Vue.config.productionTip = false

/*
Declaracao da instancia do vue
definicao do render e ponto de "montagem" 
*/
new Vue({
  render: h => h(App),
}).$mount('#app')
