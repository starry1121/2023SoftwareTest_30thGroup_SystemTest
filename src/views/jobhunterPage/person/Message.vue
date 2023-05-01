<template>
    <personNav/>
    <div class="bg">
        <br>
        <br>
        <el-row class="content">
        <el-col :span="3" :offset="3">
            <el-menu class="sidebar"
            default-active="/jobhunter/message"
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
            <el-row justify="center">
                <el-tabs v-model="select" class="tabs" style="width:90%;margin-top:10px;">
                    <el-tab-pane name="消息" label="&emsp;&nbsp;消息&nbsp;&emsp;">
                        <router-link to="/jobhunter/message/conversations" replace>
                            <template #label>
                                &emsp;&nbsp;消息
                                <span v-if="unreadAmount" class="menu-unread">{{ unreadAmount }}</span>
                                &emsp;
                                <span v-if="!unreadAmount">&nbsp;</span>
                            </template>
                        </router-link> 
                        <el-row>
                            <router-view/>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="&emsp;&nbsp;通知&nbsp;&emsp;" name="通知">
                        <el-scrollbar max-height="480px">
                            <el-row justify="center" v-if="notification_list">
                                <el-timeline style="margin: 20px 0px;">
                                    <el-timeline-item class="item" v-for="item in notification_list" :key="item" center :timestamp="item.sendTime" placement="top">
                                    <el-card>
                                        <div style="font-size:18px;color:#444076;">
                                            {{ item.title }}
                                        </div>
                                        <div style="font-size:14px;color:#444076;margin-top: 10px;">
                                            {{ item.content }}
                                        </div>
                                    </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </el-row>
                            <el-empty style="height:478px;" v-if="!notification_list" description="您还未收到任何通知" />
                        </el-scrollbar>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
    
        </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
    import personNav from '@/components/personNav.vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import 'element-plus/es/components/message-box/style/index'
    import { BellFilled } from "@element-plus/icons-vue";
    import {ref, onBeforeMount, inject} from 'vue';

    export default {
    name: "jobhunterFavorites",
    components: {
        personNav,
        BellFilled,
    },
    setup(){
        const GoEasy = inject('GoEasy');
        const goEasy = inject('goEasy');

        let unreadAmount = ref(0);

        function connectGoEasy() {
            goEasy.connect({
            id: 10014,
            data: {name: 'Boaibai', avatar: 'http://dummyimage.com/400x400'},
            onSuccess: function () {  //连接成功
                console.log("GoEasy connect successfully.") //连接成功
            },
            onFailed: function (error) { //连接失败
                console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
            },
            onProgress: function (attempts) { //连接或自动重连中
                console.log("GoEasy is connecting", attempts);
            }
            });
        }

        function setUnreadNumber(content) {
            unreadAmount.value = content.unreadTotal;
            console.log("未读"+unreadAmount.value)
        }

        onBeforeMount(() => {
            if (goEasy.getConnectionStatus() === 'disconnected') {
            connectGoEasy();  //连接goeasy
            }
            goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, setUnreadNumber);
        })

        return {
            unreadAmount,
        };

    },
    data () {
    return {
        select:"消息",
        dialogFormVisible:false,
        nickName:null,
        display:false,
        notification_list: [
            {
                notificationId: 1,
                content: "reprehenderit consectetur cupidatat consequat",
                sendTime: "1979-05-11 14:19:56",
                title: "术构合适南"
            },
            {
                notificationId: 2,
                content: "cillum",
                sendTime: "1999-01-22 13:59:30",
                title: "东况上类可"
            }
        ],
        jobhuntersession_list: [
            {
                sessionId: 1,
                recuriterId: 1,
                nickname: "汤秀英",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 2,
                recuriterId: 2,
                nickname: "崔秀兰",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 1,
                recuriterId: 1,
                nickname: "汤秀英",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 2,
                recuriterId: 2,
                nickname: "崔秀兰",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 1,
                recuriterId: 1,
                nickname: "汤秀英",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 2,
                recuriterId: 2,
                nickname: "崔秀兰",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 1,
                recuriterId: 1,
                nickname: "汤秀英",
                headportrait: "http://dummyimage.com/400x400"
            },
            {
                sessionId: 2,
                recuriterId: 2,
                nickname: "崔秀兰",
                headportrait: "http://dummyimage.com/400x400"
            }
        ],
        message_list: [
            {
                messageId: 1,
                content: "in laboris aliqua",
                sendTime: "2004-08-25 03:18:44",
                receiverId: 1,
                senderId: 2
            },
            {
                messageId: 2,
                content: "Excepteur qui deserunt sit",
                sendTime: "2016-02-22 21:11:21",
                receiverId: 2,
                senderId: 1
            },
            {
                messageId: 1,
                content: "in laboris aliqua",
                sendTime: "2004-08-25 03:18:44",
                receiverId: 1,
                senderId: 2
            },
            {
                messageId: 2,
                content: "Excepteur qui deserunt sit",
                sendTime: "2016-02-22 21:11:21",
                receiverId: 2,
                senderId: 1
            },
            {
                messageId: 1,
                content: "in laboris aliqua",
                sendTime: "2004-08-25 03:18:44",
                receiverId: 1,
                senderId: 2
            },
            {
                messageId: 2,
                content: "Excepteur qui deserunt sit",
                sendTime: "2016-02-22 21:11:21",
                receiverId: 2,
                senderId: 1
            }
        ],
        appeal:{
            orderId:null,
            appealContent:null,
            appealType:"求职者评价申诉",
        }
    }
    },
    methods: {
        apply(){
            if(this.appeal.appealContent==null||this.appeal.appealType==null){
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
        cancelOrder(){
            ElMessageBox.confirm(
                '确认取消报名?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
            })
        },
        accept(){
            ElMessageBox.confirm(
                '确认接收录用?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
            })
        },
        noAccept(){
            ElMessageBox.confirm(
                '确认放弃录用?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
            })
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

  .menu-unread {
    position: absolute;
    top: 2px;
    right: 4px;
    width: 16px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background-color: #d02129;
    color: #ffffff;
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
  .session{
    display: flex;
    vertical-align: bottom;
    margin: 10px 0px;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #0236641d;
    border-radius: 10px;
  }
  .session:hover{
    border: 1px solid #444076;
  }
  .session .nickname{
    line-height:30px;
    height:30px;
    margin-top: 10px;
    margin-left: 20px;
    font-size: 16px;
    color: #444076;
  }
  .session .btn{
    margin-top: 13px;
    margin-left: 40px;
  }
  .chatting{
    margin: 10px 0px;
    padding: 5px 10px;
    border: 1px solid #0236641d;
    border-radius: 10px;
    height: 500px;
    background-color: #0236641d;
  }
  .message{
    font-size:18px;
    padding-left: 1vw;
    margin-bottom: 10px;
    border: 1px solid #0236641d;
    height: 6vh;
    line-height: 6vh;
    width:100%;
  }
  </style>