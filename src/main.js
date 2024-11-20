import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createStore } from 'vuex';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import Home from "@/components/Home.vue";
import PopularMovie from "@/components/Popular.vue";
import Search from "@/components/Search.vue";
import Wishlist from "@/components/Wishlist.vue";
import SignIn from "@/components/sign-in/SignIn.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/popular', component: PopularMovie },
    { path: '/search', component: Search },
    { path: '/wishlist', component: Wishlist },
    { path: '/sign-in', component: SignIn },
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
                search: {
                    'genre': "장르",
                    'vote avg': "별점",
                    'sort by': "기준",
                    'order by': "순서",
                }
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
        },
        updateSearchOption(state, { key, value }) {
            state.user.search[key] = value;
        },
    },
    actions: {
        toggleMovieInWishlist({ commit }, movieItem) {
            commit('toggleToWishlist', movieItem);
            const userId = store.state.user.userId;
            const user = {
                'password': store.state.user.password,
                'wishlist': store.state.user.wishlist,
                'search': store.state.user.search,
            }
            localStorage.setItem(userId, JSON.stringify(user));
        },
        updateMovieSearchOption({ commit }, payload) {
            const key = payload[0];
            const value = payload[1];
            console.log(key);
            commit('updateSearchOption', {key: key, value: value});
            const userId = store.state.user.userId;
            const user = {
                'password': store.state.user.password,
                'wishlist': store.state.user.wishlist,
                'search': store.state.user.search,
            }
            localStorage.setItem(userId, JSON.stringify(user));
        },
    },
});

createApp(App).use(router).use(store).use(ToastPlugin).mount('#app');
