import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import FavoritesView from '../views/FavoritesView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/connexion',
        name: 'connexion',
        component: LoginView,
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: FavoritesView,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
