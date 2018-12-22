<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'promise',
        mounted () {
            this.ggd()
            this.test()
        },
        methods: {
            test () {
                return new Promise((resolve) =>{
                    setTimeout(() => {
                        this.kg()
                        resolve()
                    },500)
                })
            },
            kg () {
                console.log(5)
            },
            ggd () {
                setTimeout(() => {
                    console.log(this)
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
