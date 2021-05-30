<template>
    <div class="city">
        <div class="title-med">Destroying Cities...</div>
        <div class="title-med">Level: {{ store.kaiju.level }}</div>
        Keep this window open to level up over time!
        <div class="city-scene">
            <div class="me">
                <img :src="store.kaiju.img" />
            </div>
            <div class="cityimg">
                <img src="src/assets/img/city.png" />
            </div>
        </div>
    </div>
</template>

<script setup>
import callServer from '../callServer'
import store from '../store'
import { onMounted, onBeforeUnmount } from 'vue'
let interval
onMounted(async () => {
    if (store.kaiju.state == 'NONE') {
        let kaiju = await callServer('startcity', {
            id: store.kaiju.id
        })
        store.kaiju = kaiju
    }
    interval = setInterval(async () => {
        let kaiju = await callServer('getKaiju', {
            id: store.kaiju.id
        })
        store.kaiju = kaiju
    }, 5000)
})
onBeforeUnmount(async () => {
    let kaiju = await callServer('endcity', {
        id: store.kaiju.id
    })
    store.kaiju = kaiju
    clearInterval(interval)
})
</script>

<style lang="scss">
@keyframes mefight {
    0% {
        margin-left: 0px;
    }
    20% {
        margin-left: -30px;
    }
    40% {
        margin-left: 100px;
    }
    50% {
        margin-left: -20px;
    }
    60% {
        margin-left: 10px;
    }
    100% {
        margin-left: 0px;
    }
}
@keyframes city {
    0% {
        margin-left: 0px;
    }
    20% {
        margin-left: 0px;
    }
    40% {
        margin-left: 0px;
    }
    50% {
        margin-left: 20px;
    }
    60% {
        margin-left: -20px;
    }
    70% {
        margin-left: 10px;
    }
    80% {
        margin-left: -10px;
    }
    100% {
        margin-left: 0px;
    }
}
.city {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .city-scene {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .me {
            flex: 1;
            img {
                width: 8rem;
                animation: mefight 1s infinite;
            }
        }
        .cityimg {
            flex: 1;
            img {
                width: 8rem;
                animation: city 1s infinite;
            }
        }
    }
}
</style>
