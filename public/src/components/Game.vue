<template>
    <div class="game">
        <div class="gameKaiju">
            <div class="title-big">{{ store.kaiju.name }}</div>
            <img class="kaijuImage" :src="store.kaiju.img" />
        </div>
        <div class="gameInputs">
            <div class="title-med">Level: {{ store.kaiju.level }}</div>
            <button @click="changeWindow('city')">
                Destroy cities and level up!
            </button>
            <button @click="changeWindow('fight')">
                fight against other Kaiju!
            </button>
            <button @click="changeWindow('leaderboard')">
                View Leaderboard!
            </button>
        </div>
        <Modal
            v-if="city"
            type="city"
            :change="changeWindow"
            width="40%"
            height="40%"
        >
            <City />
        </Modal>
        <Modal
            v-if="fight"
            type="fight"
            :change="changeWindow"
            width="70%"
            height="90%"
        >
            <Fight />
        </Modal>
        <Modal
            v-if="leaderboard"
            type="leaderboard"
            :change="changeWindow"
            width="50%"
            height="90%"
        >
            <Leaderboard />
        </Modal>
        <Modal
            v-if="!store.kaiju.alive"
            type="no-button"
            :change="changeWindow"
            width="80%"
            height="80%"
        >
            <Dead />
        </Modal>
    </div>
</template>

<script setup>
import store from '../store'
import { useRouter } from 'vue-router'
import callServer from '../callServer'
import Modal from './Modal.vue'
import City from './City.vue'
import Fight from './Fight.vue'
import Leaderboard from './Leaderboard.vue'
import Dead from './Dead.vue'
import { ref, onMounted } from 'vue'
let router = useRouter()
let city = ref(false),
    fight = ref(false),
    leaderboard = ref(false)

function changeWindow(window) {
    switch (window) {
        case 'city':
            city.value = !city.value
            break
        case 'fight':
            fight.value = !fight.value
            break
        case 'leaderboard':
            leaderboard.value = !leaderboard.value
            break
    }
}
onMounted(async () => {
    if (localStorage.getItem('my-kaiju') != null) {
        let kaiju = await callServer('getKaiju', {
            id: localStorage.getItem('my-kaiju')
        })
        store.kaiju = kaiju
        if (store.kaiju.state == 'CITY') {
            city.value = true
        }
    } else {
        router.push({ name: 'Home' })
    }
})
console.log(store)
</script>

<style lang="scss" scoped>
@import '../main.scss';
.game {
    display: flex;
    gap: 5rem;
    min-width: 50%;
    max-width: 80%;
    height: 70%;
    align-items: flex-start;
    justify-content: center;
    text-align: center;
    .gameKaiju {
        flex: 1;
        .kaijuImage {
            width: 100%;
            height: 100%;
            image-rendering: -moz-crisp-edges;
            image-rendering: -webkit-crisp-edges;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
            margin-top: 50px;
        }
    }
    .gameInputs {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        flex: 1;
        gap: 2rem;
    }
}
</style>
