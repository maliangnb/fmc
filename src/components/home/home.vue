<template>
    <div>
        <div id="home" :class="{active: !isLogin}">
            <swiper :list="swiperList" dots-position="right" :auto="true" :loop="true" height="190px">
            </swiper>
            <grid :cols="5" :show-vertical-dividers="false" :show-lr-borders="false">
                <grid-item link="">
                    <img slot="icon" src="./gird-01.png" alt="">
                    <span slot="label">敏感系列</span>
                </grid-item>
                <grid-item link="">
                    <img slot="icon" src="./gird-01.png" alt="">
                    <span slot="label">敏感系列</span>
                </grid-item>
                <grid-item link="">
                    <img slot="icon" src="./gird-01.png" alt="">
                    <span slot="label">敏感系列</span>
                </grid-item>
                <grid-item link="">
                    <img slot="icon" src="./gird-01.png" alt="">
                    <span slot="label">敏感系列</span>
                </grid-item>
                <grid-item link="">
                    <img slot="icon" src="./gird-01.png" alt="">
                    <span slot="label">敏感系列</span>
                </grid-item>
            </grid>
            <div class="img-box">
                <img src="./adv.png" alt="">
            </div>
            <!--推荐商品-->
            <div class="recommend">
                <img src="./title_before.png" alt="">
                <i class="title">推荐商品</i>
                <img src="./title_before.png" alt="">
            </div>
            <ul class="pro-list">
                <li class="pro-item" @click="goDetail">
                    <div class="img-box">
                        <img src="./shop_1.png" alt="">
                    </div>
                    <p class="title">
                        馥美春 玫瑰亮肤补水面膜 保
                        湿提亮肤色收缩毛孔
                    </p>
                    <p class="price">￥79.6</p>
                </li>
                <li class="pro-item">
                    <div class="img-box">
                        <img src="./shop_1.png" alt="">
                    </div>
                    <p class="title">
                        馥美春 玫瑰亮肤补水面膜 保
                        湿提亮肤色收缩毛孔
                    </p>
                    <p class="price">￥79.6</p>
                </li>
                <li class="pro-item">
                    <div class="img-box">
                        <img src="./shop_1.png" alt="">
                    </div>
                    <p class="title">
                        馥美春 玫瑰亮肤补水面膜 保
                        湿提亮肤色收缩毛孔
                    </p>
                    <p class="price">￥79.6</p>
                </li>
                <li class="pro-item">
                    <div class="img-box">
                        <img src="./shop_1.png" alt="">
                    </div>
                    <p class="title">
                        馥美春 玫瑰亮肤补水面膜 保
                        湿提亮肤色收缩毛孔
                    </p>
                    <p class="price">￥79.6</p>
                </li>
                <li class="pro-item">
                    <div class="img-box">
                        <img src="./shop_1.png" alt="">
                    </div>
                    <p class="title">
                        馥美春 玫瑰亮肤补水面膜 保
                        湿提亮肤色收缩毛孔
                    </p>
                    <p class="price">￥79.6</p>
                </li>
            </ul>
        </div>
        <div v-if="!isLogin" id="login-page">
            <div class="login-box">
                <p class="title">短信手机号验证</p>
                <div class="group">
                    <input type="text" placeholder="请输入11手机号码" v-model="phoneObj.tel" class="tel">
                </div>
                <div class="group">
                    <input type="text" placeholder="请输入短信验证码" class="code" v-model="phoneObj.code">
                    <span v-if="!isTimeFlag" class="time-btn" @click="getIdCode">验证码</span>
                    <span v-else class="time-btn">{{second}}</span>
                </div>
                <div class="group">
                    <button type="button" id="login" @click="login" :disabled="!isClick">登录</button>
                </div>
            </div>
        </div>
        <canvas id="qr-code" ref="qrcode">

        </canvas>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import store from '@/store'
    import {Swiper, Grid, GridItem} from 'vux'
    import '@/common/fonts/iconfont.css'
    import QRcode from 'qrcode'

    export default {
        name: 'home',
        data () {
            return {
                swiperList: [{
                    url: 'javascript:',
                    img: '',
                    title: '送你一朵fua'
                }, {
                    url: 'javascript:',
                    img: '',
                    title: '送你一次旅行'
                }],
                phoneObj: {
                    tel: '',
                    code: ''
                },
                second: 60,
                isTimeFlag: false,
                isClick: false,
            }
        },
        computed: {
            ...mapGetters(['isLogin'])
        },
        mounted () {
            const canvas = this.$refs.qrcode
            const href = location.href.replace('#/', '&href=')
            console.log(href)
            console.log(location.href)
            QRcode.toCanvas(canvas, href, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        },
        methods: {
            getIdCode () {
                // 请求
                this.isTimeFlag = true
                const _this = this
                setTimeout(function () {
                    if (_this.isTimeFlag) {
                        _this.second--
                        if (_this.second == 0) {
                            _this.isTimeFlag = false
                            _this.second = 60
                        } else {
                            _this.getIdCode()
                        }
                    }
                    if (!_this.isTimeFlag) {
                        return
                    }
                }, 1000)
            },
            login () {
                const Exp = /^\d{11}/
                const tel = this.phoneObj.tel.replace(/\s/g, '')
                if (Exp.test(tel) && this.phoneObj.code != '') {
                    store.commit('SET_IS_LOGIN', 'true')
                } else {
                    alert('请输入正确的手机号')
                }
            },
            goDetail () {
                this.$router.push('/proDetail')
            }
        },
        watch: {
            phoneObj: {
                handler (n, o) {
                    if (n.tel != '' && n.code != '') {
                        this.isClick = true
                    }
                },
                deep: true
            }
        },
        components: {
            Swiper, Grid, GridItem
        }
    }
</script>

<style lang="less">
    #login-page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 501;
        .login-box {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            width: 100%;
            overflow: hidden;
            .title {
                font-size: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                margin: 25px 0;
                &:before {
                    content: '';
                    position: relative;
                    height: 1px;
                    width: 65px;
                    background: #d9d9d9;
                    margin-right: 10px;
                }
                &:after {
                    content: '';
                    position: relative;
                    height: 1px;
                    width: 65px;
                    background: #d9d9d9;
                    margin-left: 10px;
                }
            }
            .group {
                padding: 0 38px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .tel {
                    width: 100%;
                    box-sizing: border-box;
                    height: 34px;
                    line-height: 34px;
                    background: #f2f2f2;
                    border-radius: 20px;
                    padding: 0 19px;
                    border: none;
                    outline: none;
                }
                .code {
                    width: 66.6%;
                    box-sizing: border-box;
                    height: 34px;
                    line-height: 34px;
                    background: #f2f2f2;
                    border-radius: 20px;
                    padding: 0 19px;
                    border: none;
                    outline: none;
                }
                .time-btn {
                    width: 30%;
                    margin-left: 3%;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                    font-size: 12px;
                    color: #ed145b;
                    box-sizing: border-box;
                    border: 1px solid #ed145b;
                    border-radius: 20px;
                }
                #login {
                    width: 100%;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                    background: rgba(237, 20, 91, 0.2);
                    border: none;
                    color: #FFFFFF;
                    font-size: 14px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                }
            }
        }
    }

    #home {
        .weui-grids {
            background: #FFFFFF;
            &:before {
                display: none;
            }
            .weui-grid {
                padding: 15px 0;
                &:after {
                    display: none;
                }
                .weui-grid__icon + .weui-grid__label {
                    margin-top: 10px;
                }
            }
        }
        .img-box {
            margin-top: 10px;
            > img {
                display: block;
                width: 100%;
            }
        }
        .recommend {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 48px;
            .title {
                margin: 0 10px;
                font-size: 15px;
                color: #ff5778;
            }
            > img {
                width: 25px;
            }
        }
        .pro-list {
            overflow: hidden;
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            .pro-item {
                float: left;
                width: calc(50% - 5px);
                box-sizing: border-box;
                margin-bottom: 10px;
                background: #FFFFFF;
                &:nth-of-type(2n+1) {
                    margin-right: 10px;
                }
                .img-box {
                    width: 100%;
                    height: 233px;
                    position: relative;
                    > img {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        display: block;
                        transform: translateX(-50%) translateY(-50%);
                    }
                }
                .title {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    margin-top: 10px;
                    padding: 0 9px;
                    font-size: 12px;
                }
                .price {
                    font-size: 15px;
                    color: #333333;
                    padding: 10px 9px;
                }
            }
        }
    }
</style>
