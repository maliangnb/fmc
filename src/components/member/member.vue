<template>
    <div id="member">
      <div class="my-info-box">
        <div class="info-bg">
          <div class="head-img">
            <img src="../home/gird-01.png" alt="">
          </div>
          <div class="person-info">
            <h4 class="name">黑猫警长</h4>
            <span class="rank"><img src="./rank.png" alt="">普通会员</span>
            <p class="higher-level">上级推广号：123456789</p>
          </div>
        </div>
      </div>
      <grid :cols="5" :show-vertical-dividers="false" :show-lr-borders="false">
        <grid-item :link="{path:'/order?id='+'0' }">
          <i class="iconfont icon-zhifu icon" slot="icon"></i>
          <span slot="label">全部订单</span>
        </grid-item>
        <grid-item :link="{path:'/order?id='+'1' }">
          <i class="iconfont icon-zhifu icon" slot="icon"></i>
          <span slot="label">待支付</span>
        </grid-item>
        <grid-item :link="{path:'/order?id='+'2' }">
          <i class="iconfont icon-zhifu icon" slot="icon"></i>
          <span slot="label">待发货</span>
        </grid-item>
        <grid-item :link="{path:'/order?id='+'3' }">
          <i class="iconfont icon-zhifu icon" slot="icon"></i>
          <span slot="label">已发货</span>
        </grid-item>
        <grid-item :link="{path:'/order?id='+'4' }">
          <i class="iconfont icon-zhifu icon" slot="icon"></i>
          <span slot="label">已收件</span>
        </grid-item>
        <p class="tra"></p>
      </grid>
    </div>
</template>

<script>
  import { Grid, GridItem } from 'vux'
  import '@/common/fonts/iconfont.css'
  export default {
      name: 'member',
      data() {
          return {
          }
      },
      components: {
          Grid, GridItem
      }
  }
</script>

<style lang="less">
#member{
  .my-info-box{
    background: #FFFFFF;
    height: 145px;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 10px;
    .info-bg{
      height: 125px;
      width: 100%;
      background: linear-gradient(left,#ff5778,#ff95aa);
      border-radius: 12px;
      display: flex;
      align-items: center;
      .head-img{
        position: relative;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: #feb4e0;
        margin: 0 10px;
        box-sizing: border-box;
        border: 5px solid #ff718d;
        overflow: hidden;
        >img{
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .person-info{
        color: #FFFFFF;
        .name{
          font-size: 15px;
          color: inherit;
        }
        .rank{
          margin: 10px 0;
          font-size: 12px;
          line-height: 18px;
          padding: 0 14px;
          background: linear-gradient(left,#7f3342,#823b49);
          border-top-right-radius:9px;
          border-bottom-right-radius:9px;
          position: relative;
          color: #FFFFFF;
          >img{
            position: absolute;
            width: 16px;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
          }
        }
        .higher-level{
          font-size: 12px;
          color: #FFFFFF;
        }

      }
    }
  }
  .weui-grids{
    background: #FFFFFF;
    margin-bottom: 10px;
    &:before{
      content: '';
      position: absolute;
      right: 20%;
      left: auto;
      top: 0;
      width: 1px;
      height: 100%;
      bottom: 0;
      background: #e6e6e6;
      transform: scaleY(2);
      z-index: 99;
    }
    .tra{
      position: absolute;
      background: #FFFFFF;
      left: calc(80% - 1px);
      top: 50%;
      transform: translateY(-50%);
      border-width: 10px 10px 10px 10px;
      border-style: solid;
      border-color: transparent transparent transparent #e6e6e6;
      z-index: 100;
      &:after{
        content: '';
        position: absolute;
        top: 50%;
        left: -11px;
        transform: translateY(-50%);
        border-width: 10px 10px 10px 9px;
        border-style: solid;
        border-color: transparent transparent transparent #ffffff;
        z-index: 99;
      }
    }
    .weui-grid{
      padding:15px 0;
      &:after{
        display: none;
      }
      .weui-grid__icon + .weui-grid__label{
        line-height: 1;
      }
      .weui-grid__icon{
        position: relative;
        .icon{
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          font-size: 20px;
          color: #ff5778;
        }
      }
    }
  }
}
</style>
