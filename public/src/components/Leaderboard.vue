<template>
    <div class="leaderboard">
        <div class="header">
            <span class="title-med">Level</span>
            <span class="title-med">Kaiju</span>
        </div>
        <div v-for="kaiju in leaderboard" :key="kaiju.id" class="kaijus">
            <span class="level">{{ kaiju.level }}</span>
            <span class="name">{{ kaiju.name }}</span>
            <span class="kaiju"><img :src="kaiju.img" /></span>
        </div>
    </div>
</template>

<script setup>
import store from '../store'
import { onMounted, ref } from 'vue'
import callServer from '../callServer'
let leaderboard = ref([])
onMounted(async () => {
    let all = await callServer('getall')
    store.all = all

    leaderboard.value = all.sort((a, b) => b.level - a.level)
})
</script>

<style lang="scss" scoped>
@import '../main.scss';
.leaderboard {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;
    .header {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
        span {
            font-size: 5rem;
            flex: 1;
        }
    }
    .kaijus {
        display: flex;
        width: 80%;
        justify-content: center;
        align-items: center;
        text-align: center;
        span {
            flex: 1;
            font-size: 4rem;
        }
        .kaiju {
            img {
                width: 6rem;
            }
        }
        .name {
            font-family: $font-title;
        }
    }
}
</style>
