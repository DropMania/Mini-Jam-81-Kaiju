<template>
    <div class="death">
        <div class="title-med">Youre Dead :(</div>
        <p class="notover">
            However Death is not the end for a Kaiju <br />
            Your Kaiju heals over time<br />
            check in later to see if your kaiju is back alive <br />
            although it will take some for it to recover
        </p>
    </div>
</template>

<script setup>
import callServer from '../callServer'
import store from '../store'
import { onMounted, onBeforeUnmount } from 'vue'
let interval
onMounted(async () => {
    interval = setInterval(async () => {
        let kaiju = await callServer('getKaiju', {
            id: store.kaiju.id
        })
        store.kaiju = kaiju
    }, 5000)
})
onBeforeUnmount(() => {
    clearInterval(interval)
})
</script>

<style lang="scss">
.death {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    .notover {
        font-size: 2rem;
        width: 70%;
        line-height: 3.5rem;
    }
}
</style>
