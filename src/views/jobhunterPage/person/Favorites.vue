<template>
    <personNav/>
    <div class="bg">
        <br>
        <br>
        <el-row class="content">
        <el-col :span="3" :offset="3">
            <el-menu class="sidebar"
            default-active="/jobhunter/favorites"
            router=true
            active-text-color="#FFCAA6"
            background-color="#444076"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            >
            <el-menu-item index="/jobhunter/person">
                <p style="margin: 0 auto;">
                <el-icon><User/></el-icon>
                <span>我的信息</span>
                </p>
            </el-menu-item>
            <el-menu-item index="/jobhunter/authen">
                <p style="margin: 0 auto;">
                <el-icon><Postcard/></el-icon>
                <span>实名认证</span>
                </p>
            </el-menu-item>
            <el-menu-item index="/jobhunter/favorites">
                <p style="margin: 0 auto;">
                <el-icon><Star/></el-icon>
                <span>我的收藏</span>
                </p>
            </el-menu-item>
            <el-menu-item index="/jobhunter/order">
                <p style="margin: 0 auto;">
                <el-icon><Document/></el-icon>
                <span>我的兼职</span>
                </p>
            </el-menu-item>
            <el-menu-item index="/jobhunter/message">
                <p style="margin: 0 auto;">
                <el-icon><BellFilled/></el-icon>
                <span>消息通知</span>
                </p>
            </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="15" class="card">
            <el-header class="card_hd">
            <span class="word">我的收藏</span>
            </el-header>
            <el-row justify="center">
                <el-scrollbar v-if="favorites_list" max-height="480px">
                    <el-collapse style="margin: 30px 0px;">
                    <el-collapse-item class="item" v-for="item in favorites_list" :key="item" :name="item.favoritesDirId">
                        <template #title>
                            <span style="font-size:18px;">
                                {{ item.favoritesDirName }}
                            </span>
                        </template>
                        <div v-for="i in item.favorites" :key="i" class="dir">
                            <el-row>
                                <el-col :span="21">
                                    <el-row style="font-size:16px;color:#444076;font-weight: 600;">
                                        {{ i.workName }}
                                    </el-row>
                                    <el-row style="font-size:14px;color:grey;">
                                        {{ i.workPlace }}
                                    </el-row>
                                    <el-row>
                                        {{ i.startTime }}-{{ i.endTime }}&emsp;{{ i.workTime }}
                                    </el-row>
                                </el-col>
                                <el-col :span="3" class="btnFather">
                                    <el-button color="#444076" size="small" class="btn" icon="ArrowRightBold" circle></el-button>
                                </el-col>
                            </el-row>

                            
                        </div>
                    </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
                <el-empty style="height:478px;" v-if="favorites_list==null" description="您还未收藏审核兼职" />
            </el-row>
    
        </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
  import personNav from '@/components/personNav.vue'
  import { ElMessage } from 'element-plus'
  import 'element-plus/es/components/message/style/index'
  
    export default {
    name: "jobhunterFavorites",
    data () {
    return {
        favorites_list: [
            {
                favoritesDirId: 15,
                favoritesDirName: "已劳管斯",
                favorites: [
                    {
                        workName: "再属期育变",
                        workPlace: "Ut pariatur ut est",
                        startTime: "2011-11-30 03:34:48",
                        endTime: "1974-11-04 13:39:58",
                        workTime: "2006-05-12 09:12:33"
                    },
                    {
                        workName: "保这速但",
                        workPlace: "dolore mollit",
                        startTime: "2002-04-14 20:29:31",
                        endTime: "2004-03-25 15:09:24",
                        workTime: "1994-07-03 00:42:28"
                    }
                ]
            },
            {
                favoritesDirId: 40,
                favoritesDirName: "建般除北准",
                favorites: [
                    {
                        workName: "明量会金",
                        workPlace: "pariatur",
                        startTime: "2003-03-07 19:07:29",
                        endTime: "1996-06-13 13:59:36",
                        workTime: "2010-07-05 08:52:57"
                    },
                    {
                        workName: "酸活家线术油",
                        workPlace: "mollit dolore sunt ipsum proident",
                        startTime: "2008-11-12 00:50:07",
                        endTime: "1977-06-06 08:20:40",
                        workTime: "2011-10-28 02:42:26"
                    }
                ]
            }
        ],
      dialogFormVisible:false,
      authen:{
        applyId:1,
        realName:"张三",
        jobhunterId:1,
        applyTime:"2019-06-05 13:53:42",
        idCard:"620403111122223333",
        identification:"http://dummyimage.com/400x400",
        checkStatus:"未审核",
        checkTime:null,
        result:null
      },
      authenApply:{
        jobhunterId:1,
        idcard:"620403111122223333",
        identification:"http://dummyimage.com/400x400",
        realName:"张三"
      }
    }
    },
    methods: {
        apply(){
            if(this.authenApply.idcard==null||this.authenApply.realName==null){
                ElMessage({
                    message: "不能为空",
                    type: 'error',
                })
                return;
            }
            // this.$axios({
            //     method: 'put',
            //     url: '/api/user-info/person-info',
            //     data : this.userInfoEdit
            // })
            // .then(res => {
            //     console.log(JSON.stringify(res.data));
            // })
            // .catch(function (error) {
            //     console.log(error);
            // })
            this.dialogFormVisible=false
        },
    },
    created() {
        // this.$axios({
        //     method: 'get',
        //     url: ''+localStorage.getItem('userId'),
        // })
        // .then(res => {
          // if(resizeBy.data.code==200){
          //     console.log(res.data.data);
          //     this.authen=res.data.data.personauthen_list[0];
          // }
          // else{
          //   this.authen=null
          // }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
    },
    components: {
        personNav,
    },
  }
  </script>
  
  <style scoped>
  .bg{
    background-color: rgba(255, 202, 166, 0.3);
    height: 90vh;
  }
  .content{
    height: 600px;
  }
  .sidebar{
    text-align: center;
    height: 600px;
  }
  .card{
    border: 1px solid #444076;
    background-color: #fff;
  }
  .card_hd{
    background-color: #0236641d;
    height: 80px;
    line-height: 80px;
    color: #444076;
    padding-left: 60px;
  }
  .card_hd .word{
    padding-left: 10px;
    color: #444076;
    border-left: 8px solid #FFCAA6;
    font-size: 20px;
  }
  .form{
    max-width: 460px;
    margin: 40px  0px;
  }

  .item{
    font-size: 30px;
    width:50vw;
  }
  .dir{
    border-left: 8px solid #FFCAA6;
    margin: 20px 0px;
    padding-left: 20px;
  }
  .btnFather{
    display: flex;
  }
  .btn{
    vertical-align: middle;
    margin-top: 20px;
  }
  </style>