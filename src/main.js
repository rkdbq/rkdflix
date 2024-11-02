import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import Home from "@/components/Home.vue";
import Trend from "@/components/Trend.vue";
import Search from "@/components/Search.vue";
import MyList from "@/components/MyList.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/trend', component: Trend },
    { path: '/search', component: Search },
    { path: '/my-list', component: MyList },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
