<template>
    <div class="frame">
        <div class="cnvs">
            <canvas id="game" width="32" height="32" ref="cnvs"> </canvas>
            <div class="colors">
                <div
                    class="color"
                    v-for="color in colors"
                    :key="color"
                    @click="setColor(color)"
                    :style="{ backgroundColor: `rgb(${color})` }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { DB32, NES, EDG16 } from '../colorMaps'
export default {
    setup(props) {
        let colors = EDG16
        let cnvs = ref(null)
        let ctx
        let mouseDown = false
        let canvasWidth = 32
        let canvasHeight = 32
        let getBase64 = () => cnvs.value.toDataURL()
        let rgb = [0, 0, 0]
        let setColor = (rgbS) => (rgb = rgbS.split(','))
        let history = []
        let data = {}
        let eraserMode = false
        let toggleEraser = () => (eraserMode = !eraserMode)
        onMounted(() => {
            ctx = cnvs.value.getContext('2d')
            data = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] = 0
                data.data[i + 1] = 0
                data.data[i + 2] = 0
                data.data[i + 3] = 0
            }
            ctx.putImageData(data, 0, 0)
            history.push(data)

            let { x: cnvX, y: cnvY } = cnvs.value.getBoundingClientRect()
            cnvs.value.addEventListener('mousedown', (e) => {
                if (e.ctrlKey) {
                    spread(e)
                } else {
                    mouseDown = true
                    draw(e)
                }
            })
            cnvs.value.addEventListener('mouseup', (_) => {
                mouseDown = false
                history.push(data)
            })
            cnvs.value.addEventListener('mouseleave', (_) => {
                mouseDown = false
                history.push(data)
            })
            cnvs.value.addEventListener('mousemove', draw)
            function draw(e) {
                if (mouseDown) {
                    let x = Math.floor((e.x - cnvX) / 16)
                    let y = Math.floor((e.y - cnvY) / 16)
                    setPixel(x, y, data.data)
                    ctx.putImageData(data, 0, 0)
                }
            }
            function spread(e) {
                let x = Math.floor((e.x - cnvX) / 16)
                let y = Math.floor((e.y - cnvY) / 16)
                let pix = getPixel(x, y, data.data)
                doSpread(x, y, pix, data)
            }
            function doSpread(x, y, startPix, data) {
                if (getPixel(x, y - 1, data.data) == startPix) {
                    setPixel(x, y - 1, data.data)
                    doSpread(x, y - 1, startPix, data)
                }
                if (getPixel(x, y + 1, data.data) == startPix) {
                    setPixel(x, y + 1, data.data)
                    doSpread(x, y + 1, startPix, data)
                }
                if (getPixel(x - 1, y, data.data) == startPix) {
                    setPixel(x - 1, y, data.data)
                    doSpread(x - 1, y, startPix, data)
                }
                if (getPixel(x + 1, y, data.data) == startPix) {
                    setPixel(x + 1, y, data.data)
                    doSpread(x + 1, y, startPix, data)
                }
                setPixel(x, y, data.data)
                ctx.putImageData(data, 0, 0)
            }
        })
        function setPixel(x, y, data) {
            let transX = x * 4
            let transY = y * 32 * 4
            let pos = transX + transY

            data[pos] = eraserMode ? 0 : rgb[0]
            data[pos + 1] = eraserMode ? 0 : rgb[1]
            data[pos + 2] = eraserMode ? 0 : rgb[2]
            data[pos + 3] = eraserMode ? 0 : 255
        }
        function getPixel(x, y, data) {
            let transX = x * 4
            let transY = y * 32 * 4
            let pos = transX + transY
            return `${data[pos]},${data[pos + 1]},${data[pos + 2]},${
                data[pos + 3]
            }`
        }
        return {
            cnvs,
            getBase64,
            setColor,
            colors,
            props,
            toggleEraser,
            eraserMode
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';

.frame {
    width: 647px;
    height: 708px;
    background-size: 647px;
    background-repeat: no-repeat;
    background-position-x: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .cnvs {
        width: 512px;
        height: 560px;
        border: solid black 16px;
        canvas {
            cursor: crosshair;
            background-image: repeating-linear-gradient(
                    #ccc 0 1px,
                    transparent 1px 100%
                ),
                repeating-linear-gradient(
                    90deg,
                    #ccc 0 1px,
                    transparent 1px 100%
                );
            background-size: 16px 16px;
            background-color: rgba(#fff, 0.9);
            width: 100%;
            height: 512px;
            image-rendering: -moz-crisp-edges;
            image-rendering: -webkit-crisp-edges;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }
        .colors {
            display: flex;
            border-top: solid black 16px;
            width: 100%;
            height: 32px;
            margin-top: -4px;
            .color {
                height: 100%;
                flex: 1;
                cursor: pointer;
                &:hover {
                    filter: brightness(0.9);
                    &:active {
                        filter: brightness(0.8);
                    }
                }
            }
        }
    }
}
</style>
