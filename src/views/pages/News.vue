<template>
    <div class="new">
        新闻页面1
        <button @click="play">动态路由跳转</button>
        <button @click="play1">动态路由跳转</button>
        <button @click="la">变变变</button>
        <Send />
    </div>
</template>

<script>
const  Send =()=>import('../../components/Send.vue')
export default {
    provide(){
        return {
            title:()=>this.title,
            age:18
        }
    },
    data(){
        return {
            currentId:5,
            title:'小林'
        }
    },
    components:{
        Send
    },
    methods:{
        play(){
            // this.$router.push('/view'+"/"+this.currentId)
            this.$router.push({
                name:'view',
                path:"/view",
                params:{
                    tel:'我爱林甜'
                }
            })
        },
        play1(){
            this.$router.push({
                path:"/view",
                query:{
                    love:'我爱林甜'
                }
            })
        },
        la(){
            this.title = '小豪'
        }
    }
}
</script>

<style>

</style>