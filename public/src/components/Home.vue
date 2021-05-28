<template>
    <div>
        <button @click="openCreator">Create Kaiju</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
let router = useRouter()
function openCreator() {
    router.push({ name: 'Creator' })
}
</script>

<style lang="scss"></style>
