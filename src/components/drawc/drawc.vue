<template>
    <div class="canvas">
        <canvas id="canvas" width="300" height="300">
        </canvas>
    </div>
</template>

<script>
    export default {
        name: 'drawc',
        data () {
            return {}
        },
        created () {
            // this.sun = new Image()
            // this.moon = new Image()
            // this.earth = new Image()
        },
        mounted () {
            // this._draw()
            this.drawTime()
            console.log(window)
        },
        methods: {
            //太阳系运行动图
            // _draw () {
            //     this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'
            //     this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
            //     this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
            //     window.requestAnimationFrame(this.testDraw)
            // },
            // draw () {
            //     const ctx = document.getElementById('canvas').getContext('2d')
            //
            //     ctx.globalCompositeOperation = 'destination-over'
            //     ctx.clearRect(0, 0, 300, 300) // clear canvas
            //
            //     ctx.fillStyle = 'rgba(0,0,0,0.4)'
            //     ctx.strokeStyle = 'rgba(0,153,255,0.4)'
            //     ctx.save()
            //     ctx.translate(150, 150)
            //
            //     // Earth
            //     const time = new Date()
            //     ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds())
            //     ctx.translate(105, 0)
            //     ctx.fillRect(0, -12, 50, 24) // Shadow
            //     ctx.drawImage(this.earth, -12, -12)
            //
            //     // Moon
            //     ctx.save()
            //     ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds())
            //     ctx.translate(0, 28.5)
            //     ctx.drawImage(this.moon, -3.5, -3.5)
            //     ctx.restore()
            //
            //     ctx.restore()
            //
            //     ctx.beginPath()
            //     ctx.arc(150, 150, 105, 0, Math.PI * 2, false) // Earth orbit
            //     ctx.stroke()
            //
            //     ctx.drawImage(this.sun, 0, 0, 300, 300)
            //
            //     window.requestAnimationFrame(this.draw)
            // }
            //时钟
            drawTime () {
                const now = new Date()
                const ctx = document.getElementById('canvas').getContext('2d')
                const sec = now.getSeconds()
                const min = now.getMinutes()
                let hour = now.getHours()
                hour = hour >= 12 ? hour - 12 : hour
                console.log(ctx)
                ctx.clearRect(0, 0, 300, 300)
                ctx.strokeStyle = 'black'
                ctx.save()
                ctx.arc(150, 150, 100, 0, Math.PI * 2, false)
                ctx.stroke()
                ctx.strokeStyle = 'rgba(0,0,0,0.6)'
                ctx.lineWidth = 2.5
                ctx.save()
                ctx.translate(150, 150)
                //时钟点刻度
                for (let i = 0; i < 12; i++) {
                    ctx.beginPath()
                    ctx.rotate(Math.PI / 6)
                    ctx.moveTo(96, 0)
                    ctx.lineTo(86, 0)
                    ctx.stroke()
                }
                //时钟分刻度
                ctx.restore()
                ctx.strokeStyle = 'rgba(0,0,0,0.4)'
                ctx.lineWidth = 1.5
                ctx.translate(150, 150)
                for (let i = 0; i < 60; i++) {
                    ctx.beginPath()
                    ctx.rotate(Math.PI * 2 / 60)
                    ctx.moveTo(96, 0)
                    ctx.lineTo(92, 0)
                    ctx.stroke()
                }
                //秒钟旋转
                ctx.restore()
                ctx.strokeStyle = 'rgba(0,0,0,0.9)'
                ctx.lineWidth = 1.5
                ctx.lineCap = 'butt'
                ctx.save()
                ctx.beginPath()
                ctx.translate(150, 150)
                ctx.rotate((Math.PI * 2 / 60) * sec)
                ctx.moveTo(96, 0)
                ctx.lineTo(-15, 0)
                ctx.stroke()
                //分钟旋转
                ctx.restore()
                ctx.strokeStyle = 'rgba(0,0,0,0.7)'
                ctx.lineWidth = 2.5
                ctx.lineCap = 'square'
                ctx.save()
                ctx.translate(150, 150)
                ctx.rotate((Math.PI * 2 / 3600) * sec + (Math.PI * 2 / 60) * min)
                ctx.beginPath()
                ctx.moveTo(70, 0)
                ctx.lineTo(-10, 0)
                ctx.stroke()
                //时钟旋转
                ctx.restore()
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 3.5
                ctx.lineCap = 'square'
                ctx.save()
                ctx.translate(150, 150)
                ctx.rotate((Math.PI / 21600) * sec + (Math.PI * 2 / 720) * min + (Math.PI * 2 / 12) * hour)
                ctx.beginPath()
                ctx.moveTo(50, 0)
                ctx.lineTo(-5, 0)
                ctx.stroke()
                ctx.restore()
                ctx.beginPath()
                window.requestAnimationFrame(this.drawTime)
            }
        }
    }
</script>

<style scoped lang="less">
    #canvas {
        border: 1px solid #ff5778;
    }
</style>
