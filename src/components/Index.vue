<template>
    <div>
        <span @click="click">点我请求数据</span>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                result:{}
            }
        },
        created(){

        },
        methods:{
            click(){
                this.$api.get('/user',{'id':1}).then(res=>{
                    this.result = res.data;
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>