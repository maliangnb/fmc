<template>
    <div id="rain-box" ref="rainBox">
        <canvas id="canvas" ref="rains">
        </canvas>
    </div>
</template>

<script>
    //下雨demo(速度处理的不好)
    export default {
        name: 'rain',
        data () {
            return {
                rains: [],
                rainNum: 1000,
                prains: []
            }
        },
        mounted () {
            this.initData()
            this.loop()
            console.log(this.rains)
        },
        methods: {
            initData () {
                this.$refs.rains.width = this.$refs.rainBox.clientWidth
                this.$refs.rains.height = this.$refs.rainBox.clientHeight
                for (let i = 0; i < this.rainNum; i++) {
                    const rainObj = {
                        x: Math.floor(Math.random() * this.$refs.rainBox.clientWidth),
                        y: Math.floor(Math.random() * this.$refs.rainBox.clientHeight),
                        xl: Math.random() * -0.6 + 0.3,
                        yl: Math.random() * 0.01 + 4,
                        vy: 0.01 + Math.random() * 0.02,
                        vx: 0.005 + Math.random() * 0.002
                    }
                    this.rains.push(rainObj)
                }
            },
            upData () {
                for (let i = 0; i < this.rains.length; i++) {
                    const rain = this.rains[i]
                    if (rain.x > this.$refs.rains.width || rain.y > this.$refs.rains.height) {
                        rain.x = Math.floor(Math.random() * this.$refs.rains.width)
                        rain.y = Math.floor(-100 * Math.random() + 50)
                        rain.xl = Math.random() * 0.2
                        rain.yl = Math.random() * 0.01 + 4
                        rain.vy = 0.05 + Math.random() * 0.02
                    }
                    rain.xl += rain.vx
                    rain.x += rain.xl
                    rain.vy = rain.vy + rain.vy * 0.025
                    rain.yl += rain.vy
                    rain.y += rain.yl
                }
            },
            draw () {
                const ctx = this.$refs.rains.getContext('2d')
                ctx.save()
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(0,0,this.$refs.rainBox.clientWidth,this.$refs.rainBox.clientHeight)
                ctx.restore()
                // ctx.globalAlpha = 0.18
                ctx.fillStyle = 'rgba(255,255,255,0.2)'
                ctx.fillRect(0, 0, this.$refs.rains.width, this.$refs.rains.height)
                for (let i = 0; i < this.rains.length; i++) {
                    const rain = this.rains[i]
                    ctx.beginPath()
                    ctx.moveTo(rain.x, rain.y)
                    ctx.lineTo(rain.x + rain.xl, rain.y + rain.yl)
                    ctx.strokeStyle = 'rgba(174,194,224,0.5)'
                    ctx.lineWidth = 1.5
                    ctx.lineCap = 'round'
                    ctx.closePath()
                    ctx.stroke()
                }
            },
            loop () {
                window.requestAnimationFrame(this.loop)
                this.upData()
                this.draw()
            },
            _draw () {
                const ctx = this.$refs.rains.getContext('2d')
                ctx.beginPath()
                ctx.moveTo(5, 5)
                ctx.lineTo(20, 15)
                ctx.strokeStyle = 'rgba(0,0,0,0.7)'
                ctx.lineWidth = 1.5
                ctx.stroke()
            }
        }
    }
</script>

<style scoped lang="less">
    #rain-box {
        width: 100%;
        height: 100%;
    }
</style>
