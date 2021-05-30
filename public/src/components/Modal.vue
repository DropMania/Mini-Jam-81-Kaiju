<template>
    <div class="modal-bg">
        <div
            class="window"
            :style="{ width: props.width, height: props.height }"
        >
            <div class="content">
                <slot />
            </div>
            <button @click="close" v-if="props.type != 'no-button'">
                Close
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        change: Function,
        type: String,
        width: String,
        height: String
    },
    setup(props) {
        console.log(props)
        function close() {
            props.change(props.type)
        }
        return { close, props }
    }
}
</script>

<style lang="scss">
.modal-bg {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);

    .window {
        display: flex;
        background: url(./src/assets/img/bg2.gif);
        background-size: 100%;
        flex-direction: column;
        border: solid rgb(240, 224, 255);
        image-rendering: -moz-crisp-edges;
        image-rendering: -webkit-crisp-edges;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        .content {
            overflow-y: auto;
            flex: 9;
        }
        button {
            flex: 1;
        }
    }
}
</style>
