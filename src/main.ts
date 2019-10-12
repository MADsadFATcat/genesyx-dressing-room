import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// @ts-ignore
import VTooltip from 'v-tooltip';

library.add(faTrash, faEdit);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VTooltip);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
