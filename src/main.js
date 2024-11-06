import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createStore } from 'vuex';

import Home from "@/components/Home.vue";
import PopularMovie from "@/components/Popular.vue";
import Search from "@/components/Search.vue";
import Wishlist from "@/components/Wishlist.vue";
import SignIn from "@/components/SignIn.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/popular', component: PopularMovie },
    { path: '/search', component: Search },
    { path: '/wishlist', component: Wishlist },
    { path: '/signin', component: SignIn },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const store = createStore({
    state() {
        return {
            user: {
                userId: null,
                password: null,
                wishlist: {},
            },
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        toggleToWishlist(state, movieItem) {
            const id = movieItem['id'];
            if (state.user.wishlist[id]) {
                delete state.user.wishlist[id];
            }
            else {
                state.user.wishlist[id] = movieItem;
            }
            console.log(state.user.wishlist[id]);
        }
    },
    actions: {
        toggleMovieInWishlist({ commit }, movieItem) {
            commit('toggleToWishlist', movieItem);
            const userId = store.state.user.userId;
            const user = {
                'password': store.state.user.password,
                'wishlist': store.state.user.wishlist,
            }
            localStorage.setItem(userId, JSON.stringify(user));
        }
    },
});

createApp(App).use(router).use(store).mount('#app');
router.push('/signin');