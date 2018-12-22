<template>
    <div id="box" ref="box">
        <canvas id="canvas" ref="canvas">
        </canvas>
    </div>
</template>

<script>
    //canvas烟花demo
    export default {
        name: 'fireWork',
        data () {
            return {
                ctx: null,
                fireList: [],
                fireWorkList: [],
                fireNumber: 10,
                range: 100,
                center: {},
                fire: {
                    x: 0,
                    y: 0,
                    size: 0,
                    fill: '',
                    vx: 0,
                    vy: 0,
                    ax: 0,
                    far: 0
                },
                fireWork: {},
                flag: true
            }
        },
        mounted () {
            this.init()
            this.loop()
            console.log(this.fireList)
            console.log(this.fireWorkList)
        },
        methods: {
            init () {
                this.$refs.canvas.width = this.$refs.box.clientWidth
                this.$refs.canvas.height = this.$refs.box.clientHeight
                this.ctx = this.$refs.canvas.getContext('2d')
                this.ctx.fillStyle = '#000'
                this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
                this.center.x = this.$refs.canvas.width / 2
                this.center.y = this.$refs.canvas.height / 2
                for (let i = 0; i < this.fireNumber; i++) {
                    const fire = {
                        x: Math.random() * this.range / 2 - this.range / 4 + this.center.x,
                        y: Math.random() * this.range * 2 + this.$refs.canvas.height,
                        size: Math.random() + 0.5,
                        fill: '#fd1',
                        vx: Math.random() - 0.5,
                        vy: -(Math.random() + 4),
                        ax: Math.random() * 0.02 - 0.01,
                        far: Math.random() * this.range + (this.center.y - this.range)
                    }
                    fire.base = {
                        x: fire.x,
                        y: fire.y,
                        vx: fire.vx
                    }
                    this.fireList.push(fire)
                }
            },
            randColor () {
                const r = Math.floor(Math.random() * 255)
                const g = Math.floor(Math.random() * 255)
                const b = Math.floor(Math.random() * 255)
                const color = 'rgb(' + r + ',' + g + ',' + b + ')'
                return color
            },
            loop () {
                window.requestAnimationFrame(this.loop)
                this.upData()
                this.draw()
            },
            upData () {
                for (let i = 0; i < this.fireList.length; i++) {
                    const fire = this.fireList[i]
                    if (fire.y <= fire.far) {
                        const color = this.randColor()
                        for (let i = 0; i < this.fireNumber * 5; i++) {
                            const fireWork = {
                                x: fire.x,
                                y: fire.y,
                                size: Math.random() + 1.5,
                                fill: color,
                                vx: Math.random() * 5 - 2.5,
                                vy: Math.random() * -5 + 1.5,
                                ay: 0.05,
                                alpha: 1,
                                life: Math.round(Math.random() * this.range / 2) + this.range / 2
                            }
                            fireWork.base = {
                                life: fireWork.life,
                                size: fireWork.size
                            }
                            this.fireWorkList.push(fireWork)
                        }
                        fire.y = fire.base.y
                        fire.x = fire.base.x
                        fire.vx = fire.base.vx
                        fire.ax = Math.random() * 0.02 - 0.01
                    }
                    fire.x += fire.vx
                    fire.y += fire.vy
                    fire.vx += fire.ax
                }
                for (let i = this.fireWorkList.length - 1; i >= 0; i--) {
                    const firework = this.fireWorkList[i]
                    if (firework) {
                        firework.x += firework.vx
                        firework.y += firework.vy
                        firework.vy += firework.ay
                        firework.alpha = firework.life / firework.base.life
                        firework.size = firework.alpha * firework.base.size
                        firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha
                        firework.life--
                        if (firework.life <= 0) {
                            this.fireWorkList.splice(i, 1)
                        }
                    }
                }
            },
            draw () {
                // clear
                this.ctx.globalCompositeOperation = 'source-over'
                this.ctx.globalAlpha = 0.18
                this.ctx.fillStyle = '#000'
                this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)

                // re-draw
                this.ctx.globalCompositeOperation = 'screen'
                this.ctx.globalAlpha = 1
                for (let i = 0; i < this.fireList.length; i++) {
                    const fire = this.fireList[i]
                    this.ctx.beginPath()
                    this.ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2)
                    this.ctx.closePath()
                    this.ctx.fillStyle = fire.fill
                    this.ctx.fill()
                }
                for (let i = 0; i < this.fireWorkList.length; i++) {
                    const firework = this.fireWorkList[i]
                    this.ctx.globalAlpha = firework.alpha
                    this.ctx.beginPath()
                    this.ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2)
                    this.ctx.closePath()
                    this.ctx.fillStyle = firework.fill
                    this.ctx.fill()
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #box {
        width: 100%;
        height: 100%;
    }
</style>
