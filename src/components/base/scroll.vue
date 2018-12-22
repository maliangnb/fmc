<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <div class="list-wrapper" ref="listWrapper">
                <slot>
                    <ul class="list-content">
                        <li v-for="(item, index) in data" :key="index" @click="clickItem($event,item)">
                            {{item}}
                        </li>
                    </ul>
                </slot>
            </div>
            <slot name="pullup" :pullUpLoad="ispullUpLoad">
                <!--加载信息-->
                <div class="pullup-wrapper" v-if="pullUpLoad">
                    <div v-if="ispullUpLoad" class="after-trigger">
                        <loading></loading>
                        <span>{{pullUpTxt}}</span>
                    </div>
                    <div v-if="nomoreTxtFlag">
                        <span>{{nomoretxt}}</span>
                    </div>
                </div>
            </slot>
            <slot name="pulldown" :pullDownRefresh="isPullDownRefresh" :isPullingDown="isPullingDown">
                <!--刷新信息-->
                <div v-if="pullDownRefresh" class="pulldown-wrapper">
                    <div v-if="isPullingDown" class="after-trigger">
                        <loading></loading>
                        <span>{{pullDownTxt}}</span>
                    </div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {getRect} from '../../common/js/public'
    import loading from '@/components/base/loading'

    const DIRECTION_V = 'vertical'
    const DIRECTION_H = 'horizontal'
    export default {
        name: 'scroll',
        components: {
            loading
        },
        props: {
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: false
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            listenBeforeScroll: {
                type: Boolean,
                default: false
            },
            listenScrollEnd: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: DIRECTION_V
            },
            scrollbar: {
                type: null,
                default: false
            },
            pullDownRefresh: {
                type: null,
                default: false
            },
            pullUpLoad: {
                type: null,
                default: false
            },
            startY: {
                type: Number,
                default: 0
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            freeScroll: {
                type: Boolean,
                default: false
            },
            mouseWheel: {
                type: Boolean,
                default: false
            },
            bounce: {
                default: true
            },
            zoom: {
                default: false
            },
            nomoreTxtFlag: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isPullDownRefresh: false,
                isPullingDown: false,
                ispullUpLoad: false,
                pullDownTxt: '正在刷新...',
                pullUpTxt: '正在加载中...',
                refreshText: '刷新完成...',
                nomoreTxt: '没有更多了...',
            }
        },
        mounted () {
            setTimeout(() => {
                this.initScroll()
            }, 20)
        },
        computed: {
            nomoretxt () {
                if (this.nomoreTxtFlag === true && this.ispullUpLoad === false) {
                    return this.nomoreTxt
                } else {
                    return
                }
            }
        },
        methods: {
            initScroll () {
                if (!this.$refs.wrapper) {
                    return
                }
                if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
                    this.$refs.listWrapper.style.minHeight = (getRect(this.$refs.wrapper).height + 1) + 'px'
                }
                const options = {
                    probeType: this.probeType,
                    click: this.click,
                    scrollY: this.freeScroll || this.direction === DIRECTION_V,
                    scrollX: this.freeScroll || this.direction === DIRECTION_H,
                    scrollbar: this.scrollbar,
                    pullDownRefresh: this.pullDownRefresh,
                    pullUpLoad: this.pullUpLoad,
                    startY: this.startY,
                    freeScroll: this.freeScroll,
                    mouseWheel: this.mouseWheel,
                    bounce: this.bounce,
                    zoom: this.zoom
                }
                this.scroll = new BScroll(this.$refs.wrapper, options)
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos)
                    })
                }
                console.log(this.scroll)
                if (this.listenScrollEnd) {
                    this.scroll.on('scrollEnd', (pos) => {
                        this.$emit('scroll-end', pos)
                    })
                }
                if (this.listenBeforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScrollStart')
                    })
                    this.scroll.on('scrollStart', () => {
                        this.$emit('scroll-start')
                    })
                }
                if (this.pullDownRefresh) {
                    this._initPullDownRefresh()
                }
                if (this.pullUpLoad) {
                    this._initPullUpLoad()
                }
            },
            scrollToElement () {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
            destroy () {
                this.scroll && this.scroll.destroy()
            },
            refresh () {
                this.scroll && this.scroll.refresh()
            },
            clickItem (e, item) {
                console.log(e)
                this.$emit('click', item)
            },
            _initPullDownRefresh () {
                this.scroll.on('pullingDown', () => {
                    this.isPullingDown = true
                    this.$emit('pullingDown')
                })
            },
            _initPullUpLoad () {
                this.scroll.on('pullingUp', () => {
                    this.ispullUpLoad = true
                    this.$emit('pullingUp')
                })
            },
            _reboundPullDown () {
                const {stopTime = 600} = this.pullDownRefresh
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.scroll.finishPullDown()
                        resolve()
                    }, stopTime)
                })
            },
            _afterPullDown () {
                setTimeout(() => {
                    this.refresh()
                }, this.scroll.options.bounceTime)
            },
            forceUpdate () {
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.isPullingDown = false
                    this._reboundPullDown().then(() => {
                        this._afterPullDown()
                    })
                } else if (this.pullUpLoad && this.ispullUpLoad) {
                    this.ispullUpLoad = false
                    this.scroll.finishPullUp()
                    this.refresh()
                } else {
                    this.refresh()
                }
            },
        },
        watch: {
            data () {
                const _this = this
                setTimeout(function () {
                    _this.forceUpdate()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        /*position: relative;*/
        /*height: 100%;*/
        /*overflow: hidden;*/
        .content {
            /*position: relative;*/
            .pulldown-wrapper {
                position: absolute;
                width: 100%;
                top: 84px;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all;
                .after-trigger {
                    margin-top: 10px;
                    font-size: 14px;
                    text-align: center;
                    z-index: 20;
                }
            }
            .pullup-wrapper {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 50px;
                .after-trigger {
                    margin-top: 10px;
                    font-size: 14px;
                    text-align: center;
                    z-index: 20;
                }
            }
        }
    }
</style>
