<template>
    <div class="index-list">
        <div style="width: 70%;height: 100%;float:right;position: relative">
            <scroll ref="scroll"
                    class="scroll"
                    @scroll="onscroll"
                    :listen-scroll="listenScroll"
                    :click="click"
                    :data="data"
                    :pullDownRefresh="pullDownRefresh"
                    @pullingDown="contentonpullingDown"
                    :scrollbar="scrollbar"
                    :probe-type="probeType">
                <ul class="lists" ref="lists">
                    <li v-for="(items,index) in data" :key="index">
                        <div class="title">
                            {{items.itemsTitle}}
                        </div>
                        <ul class="item-list">
                            <li v-for="(item, n) in items.itemsList" :key="n">
                                {{item.name}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </scroll>
        </div>
        <!--<div class="titlenav-box navtitle-wrapper" ref="navtitle">-->
        <!--<ul class="title-nav-list" ref="navlist">-->
        <!--<li v-for="(item,index) in titlenavlist" :key="index" :data-index="index" :class="{active:currentIndex === index}" @click="clickitem(index)">-->
        <!--{{item}}-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <div style="width: 30%;height: 100%;float:left;position: relative">
            <scroll ref="navtitle"
                    class="titlenav-box navtitle-wrapper"
                    :listen-scroll="listenScroll"
                    :click="click"
                    :data="data"
                    :scrollbar="scrollbar"
                    :probe-type="probeType"
                    :pullDownRefresh="pullDownRefresh"
                    @pullingDown="onpullingDown"
                    style="height: 100%;position: relative">
                <ul class="title-nav-list" ref="navlist">
                    <li v-for="(item,index) in titlenavlist" :key="index" :data-index="index"
                        :class="{active:currentIndex === index}" @click="clickitem(index)">
                        {{item}}
                    </li>
                </ul>
            </scroll>
        </div>
    </div>
</template>

<script>
    import scroll from '@/components/base/scroll'
    // import BScroll from 'better-scroll'
    // import {getRect} from '../../common/js/public'

    export default {
        name: 'indexlist',
        components: {
            scroll
        },
        data () {
            return {
                listenScroll: true,
                click: true,
                probeType: 3,
                currentIndex: 0,
                scrollbar: true,
                scrollY: 0,
                pullDownRefresh: true,
                titlescrollY: 0,
                listheight: [],
                data: [
                    {
                        itemsTitle: '热销',
                        itemsList: [{name: 'kkk'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'},]
                    },
                    {
                        itemsTitle: '畅销',
                        itemsList: [{name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}]
                    },
                    {
                        itemsTitle: '普通',
                        itemsList: [{name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}]
                    },
                    {
                        itemsTitle: '面条',
                        itemsList: [{name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}]
                    },
                    {
                        itemsTitle: '小吃',
                        itemsList: [{name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}]
                    },
                    {
                        itemsTitle: '热销',
                        itemsList: [{name: 'kkk'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'},]
                    },
                    {
                        itemsTitle: '畅销',
                        itemsList: [{name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}]
                    },
                    {
                        itemsTitle: '普通',
                        itemsList: [{name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}]
                    },
                    {
                        itemsTitle: '面条',
                        itemsList: [{name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}]
                    },
                    {
                        itemsTitle: '小吃',
                        itemsList: [{name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}]
                    },
                    {
                        itemsTitle: '热销',
                        itemsList: [{name: 'kkk'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'},]
                    },
                    {
                        itemsTitle: '畅销',
                        itemsList: [{name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}]
                    },
                    {
                        itemsTitle: '普通',
                        itemsList: [{name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}]
                    },
                    {
                        itemsTitle: '面条',
                        itemsList: [{name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}]
                    },
                    {
                        itemsTitle: '小吃',
                        itemsList: [{name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}]
                    },
                    {
                        itemsTitle: '热销',
                        itemsList: [{name: 'kkk'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'}, {name: 'jjj'},]
                    },
                    {
                        itemsTitle: '畅销',
                        itemsList: [{name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}, {name: '62'}, {name: '54'}]
                    },
                    {
                        itemsTitle: '普通',
                        itemsList: [{name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}, {name: '99'}, {name: 'hh'}]
                    },
                    {
                        itemsTitle: '面条',
                        itemsList: [{name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}, {name: '64'}, {name: 'dd'}]
                    },
                    {
                        itemsTitle: '小吃',
                        itemsList: [{name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}, {name: '77'}, {name: 'ww'}]
                    }
                ],
            }
        },
        computed: {
            titlenavlist () {
                const titleList = []
                this.data.forEach(function (v) {
                    titleList.push(v.itemsTitle)
                })
                return titleList
            }
        },
        mounted () {
            setTimeout(() => {
                // this._initscroll()
                this._clacheight()
                console.log(this.$refs.navtitle.scroll)
            }, 20)
        },
        methods: {
            // _initscroll() {
            //     if (!this.$refs.navtitle) {
            //         return
            //     }
            //     this.$refs.navlist.style.minHeight = parseInt(getRect(this.$refs.navtitle).height + 1) + 'px'
            //     const options = {
            //         probeType: 3,
            //         click: true,
            //         pullDownRefresh: false,
            //         pullUpLoad: false,
            //         startY: this.titlescrollY,
            //         freeScroll: false,
            //         mouseWheel: false,
            //         bounce: true,
            //     }
            //     this.titlescroll = new BScroll(this.$refs.navtitle,options)
            //     console.log(this.titlescroll)
            //     this.titlescroll.on('scroll',(pos) => {
            //         this.ontitlescroll(pos)
            //     })
            // },
            onpullingDown () {
                setTimeout(() => {
                    if (this._isDestroyed) {
                        return
                    }
                    this.$refs.navtitle.forceUpdate()
                }, 1500)
            },
            contentonpullingDown () {
                setTimeout(() => {
                    if (this._isDestroyed) {
                        return
                    }
                    this.$refs.scroll.forceUpdate()
                }, 1500)
            },
            // ontitlescroll (pos) {
            //     this.titlescrollY = pos.y
            // },
            onscroll (pos) {
                this.scrollY = pos.y
            },
            _clacheight () {
                if (!this.titlenavlist) {
                    return
                }
                let itemheight = 0
                for (let i = 0; i < this.titlenavlist.length; i++) {
                    itemheight = itemheight + this.$refs.lists.children[i].clientHeight
                    this.listheight.push(itemheight)
                }
            },
            clickitem (index) {
                this.$refs.scroll.scrollToElement(this.$refs.lists.children[index], 100)
                this.scrollY = this.$refs.scroll.scroll.y
                this.currentIndex = index
                this.$refs.navtitle.scrollToElement(this.$refs.navlist.children[index], 100)
            },
        },
        watch: {
            scrollY (newY) {
                if (newY > 0) {
                    this.currentIndex = 0
                    this.$refs.navtitle.scrollToElement(this.$refs.navlist.children[this.currentIndex], 100)
                    return
                }
                for (let i = 0; i < this.listheight.length; i++) {
                    const height1 = this.listheight[i]
                    const height2 = this.listheight[i + 1]
                    if (-newY >= height1 && -newY <= height2) {
                        this.currentIndex = i + 1
                        this.$refs.navtitle.scrollToElement(this.$refs.navlist.children[this.currentIndex], 100)
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .index-list {
        position: relative;
        height: 100%;
        .scroll {
            position: relative;
            height: 100%;
            .lists {
                width: 100%;
                position: relative;
                .title {
                    height: 40px;
                    line-height: 40px;
                    background: #cccccc;
                }
                .item-list {
                    overflow: hidden;
                    > li {
                        line-height: 40px;
                        height: 40px;
                        background: #FFFFFF;
                        border: 1px solid #f2f2f2;
                        box-sizing: border-box;
                    }
                }
            }
        }
        .titlenav-box {
            position: relative;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #fff;
            .title-nav-list {
                > li {
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    border: 1px solid #f2f2f2;
                    color: #000000;
                    background: inherit;
                    box-sizing: border-box;
                }
                .active {
                    color: #FFFFFF;
                    background: #666666;
                }
            }
        }
    }

</style>
