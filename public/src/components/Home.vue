<template>
    <div class="home">
        <div class="title-big">The Worlds best kaiju</div>
        <button @click="openCreator">Create Kaiju</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import callServer from '../callServer'
import store from '../store'
let router = useRouter()

if (localStorage.getItem('my-kaiju') != null) {
    callServer('getKaiju', { id: localStorage.getItem('my-kaiju') }).then(
        (kaiju) => {
            if (kaiju) {
                store.kaiju = kaiju
                router.push({ name: 'Game' })
            }
        }
    )
}
function openCreator() {
    router.push({ name: 'Creator' })
}
</script>

<style lang="scss">
.home {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    justify-content: flex-start;
    align-items: center;
    gap: 15rem;
}
</style>
