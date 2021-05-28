<template>
    <div class="KaijuCreator">
        <div class="KajuImage">
            <div class="title-med">Draw your Kaiju:</div>
            <PixelDrawer ref="drawer" />
        </div>
        <div class="KajuText">
            <div class="title-med">Name your Kaiju:</div>
            <input type="text" v-model="kaijuName" />
            <button @click="create">Create!</button>
        </div>
    </div>
</template>

<script setup>
import PixelDrawer from './PixelDrawer.vue'
import { ref } from 'vue'
import callServer from '../callServer'
import store from '../store'
import { useRouter } from 'vue-router'
let router = useRouter()
let kaijuName = ref('')
let drawer = ref(null)
async function create() {
    let data = {
        img: drawer.value.getBase64(),
        name: kaijuName.value
    }
    let kaiju = await callServer('createkaiju', data)
    console.log(kaiju)
    store.kaiju = kaiju
    router.push({ name: 'Game' })
}
</script>

<style lang="scss">
.KaijuCreator {
    display: flex;
    text-align: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .KaijuImage {
        flex: 1;
    }
    .KaijuText {
        flex: 1;
    }
}
</style>
