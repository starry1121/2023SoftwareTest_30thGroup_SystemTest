<template>
    <personNav/>
    <div class="bg">
        <br>
        <br>
        <el-row class="content">
        <el-col :span="3" :offset="3">
            <el-menu class="sidebar"
            default-active="/jobhunter/order"
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
            <span class="word">订单列表</span>
            </el-header>
            <el-row justify="center">
                <el-tabs v-model="select"  v-if="order_list" class="tabs" style="width:80%;margin-top:5px;">
                <el-tab-pane label="&emsp;&nbsp;已报名&nbsp;&emsp;" name="已报名">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='已报名'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                        <el-col :span="3">
                        <el-button class="button" color="#444076" @click="cancelOrder(item.orderId)">取消报名</el-button>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="&emsp;&nbsp;已取消&nbsp;&emsp;" name="已取消">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='已取消'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="&emsp;&nbsp;已通过&nbsp;&emsp;" name="已通过">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='已通过'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row><el-button class="button" color="#444076" @click="accept(item.orderId)" style="margin-bottom:5px;">接受录用</el-button></el-row>
                            <el-row><el-button class="button" color="#444076" @click="noAccept(item.orderId)">放弃录用</el-button></el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane> 
                <el-tab-pane label="&emsp;&nbsp;未通过&nbsp;&emsp;" name="未通过">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='未通过'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="&emsp;&nbsp;已录用&nbsp;&emsp;" name="已录用">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='已录用'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane> 
                <el-tab-pane label="&emsp;&nbsp;已放弃&nbsp;&emsp;" name="已放弃">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='已放弃'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}
                        </el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane> 
                <el-tab-pane label="&emsp;&nbsp;已完成&nbsp;&emsp;" name="已完成">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='已完成'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row><el-button class="button" color="#444076" @click="dialogFormVisible=true;appeal.orderId=item.orderId;" style="margin-bottom:5px;">&emsp;申诉&emsp;</el-button></el-row>
                            <el-row><el-button class="button" color="#444076" @click="score(item.orderId)">&emsp;评分&emsp;</el-button></el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane>  
                <el-tab-pane label="&emsp;&nbsp;支付异常&nbsp;&emsp;" name="支付异常">
                    <el-scrollbar max-height="430px">
                    <el-card class="box-card" v-for="item in order_list"  v-show="item.orderState=='支付异常'" :key="item" shadow="hover" style="margin-bottom:5px;">
                    <template #header>
                        <el-row>
                            <el-col :span="22">
                                <span style="font-size:18px;color:#444076;font-weight: 600;">{{ item.job.workName }}</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button color="#444076" size="small" class="button" icon="ArrowRightBold" circle></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col :span="21">
                        <div style="font-size:18px;color:grey;margin-bottom: 5px;">{{ item.job.workPlace }}</div>
                        <el-row style="font-size:14px;color:grey;margin-bottom: 5px;">
                            {{ item.job.startTime }}-{{ item.job.endTime }}&emsp;{{ item.job.workTime }}小时/天
                        </el-row>
                        </el-col>
                    </el-row>
                    </el-card>
                    </el-scrollbar>
                </el-tab-pane>   
                </el-tabs>
                <el-empty style="height:478px;" v-if="order_list==null" description="您还未收藏审核兼职" />
            </el-row>
    
        </el-col>
        </el-row>
        <el-dialog v-model="dialogFormVisible" title="提交申诉" align-center draggable>
            <el-form :model="appeal" label-width="120px">
                <el-form-item label="申诉类型">
                    <el-radio-group v-model="appeal.appealType">
                        <el-radio label="求职者评价申诉">评价申诉</el-radio>
                        <el-radio label="支付申诉">支付申诉</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="input" label="申诉理由">
                    <el-input v-model="appeal.appealContent" :rows="5" type="textarea"/>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible=false;">取消</el-button>
                <el-button @click="apply">确认</el-button>
            </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible1" title="为招聘方打分" align-center draggable>
            <el-rate v-model="recruiterScore" />
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible1=false;">取消</el-button>
                <el-button @click="setScore">确认</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
  </template>
  
  <script>
    import personNav from '@/components/personNav.vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import 'element-plus/es/components/message-box/style/index'
    import { BellFilled } from "@element-plus/icons-vue";
    export default {
    name: "jobhunterFavorites",
    data () {
    return {
        recruiterScore:null,
        scoreId:null,
        select:"已报名",
        dialogFormVisible:false,
        dialogFormVisible1:false,
        order_list: [
            {
                "orderId": 94,
                "orderState": "已报名",
                "job": {
                    "workName": "种米两产即十",
                    "workPlace": "officia dolor consectetur",
                    "startTime": "2014-04-28 10:02:37",
                    "endTime": "2005-08-21 02:47:19",
                    "workTime": "1973-05-26 21:46:17"
                }
            },
            {
                "orderId": 77,
                "orderState": "已取消",
                "job": {
                    "workName": "问类接眼",
                    "workPlace": "laboris ut ad",
                    "startTime": "2016-02-22 06:38:18",
                    "endTime": "1991-06-21 07:01:07",
                    "workTime": "1998-10-09 09:42:10"
                }
            },
            {
                "orderId": 50,
                "orderState": "已通过",
                "job": {
                    "workName": "治种无区",
                    "workPlace": "sed eu",
                    "startTime": "2007-06-02 10:24:19",
                    "endTime": "1981-03-18 22:19:36",
                    "workTime": "1981-09-07 21:16:07"
                }
            },
            {
                "orderId": 50,
                "orderState": "未通过",
                "job": {
                    "workName": "治种无区",
                    "workPlace": "sed eu",
                    "startTime": "2007-06-02 10:24:19",
                    "endTime": "1981-03-18 22:19:36",
                    "workTime": "1981-09-07 21:16:07"
                }
            },
            {
                "orderId": 50,
                "orderState": "已录用",
                "job": {
                    "workName": "治种无区",
                    "workPlace": "sed eu",
                    "startTime": "2007-06-02 10:24:19",
                    "endTime": "1981-03-18 22:19:36",
                    "workTime": "1981-09-07 21:16:07"
                }
            },
            {
                "orderId": 50,
                "orderState": "已放弃",
                "job": {
                    "workName": "治种无区",
                    "workPlace": "sed eu",
                    "startTime": "2007-06-02 10:24:19",
                    "endTime": "1981-03-18 22:19:36",
                    "workTime": "1981-09-07 21:16:07"
                }
            },
            {
                "orderId": 50,
                "orderState": "已完成",
                "job": {
                    "workName": "治种无区",
                    "workPlace": "sed eu",
                    "startTime": "2007-06-02 10:24:19",
                    "endTime": "1981-03-18 22:19:36",
                    "workTime": "1981-09-07 21:16:07"
                }
            },
            {
                "orderId": 50,
                "orderState": "支付异常",
                "job": {
                    "workName": "治种无区",
                    "workPlace": "sed eu",
                    "startTime": "2007-06-02 10:24:19",
                    "endTime": "1981-03-18 22:19:36",
                    "workTime": "1981-09-07 21:16:07"
                }
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
        score(value){
            this.dialogFormVisible1=true;
            this.scoreId=value;
        },
        setScore(){
            if(this.recruiterScore==null){
                ElMessage({
                    message: "请打分！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/order/commentOnRecruiter?orderId='+this.scoreId+'&recruiterScore='+this.recruiterScore,
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "打分成功",
                        type: 'success',
                    })
                }
                this.dialogFormVisible1=false;
            })
            .catch(function (error) {
                console.log(error);
                ElMessage({
                    message: "操作失败",
                    type: 'error',
                })
            })
        },
        apply(){
            if(this.appeal.appealContent==null||this.appeal.appealType==null){
                ElMessage({
                    message: "不能为空",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/order/appealOrder',
                data : this.appeal
            })
            .then(res => {
                this.dialogFormVisible=false;
                if(res.data.code==200){
                    ElMessage({
                        message: "已提交申诉",
                        type: 'success',
                    })
                    this.$router.go(0);
                }
                else{
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        cancelOrder(value){
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
                this.$axios({
                    method: 'put',
                    url: '/api/order/cancelApplyForJob?orderId='+value,
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        this.$router.go(0);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                })
            })
        },
        accept(value){
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
                this.$axios({
                    method: 'put',
                    url: '/api/order/confirmPassResult?orderId='+value+'&orderState=已录用',
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        this.$router.go(0);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                })
            })
        },
        noAccept(value){
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
                this.$axios({
                    method: 'put',
                    url: '/api/order/confirmPassResult?orderId='+value+'&orderState=已放弃',
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        this.$router.go(0);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                })
            })
        },
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/order/getJobhunterOrderList?jobhunterId='+localStorage.getItem('userId'),
        })
        .then(res => {
          if(res.data.code==200){
              console.log(res.data.data);
              this.order_list=res.data.data.order_list;
          }
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    components: {
        personNav,
        BellFilled,
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