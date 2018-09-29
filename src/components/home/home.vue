<template>
  <div id="home">
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
</template>

<script>
  import { Swiper, Grid, GridItem } from 'vux'
  import '@/common/fonts/iconfont.css'
  export default {
      name: 'home',
      data() {
          return {
              swiperList: [{
                  url: 'javascript:',
                  img: '',
                  title: '送你一朵fua'
              }, {
                  url: 'javascript:',
                  img: '',
                  title: '送你一次旅行'
              }]
          }
      },
      mounted() {
          console.log(this.$router.currentRoute)
      },
      components: {
          Swiper, Grid, GridItem
      }
  }
</script>

<style lang="less">
  #home{
    .weui-grids{
      background: #FFFFFF;
      &:before{
        display: none;
      }
      .weui-grid{
        padding:15px 0;
        &:after{
          display: none;
        }
        .weui-grid__icon + .weui-grid__label{
          margin-top: 10px;
        }
      }
    }
    .img-box{
      margin-top: 10px;
      >img{
        display: block;
        width: 100%;
      }
    }
    .recommend{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      .title{
        margin: 0 10px;
        font-size: 15px;
        color: #ff5778;
      }
      >img{
        width: 25px;
      }
    }
    .pro-list{
      overflow: hidden;
      width: 100%;
      padding: 0 10px;
      box-sizing:border-box;
      .pro-item{
        float: left;
        width: calc(50% - 5px);
        box-sizing: border-box;
        margin-bottom: 10px;
        background: #FFFFFF;
        &:nth-of-type(2n+1){
          margin-right: 10px;
        }
        .img-box{
          width: 100%;
          height: 233px;
          position: relative;
          >img{
            position: absolute;
            left: 50%;
            top: 50%;
            display: block;
            transform: translateX(-50%) translateY(-50%);
          }
        }
        .title{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-top: 10px;
          padding: 0 9px;
          font-size: 12px;
        }
        .price{
          font-size: 15px;
          color: #333333;
          padding: 10px 9px;
        }
      }
    }
  }

</style>
