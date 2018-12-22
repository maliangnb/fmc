<template>
    <div id="visualize-box" ref="Box" style="background: #000">
        <canvas id="canvas" ref="visualize">
        </canvas>
    </div>
</template>

<script>
    export default {
        name: 'visualize',
        data () {
            return {
                //初始canvas
                c: '',
                ctx: null,
                cw: 0,
                ch: 0,
                lineWidth: 0,
                lineCap: '',
                //轨迹
                trail: [], //赛贝尔坐标集合
                maxTrail: 200,
                //arc
                arcx: 0,
                arcy: 0,
                radius: 1,
                angle: 0,
                growRadius: true,
                speed: 0.4,
                //时间
                seconds: 0,
                milliseconds: 0
            }
        },
        mounted () {
            this.loop()
            // this.initCanvas()
            // const arr = [2,5,8,9]
            // let i = arr.length
            // while (i--) {
            //     const point = arr[i]
            //     const newpoint = i == 5 ? arr[i+1] : arr[i]
            //     console.log(point)
            //     console.log(newpoint)
            // }
        },
        methods: {
            initCanvas () {
                this.c = this.$refs.visualize
                this.ctx = this.c.getContext('2d')
                this.$refs.visualize.width = this.$refs.Box.clientWidth
                this.$refs.visualize.height = this.$refs.Box.clientHeight
                this.cw = this.$refs.visualize.width
                this.ch = this.$refs.visualize.width
                this.ctx.lineWidth = 0.1
                this.ctx.lineCap = 'round'
                this.lineWidth = this.ctx.lineWidth
                this.lineCap = this.ctx.lineCap
                // this.test()
            },
            createPoint (x, y) {
                this.trail.push({x: x, y: y})
            },
            //介于rmi~rma的随机数 用于控制颜色
            rand (rmi, rma) {
                return (rma - rmi + 1) * Math.random() + rmi
            },
            updateTrail () {
                if (this.trail.length < this.maxTrail) {
                    this.createPoint(this.arcx, this.arcy)
                } else {
                    this.trail.splice(0, 1)
                }
            },
            updateArc () {
                this.arcx = this.cw / 2 + Math.cos(this.angle) * this.radius
                this.arcy = this.ch / 2 + Math.sin(this.angle) * this.radius
                const d = new Date()
                this.seconds = d.getSeconds()
                this.milliseconds = d.getMilliseconds()
                this.angle += this.speed * (this.seconds + 1 + (this.milliseconds / 1000))

                if (this.radius <= 1) {
                    this.growRadius = true
                }
                if (this.radius >= 200) {
                    this.growRadius = false
                }

                if (this.growRadius) {
                    this.radius += 1
                } else {
                    this.radius -= 1
                }
            },
            renderTrail () {
                let i = this.trail.length
                this.ctx.beginPath()
                while (i--) {
                    const point = this.trail[i]
                    const nextPoint = (i == this.trail.length) ? this.trail[i + 1] : this.trail[i]
                    const c = (point.x + nextPoint.x) / 2
                    const d = (point.y + nextPoint.y) / 2
                    this.ctx.quadraticCurveTo(Math.round(this.arcx), Math.round(this.arcy), c, d)
                }
                this.ctx.strokeStyle = 'hsla(' + this.rand(170, 300) + ', 100%, ' + this.rand(50, 75) + '%, 1)'
                this.ctx.stroke()
                this.ctx.closePath()
            },
            clearCanvas () {
                this.ctx.globalCompositeOperation = 'destination-out'
                this.ctx.fillStyle = 'rgba(0,0,0,0.1)'
                this.ctx.fillRect(0, 0, this.cw, this.ch)
                this.ctx.globalCompositeOperation = 'lighter'
            },
            loop () {
                const _this = this
                this.initCanvas()
                const loopIt = function () {
                    window.requestAnimationFrame(loopIt)
                    _this.clearCanvas()
                    _this.updateArc()
                    _this.updateTrail()
                    _this.renderTrail()
                }
                loopIt()
            },
            test () {
                this.ctx.strokeStyle = 'red'
                this.ctx.beginPath()
                // this.ctx.moveTo(20, 20)
                this.ctx.quadraticCurveTo(20, 100, 200, 20)
                this.ctx.stroke()
            },
            // setupRAF () {
            //     let lastTime = 0
            //     const vendors = ['ms', 'moz', 'webkit', 'o']
            //     for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            //         window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
            //         window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
            //     }
            //     if (!window.requestAnimationFrame) {
            //         window.requestAnimationFrame = function (callback, element) {
            //             const currTime = new Date().getTime()
            //             const timeToCall = Math.max(0, 16 - (currTime - lastTime))
            //             const id = window.setTimeout(function () {
            //                 callback(currTime + timeToCall)
            //             }, timeToCall)
            //             lastTime = currTime + timeToCall
            //             return id
            //         }
            //     }
            //     if (!window.cancelAnimationFrame) {
            //         window.cancelAnimationFrame = function (id) {
            //             clearTimeout(id)
            //         }
            //     }
            // },
        }
    }
</script>

<style scoped lang="less">
    #visualize-box {
        width: 100%;
        height: 100%;
    }
</style>
