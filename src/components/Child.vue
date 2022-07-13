<template>
    <div class="child">
        子组件{{ti}}{{age}}
    </div>
</template>

<script>

export default {
    inject:['title', 'age'],
    computed:{
        ti(){
            return this.title()
        }
    }
}
</script>

<style>

</style>