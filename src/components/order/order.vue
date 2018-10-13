<template>
    <div id="order">
        <tab>
            <tab-item :selected="index === tabIndex" @on-item-click="changeTab(index)" v-for="(item, index) in tabList"
                      :key="index" v-text="item">
            </tab-item>
        </tab>
        <scroll ref="scroll"
                class="wrapper"
                :data="scdata"
                :probe-type="isprobeType"
                :pull-down-refresh="ispullDownRefresh"
                :pull-up-load="ispullUpLoad"
                :scrollbar="scrollbarflag"
                :click="clickflag"
                :startY="startY"
                :nomoreTxtFlag="isnomoreflag"
                @pullingDown="onpullingDown"
                @pullingUp="onpullUpLoad">
            <div class="order-content">
                <section v-show="tabIndex === 0">
                    <ul class="item-list">
                        <li v-for="(item,index) in scdata" :key="index" class="item" @click="clickItem()">
                            <div class="img-box">
                                <img :src="item.imgurl" alt="">
                            </div>
                            <p class="item-name">{{item.name}}</p>
                            <p class="item-price">{{item.price}}</p>
                        </li>
                    </ul>
                </section>
                <section v-show="tabIndex === 1">

                </section>
                <section v-show="tabIndex === 2">
                    848
                </section>
                <section v-show="tabIndex === 3">
                    5645
                </section>
                <section v-show="tabIndex === 4">
                    023
                </section>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {Tab, TabItem} from 'vux'
    import scroll from '@/components/base/scroll'
    import img from '@/components/order/shop_1.png'
    import '@/common/css/base.less'

    export default {
        name: 'order',
        components: {
            Tab, TabItem, scroll
        },
        data () {
            return {
                tabList: ['全部订单', '待支付', '待发货', '已发货', '已收件'],
                tabIndex: 0,
                scdata: [
                    {imgurl: img, name: 'fumeimei', price: '88'},
                    // {imgurl: img, name: 'kdgn', price: '44'},
                    // {imgurl: img, name: 'ldgdkgn', price: '55'},
                    // {imgurl: img, name: 'dnggg', price: '66'},
                    // {imgurl: img, name: 'fumeimei', price: '889'},
                ],
                ispullUpLoad: true,
                ispullDownRefresh: true,
                isprobeType: 1,
                isnomoreflag: false,
                clickflag: true,
                scrollbarflag: true,
                startY: 0,
                datamoudle: [
                    {imgurl: img, name: 'fumeimei', price: '88'},
                    {imgurl: img, name: 'kdgn', price: '44'},
                    {imgurl: img, name: 'ldgdkgn', price: '55'},
                    {imgurl: img, name: 'dnggg', price: '66'},
                    {imgurl: img, name: 'fumeimei', price: '889'},
                ],
                order: {
                    orderAll: {
                        data: [],
                        index: 1,
                    },
                    orderPay: {
                        data: [],
                        index: 2,
                    },
                    orderSend: {
                        data: [],
                        index: 3,
                    },
                    orderAlSend: {
                        data: [],
                        index: 4,
                    },
                    orderReserve: {
                        data: [],
                        index: 5,
                    },
                }
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                vm._data.tabIndex = parseInt(vm.$route.query.id)
                console.log(vm)
            })
        },
        created () {
            //根据路由来初始tabIndex和数据data
            this.tabIndex = parseInt(this.$route.query.id)
            console.log(this.tabIndex)
            //调用changeTab获取相应初始数据
            // this.changeTab()
        },
        mounted () {
        },
        watch: {
            scrollbarObj: {
                handler () {
                    this.rebuildScroll()
                },
                deep: true
            },
            pullUpLoadobj: {
                handler (val) {
                    const scroll = this.$refs.scroll.scroll
                    if (val) {
                        scroll.openPullUp()
                    } else {
                        scroll.closePullUp()
                    }
                },
                deep: true
            },
            pullDownRefreshobj: {
                handler (val) {
                    const scroll = this.$refs.scroll.scroll
                    if (val) {
                        scroll.openPullDown()
                    } else {
                        scroll.closePullDown()
                    }
                },
                deep: true
            },
            startY: {
                handler () {
                    this.rebuildScroll()
                },
                deep: true
            },
        },
        computed: {
            scrollbarObj() {
                return this.scrollbarflag ? { fade: true} : false
            },
            pullDownRefreshobj () {
                return this.ispullDownRefresh ? {threshold: 50, stop: 20} : false
            },
            pullUpLoadobj() {
                return this.ispullUpLoad ? {threshold: 50} : false
            }
        },
        methods: {
            //根据tab选项向后端请求数据
            changeTab (index) {
                this.tabIndex = index
            },
            onpullingDown () {
                setTimeout(() => {
                    if (this._isDestroyed) {
                        return
                    }
                    this.$refs.scroll.forceUpdate()
                }, 1500)
            },
            onpullUpLoad () {
                setTimeout(() => {
                    if (this._isDestroyed) {
                        return
                    }
                    //模拟更新数据(数据请求)
                    if (Math.random() > 0.5) {
                        this.scdata = this.scdata.concat(this.datamoudle)
                    } else {
                        this.isnomoreflag = true
                        this.$refs.scroll.forceUpdate()
                    }
                }, 2000)
            },
            clickItem () {
                //跳转详情页
                // this.$router.push('proDetail')
            },
            rebuildScroll () {
                this.$nextTick(() => {
                    this.$refs.scroll.destroy()
                    this.$refs.scroll.initScroll()
                })
            }
        }
    }
</script>

<style lang="less">
    #order {
        position: relative;
        height: 100%;
        .vux-tab-wrap {
            position: fixed;
            top: 46px;
            left: 0;
            right: 0;
            z-index: 55;
        }
        .scrollable {
            .vux-tab-item {
                flex: 0 0 20%;
            }
        }
        .wrapper {
            position: relative;
            height: calc(100% - 44px);
            box-sizing: border-box;
            margin-top: 44px;
            overflow: hidden;
            .order-content {
                position: relative;
                overflow: hidden;
                .item-list {
                    overflow: hidden;
                    padding: 0 10px;
                    margin: 10px 0;
                    .item {
                        background: #FFFFFF;
                        width: calc(50% - 5px);
                        overflow: hidden;
                        float: left;
                        margin-bottom: 10px;
                        &:nth-of-type(2n+1) {
                            margin-right: 5px;
                        }
                        &:nth-of-type(2n) {
                            margin-left: 5px;
                        }
                        .img-box {
                            height: 200px;
                            overflow: hidden;
                            position: relative;
                            > img {
                                width: 100%;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translateX(-50%) translateY(-50%);
                            }
                        }
                        .item-name, .item-price {
                            font-size: 14px;
                        }
                        .item-name {
                            padding: 10px 5px;
                            height: 60px;
                            box-sizing: border-box;
                            line-height: 1.5;
                            overflow: hidden;
                        }
                        .item-price {
                            padding: 0 5px;
                            height: 30px;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>
