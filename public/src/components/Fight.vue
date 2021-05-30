<template>
    <div class="fight">
        <div class="leaderboard" v-if="!fighting && !result">
            <div class="header">
                <span class="title-med">Level</span>
                <span class="title-med">Name</span>
                <span class="title-med">Kaiju</span>
                <span class="title-med" style="font-size: 2.5rem">
                    win chance
                </span>
                <span class="title-med" style="font-size: 2.5rem">
                    level to win
                </span>
                <span></span>
            </div>
            <div v-for="kaiju in enemies" :key="kaiju.id" class="kaijus">
                <span class="level">{{ kaiju.level }}</span>
                <span class="name">{{ kaiju.name }}</span>
                <span class="kaiju"><img :src="kaiju.img" /></span>
                <span class="win">{{ kaiju.chance }}%</span>
                <span class="score">{{ kaiju.score }}</span>
                <span class="fightBtn">
                    <button @click="fight(kaiju)">Fight!</button>
                </span>
            </div>
        </div>
        <div class="fighting" v-if="fighting">
            <span class="title-med">fighting against {{ against.name }}</span>
            <div class="fight-scene">
                <div class="me">
                    <img :src="store.kaiju.img" />
                </div>
                <div class="him">
                    <img :src="against.img" />
                </div>
            </div>
        </div>
        <div class="result" v-if="result">
            <span class="title-med">you have {{ winText }}</span>
            <span style="font-size: 2.5rem"
                >you earned {{ against.score }} level!</span
            >
            <div class="win-scene">
                <img
                    class="loser"
                    :src="winText == 'won' ? against.img : store.kaiju.img"
                />
                <!-- https://gifimage.net/pixel-explosion-gif-8/ -->
                <img src="/src/assets/img/burn.gif" class="burn" />
            </div>
        </div>
    </div>
</template>

<script setup>
import store from '../store'
import { onMounted, ref } from 'vue'
import callServer from '../callServer'
let enemies = ref([])
let fighting = ref(false)
let result = ref(false)
let against = ref({ name: '', img: '' })
let winText = ref('')
onMounted(() => {
    setEnemies()
})
async function setEnemies() {
    let all = await callServer('getall')
    store.all = all
    enemies.value = all
        .filter((k) => k.id != store.kaiju.id && !k.alive)
        .map((k) => {
            let total = store.kaiju.level + k.level
            return {
                ...k,
                chance: Math.round((store.kaiju.level / total) * 100),
                score:
                    10 -
                    Math.floor(
                        Math.round((store.kaiju.level / total) * 100) / 10
                    )
            }
        })
    enemies.value.sort((a, b) => b.chance - a.chance)
}
function fight(enemy) {
    against.value = enemy
    let win = false
    if (Math.random() <= enemy.chance / 100) {
        win = true
    }
    winText.value = win ? 'won' : 'lost'
    let score = 10 - Math.floor(enemy.chance / 10)
    fighting.value = true
    setTimeout(async () => {
        console.log(win)
        result.value = true
        fighting.value = false
        let kaiju = await callServer('fight', {
            id: store.kaiju.id,
            win,
            score
        })
        setTimeout(async () => {
            result.value = false
            store.kaiju = kaiju
            setEnemies()
        }, 5000)
    }, 5000)
}
</script>

<style lang="scss">
@import '../main.scss';
@keyframes mefight {
    0% {
        margin-left: 0px;
    }
    20% {
        margin-left: -30px;
    }
    40% {
        margin-left: 100px;
    }
    50% {
        margin-left: -20px;
    }
    60% {
        margin-left: 10px;
    }
    100% {
        margin-left: 0px;
    }
}
@keyframes himfight {
    0% {
        margin-left: 0px;
    }
    20% {
        margin-left: 30px;
    }
    40% {
        margin-left: -100px;
    }
    50% {
        margin-left: 20px;
    }
    60% {
        margin-left: -10px;
    }
    100% {
        margin-left: 0px;
    }
}

.fight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
            width: 100%;
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
    .fighting {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-align: center;
        height: 100%;
        .fight-scene {
            width: 100%;
            display: flex;
            height: 100%;
            text-align: center;
            align-items: center;
            justify-content: center;
            .me {
                flex: 1;
                img {
                    width: 8rem;
                    animation: mefight 1s infinite;
                }
            }
            .him {
                flex: 1;
                img {
                    width: 8rem;
                    animation: himfight 1s infinite;
                    animation-delay: 0.5s;
                }
            }
        }
    }
    .result {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        span {
            flex: 1;
        }
        .win-scene {
            flex: 1;
            .loser {
                width: 8rem;
            }
            .burn {
                width: 25rem;
                margin-left: -15rem;
                margin-top: -5rem;
                position: absolute;
            }
        }
    }
}
</style>
