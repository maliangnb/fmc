<template>
  <div id="index">
    <x-header :left-options="{showBack:showBack,backText:''}" :right-options="{showMore:showMore}" :title="title"
              v-show="showTitle">
    </x-header>
    <div :style="{paddingTop: distanceTop,paddingBottom:distanceBottom}" class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <tabbar v-show="showBottom">
      <tabbar-item link="/home" selected>
        <i slot="icon" class="iconfont icon-lingshou"></i>
        <span slot="label">零售区</span>
      </tabbar-item>
      <tabbar-item link="/agent">
        <i slot="icon" class="iconfont icon-daili"></i>
        <span slot="label">代理区</span>
      </tabbar-item>
      <tabbar-item link="/shopCar">
        <i slot="icon" class="iconfont icon-gouwuche"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/member">
        <i slot="icon" class="iconfont icon-huiyuanzhongxin"></i>
        <span slot="label">会员中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {XHeader, Tabbar, TabbarItem} from 'vux'
  import {mapGetters,} from 'vuex'
  import '@/common/css/base.less'
  import '@/common/fonts/iconfont.css'

  export default {
      name: 'home',
      data () {
          return {}
      },
      computed: {
          distanceTop () {
              return this.showTitle ? '46px' : '0'
          },
          distanceBottom () {
              return this.showBottom ? '47px' : '0'
          },
          ...mapGetters(['title', 'showTitle', 'showBack', 'showMore', 'showBottom'])
      },
      methods: {},
      components: {
          XHeader, Tabbar, TabbarItem
      }
  }
</script>

<style lang="less">
  #index {
      height: 100%;
    .vux-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      z-index: 500;
      &:after {
        content: '';
        position: absolute;
        height: 1px;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f2f2f2;
      }
      .vux-header-title {
        font-size: 16px;
      }
    }
      .main{
          height: 100%;
          box-sizing: border-box;
      }
    .weui-tabbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      .weui-tabbar__item {
        padding: 3px 0;
        .weui-tabbar__icon {
          height: 21px;
        }
        i.weui-tabbar__icon, .weui-tabbar__icon > i {
          font-size: 20px;
        }
        .weui-tabbar__label {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
</style>
