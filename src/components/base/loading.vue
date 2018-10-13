<template>
    <div class="loading">
        <img src="./loading.gif" alt="">
    </div>
</template>

<script>
  export default {
      name: 'loading'
  }
</script>

<style scoped lang="less">
    .loading{
        >img{
            width: 20px;
            height: 20px;
            display: block;
        }
    }
</style>
