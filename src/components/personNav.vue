<template>
    <div class="header">
        <div class="logo">
            <img alt="logo" src="../assets/logo.png">
        </div>
        <div class="nav">
            <router-link active-class="active" to="/jobhunter">&emsp;首页&emsp;</router-link>
            <router-link active-class="active" to="/jobhunter/job">寻找兼职</router-link>
            <router-link class="active" to="/jobhunter/person">个人中心</router-link>
        </div>
        <nav class="icon">
            <router-link to="/jobhunter/message"><a href="#"><el-icon><BellFilled /></el-icon></a></router-link>
        </nav>
        <el-avatar class="head_photo" :size="50" fit="cover" :src="headportrait" />
    </div>
</template>

<script>
import { BellFilled } from "@element-plus/icons-vue";
    export default {
        name: "PersonHeader",
        components: {
            BellFilled,
        },
        data () {
            return {
                headportrait:null,
            }
        },
        created() {
            this.jobhunterId=localStorage.getItem('userId')
            this.$axios({
                method: 'get',
                url: '/api/Jobhunter/personInfo/get/?jobhunterId='+localStorage.getItem('userId'),
            })
            .then(res => {
                console.log(res.data.data);
                this.headportrait=res.data.data.person_list[0].headportrait;
                console.log(this.userInfo);
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    .header{
        background-color: #444076;
        height: 70px;
        line-height: 70px;
        vertical-align: middle;
        /* 吸顶效果
        position: -webkit-sticky;
        position: sticky;
        top: 0; */
    }
    .logo{
        display: inline-block;
        padding-left: 30px;
        height: 70px;
        line-height: 70px;
    }
    .logo img{
        height: 70px;
    }
    .nav{
        display: inline-block;
        text-align: center;
        line-height: 30px;
        vertical-align: top;
        margin-top: 20px;
    }
    .nav a{
        border-radius: 10px;
        text-decoration:none;
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        margin-left: 80px;
        padding: 3px 8px 3px 8px;

    }
    .nav a:hover {
        color: #444076;
        background: #FFCAA6;
    }
    .nav .active{
        color: #444076;
        background: #FFCAA6;
    }
    .header .icon{
        vertical-align: top;
        display: inline-block;
        width: 120px;
        font-size: 30px;
        margin-top: 5px;
        position: relative;
        left: 40vw;
    }
    .header .icon a{
        width: 120px;
        color: #FFCAA6;
    }
    .header .icon a:hover {
        color: #faba8f;
    }
    .head_photo{
        vertical-align: top;
        display: inline-block;
        margin-top: 10px;
        position: relative;
        left: 37vw;
    }
</style>