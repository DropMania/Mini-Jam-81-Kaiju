<template>
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
    background: $bg-primary;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title-med {
    font-size: 3rem;
}
</style>
