<template>
    <div class="KaijuCreator">
        <div class="KaijuImage">
            <div class="title-med">Draw your Kaiju:</div>
            Hold CTRL for fill-mode
            <PixelDrawer ref="drawer" />
            <button
                @click="drawer.toggleEraser(), toggleBtn()"
                :style="{ filter: `invert(${ermode ? 1 : 0})` }"
            >
                eraser
            </button>
        </div>
        <div class="KaijuText">
            <div class="title-med">Name your Kaiju:</div>
            <input
                type="text"
                v-model="kaijuName"
                class="input"
                placeholder="Name..."
            />
            <button @click="create">Create!</button>
        </div>
    </div>
</template>

<script setup>
import PixelDrawer from './PixelDrawer.vue'
import { ref, watch, onMounted } from 'vue'
import callServer from '../callServer'
import store from '../store'
import { useRouter } from 'vue-router'
let router = useRouter()
let kaijuName = ref('')
let drawer = ref(null)
let ermode = ref(false)

function toggleBtn() {
    console.log('test')
    ermode.value = !ermode.value
}

async function create() {
    let data = {
        img: drawer.value.getBase64(),
        name: kaijuName.value
    }
    let kaiju = await callServer('createkaiju', data)

    store.kaiju = kaiju
    if (localStorage.getItem('my-kaiju') != null) {
        await callServer('removekaiju', {
            id: localStorage.getItem('my-kaiju')
        })
    }
    localStorage.setItem('my-kaiju', kaiju.id)
    router.push({ name: 'Game' })
}
</script>

<style lang="scss">
.KaijuCreator {
    display: flex;
    text-align: center;
    width: 70%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .KaijuImage {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .KaijuText {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5rem;
        .input {
            background: #0d001a;
            padding: 10px;
            border: solid #f0e0ff;
            font-size: 2rem;
            color: #f0e0ff;
        }
    }
}
</style>
