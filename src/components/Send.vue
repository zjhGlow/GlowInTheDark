<template>
    <div class="send">
        跨组件传值
        <button @click="send"></button>
        <Child />
    </div>
</template>

<script>
const Child =()=>import('./Child.vue')
export default {
    components:{
        Child
    },
    methods:{
        send(){
            
        }
    }
}
</script>

<style scoped>
    .send{
        color: #000;
    }
</style>