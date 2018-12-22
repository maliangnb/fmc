<template>
    <div class="single">
        <div class="img-box">
            <img v-lazy="proItem.imgUrl" alt="">
        </div>
        <div class="info">
            <slot name="price">
                <div  class="price-box">
                    <span class="price">￥{{proItem.price}}<small class="old_price">￥{{proItem.oldPrice}}</small></span>
                    <span class="sellers">{{proItem.sellers}}人已购买</span>
                </div>
            </slot>
            <slot name="name">
                <p class="name">{{proItem.proName}}</p>
            </slot>
            <slot name="des">
                <p class="des">{{proItem.proDes}}</p>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'single',
        props: {
            proItem: {
                type: Object,
                default: {}
            },
            // imgUrl: {
            //     type: String,
            // },
            // price: {
            //     type: Number,
            //     default: 0
            // },
            // oldPrice: {
            //     type: Number,
            //     default: 0
            // },
            // sellers: {
            //     type: Number,
            //     default: 0
            // },
            // proName: {
            //     type: String,
            //     default: ''
            // },
            // proDes: {
            //     type: String,
            //     default: ''
            // }
        }
    }
</script>

<style scoped lang="less">
    .single {
        width: 100%;
       /deep/ .img-box {
            position: relative;
            padding-bottom: 50.6%;
            img {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 100%;
            }
        }
        /deep/ .info {
            color: #FFFFFF;
            padding: 0 10px;
            .price-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 0;
                color: #ccc;
                font-size: 15px;
                .price{
                    font-size: 20px;
                    color: #a85831;
                    small{
                        font-size: 15px;
                        color: #ccc;
                    }
                }
            }
            .name{
                font-size: 15px;
                color: #fddeaa;
                line-height: 20px;
            }
            .des{
                color: #fddeaa;
                font-size: 12px;
                line-height: 18px;
            }
        }
    }
</style>
