import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import Home from "@/components/Home.vue";
import PopularMovie from "@/components/Popular.vue";
import Search from "@/components/Search.vue";
import Wishlist from "@/components/Wishlist.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/popular', component: PopularMovie },
    { path: '/search', component: Search },
    { path: '/Wishlist', component: Wishlist },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
