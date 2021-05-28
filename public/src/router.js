import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home.vue'
import KC from './components/KaijuCreator.vue'
import Game from './components/Game.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/creator',
        name: 'Creator',
        component: KC
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
