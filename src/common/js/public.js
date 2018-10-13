export function getRect (el) {
    if (el instanceof window.SVGElement) {
        const rect = el.getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}

export function getData (el, name, val) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    } else {
        return el.getAttribute(prefix + name)
    }
}

//canvas => drawSpirograph 方法用来绘制螺旋（spirograph）图案
//ctx => CanvasRenderingContext2D对象
//  R,r,O => type 为 Number
export function drawSpirograph (ctx, R, r, O) {
    let x1 = R - O
    let y1 = 0
    let i = 1
    let x2,y2
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    do {
        if (i > 20000) break
        x2 = (R + r) * Math.cos(i * Math.PI / 72) - (r + O) * Math.cos(((R + r) / r) * (i * Math.PI / 72))
        y2 = (R + r) * Math.sin(i * Math.PI / 72) - (r + O) * Math.sin(((R + r) / r) * (i * Math.PI / 72))
        ctx.lineTo(x2, y2)
        x1 = x2
        y1 = y2
        i++
    } while (x2 != R - O && y2 != 0)
    ctx.stroke()
}
//canvas画星星
export function drawStar (ctx, r) {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(r, 0)
    for (let i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5)
        if (i % 2 == 0) {
            ctx.lineTo((r / 0.525731) * 0.200811, 0)
        } else {
            ctx.lineTo(r, 0)
        }
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
}
