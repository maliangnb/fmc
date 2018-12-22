<template>
    <div id="pro-detail">
        <single :proItem="proObj">
        </single>
        <div v-if="sku" class="sku">
            <div v-for="(item,index) in sku" :key="index" class="group">
                <span class="group-name">{{item.name}}</span>
                <ul>
                    <li v-for="(childItem,childIndex) in sku[index].child" :key="childIndex"><span class="name">{{childItem.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="inputNum">
            <span>输入数量</span>
            <van-stepper v-model="num" :min="1" :max="999"></van-stepper>
        </div>
    </div>
</template>

<script>
    import Single from 'components/base/single'
    import proData from 'common/js/prodata'
    import {Stepper} from 'vant'

    export default {
        name: 'proDetail',
        data () {
            return {
                proObj: {
                    id: '',
                    imgUrl: '',
                    price: 0,
                    oldPrice: 0,
                    sellers: 0,
                    proName: '',
                    proDes: ''
                },
                sku: {},
                num: 1,
                showExt: {},
                cdn: process.env.CDN
            }
        },
        created () {
            console.log(proData)
            this.getProDetail()
        },
        methods: {
            getProDetail () {
                this.proObj.imgUrl = this.cdn + proData.data.product.imgs[0]
                this.proObj.id = proData.data.product.id
                this.proObj.price = proData.data.product.seller_price
                this.proObj.oldPrice = proData.data.product.price
                this.proObj.sellers = proData.data.product.sallers
                this.proObj.proDes = proData.data.product.discription
                this.proObj.proName = proData.data.product.name
                this.sku = proData.data.sku
            }
        },
        components: {
            Single,
            [Stepper.name]: Stepper
        }
    }
</script>

<style scoped lang="less">
    #pro-detail {
        .sku {
            color: #ff5778;
            padding: 0 10px;
            .group-name {
                font-size: 12px;
                color: #fddeaa;
                display: inline-block;
                padding: 10px 0;
            }
            ul {
                li {
                    display: inline-block;
                    margin-right: 10px;
                    margin-bottom: 5px;
                    text-align: center;
                    border-radius: 18px;
                    background-color: #f5f5f5;
                    .name {
                        display: inline-block;
                        min-width: 60px;
                        padding: 5px;
                        line-height: 26px;
                        font-size: 12px;
                        height: 26px;
                        color: #666666;
                    }
                }
            }
        }
        .inputNum {
            padding: 15px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                color: #FFFFFF;
                font-size: 16px;
            }
        }
    }
</style>
