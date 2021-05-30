<template>
    <div class="bg"></div>
    <router-view />
</template>

<script setup></script>

<style lang="scss">
@import './main.scss';
* {
    font-family: $font-primary;
}
body,
html,
#app {
    //background: $bg-primary;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    color: rgb(240, 224, 255);
    display: flex;
    align-items: center;
    justify-content: center;
}
.bg {
    height: 100%;
    width: 100%;
    position: absolute;
    background-image: url(./assets/img/bg.gif);

    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: -1;
}
button {
    font-family: $font-primary;
    background: rgb(55, 0, 92);
    color: rgb(240, 224, 255);
    outline: none;
    border: solid rgb(240, 224, 255);
    padding: 10px;
    font-size: 2rem;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
    }
}
.title-med {
    font-size: 3rem;
}
.title-big {
    font-size: 7rem;
    font-family: $font-title;
}
</style>
