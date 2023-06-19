import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons'
library.add(fas,far);




const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
createApp(App).use(router).mount('#app')
app.mount('app');
