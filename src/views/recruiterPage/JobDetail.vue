<template>
    <div class="body">
        <br>
        <el-row style="padding-left: 20vw;margin-bottom: 3vh;">
            <el-button icon="ArrowLeftBold" circle @click="goBack" />
            <span class="back">返回</span>
        </el-row>
        <el-row justify="center">
            <el-row class="card" justify="center">
                <el-col :span="4">
                    <el-avatar class="head_photo" :size="80" fit="cover" :src="company.headportrait" />
                </el-col>
                <el-col :span="14">
                    <h2 class="workName">{{ job.workName }}</h2>
                    <div style="margin-bottom: 5px;color: #444076;">{{ company.companyName }}</div>
                    <span class="salary">{{ job.salary }}元/天</span>
                    <span class="releaseTime">发布时间：{{ job.releaseTime }}</span>
                </el-col>
                <el-col :span="3">
                    <div>
                        <el-button color="#7A74C2" class="btn" type="primary" @click="dialogFormVisible=true">查看地点</el-button>
                    </div>
                    <div>
                        <el-button color="#7A74C2" style="margin-top:10px;" class="btn" type="primary" @click="finishRecruit">结束招聘</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row class="card" justify="center">
                <el-descriptions direction="vertical" :column="2" size="large" border style="width:90%;">
                    <el-descriptions-item label="开始时间">{{ job.startTime }}</el-descriptions-item>
                    <el-descriptions-item label="结束时间">{{ job.endTime }}</el-descriptions-item>
                    <el-descriptions-item label="每日工作时间">{{ job.workTime }}</el-descriptions-item>
                    <el-descriptions-item label="兼职类型">
                        <el-tag size="small">{{ job.jobType }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item :span="2" label="地点">
                        {{ job.workPlace }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-row>
            <el-row class="card1"  justify="center">
                <el-row style="width:100%;margin-top: 20px;"><div class="card-header">工作详情</div></el-row>
                <el-row style="width:100%;" justify="center"><div style="width:90%;" v-html="job.workDetails" class="workDetails"></div></el-row>
            </el-row>

            <el-row class="card" style="text-align: left;">
                <div class="card-header">求职者列表-已报名</div>
                <el-row style="width:100%;" justify="center">
                    <el-table :key="signupList" :data="signupList" style="width: 90%" height="250">
                        <el-table-column label="用户" width="110">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <el-avatar :size="30" fit="cover" :src="scope.row.jobhunter.headportrait" />
                                    <span style="margin-left: 10px">{{ scope.row.jobhunter.jobhunterId }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jobhunter.email" label="电子邮箱"/>
                        <el-table-column prop="jobhunter.school" label="学校" />
                        <el-table-column prop="jobhunter.score" label="求职者评分"/>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button round size="small" @click="contact(scope.row.jobhunter)">私信</el-button>
                                <el-button type="primary" round size="small"
                                    @click="offer(scope.row)">录用</el-button>
                                <el-button size="small" type="danger" round
                                    @click="noOffer(scope.row)">拒绝</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>

            <el-row key="two" class="card" style="text-align: left;">
                <div class="card-header">求职者列表-已通过</div>
                <el-row style="width:100%;" justify="center">
                    <el-table :key="replyList" :data="replyList" style="width: 90%" height="250">
                        <el-table-column label="用户" width="110">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <el-avatar :size="30" fit="cover" :src="scope.row.jobhunter.headportrait" />
                                    <span style="margin-left: 10px">{{ scope.row.jobhunter.jobhunterId }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jobhunter.email" label="电子邮箱"/>
                        <el-table-column prop="jobhunter.school" label="学校" />
                        <el-table-column prop="jobhunter.score" label="求职者评分"/>
                        <el-table-column label="操作" width="100">
                            <template #default="scope">
                                <el-button round size="small" @click="contact(scope.row.jobhunter)">私信</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>

            <el-row class="card">
                <div class="card-header">求职者列表-已录用</div>
                <el-row style="width:100%;" justify="center">
                    <el-table :key="workingList" :data="workingList" style="width: 90%" height="250">
                        <el-table-column label="用户" width="110">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <el-avatar :size="30" fit="cover" :src="scope.row.jobhunter.headportrait" />
                                    <span style="margin-left: 10px">{{ scope.row.jobhunter.jobhunterId }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jobhunter.email" label="电子邮箱"/>
                        <el-table-column prop="jobhunter.school" label="学校" />
                        <el-table-column prop="jobhunter.score" label="求职者评分"/>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button round size="small" @click="contact(scope.row.jobhunter)">私信</el-button>
                                <el-button id="confirmFinishJob" type="primary" round size="small"
                                    @click="finishJob(scope.row)">确认工作完成</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>

            <el-row class="card">
                <div class="card-header">求职者列表-已完成</div>
                <el-row style="width:100%;" justify="center">
                    <el-table :key="finishList" :data="finishList" style="width: 90%" height="250" show-header>
                        <el-table-column prop="jobhunter.email" label="用户" width="110">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <el-avatar :size="30" fit="cover" :src="scope.row.jobhunter.headportrait" />
                                    <span style="margin-left: 10px">{{ scope.row.jobhunter.jobhunterId }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jobhunter.email" label="电子邮箱" width="200"/>
                        <el-table-column prop="jobhunter.school" label="学校" />
                        <el-table-column prop="orderScore.jobhunterScore" label="员工评分"  width="100"/>
                        <el-table-column prop="orderScore.recruiterScore" label="我的评分"  width="100"/>
                        <el-table-column label="操作" width="200">
                        <template #default="scope">
                            <el-button round size="small" @click="contact(scope.row.jobhunter)">私信</el-button>
                            <el-button id="score" type="primary" round size="small"
                                @click="score(scope.row.orderId)">评分</el-button>
                            <el-button id="apply" round size="small" @click="this.dialogFormVisible2=true;this.appeal.orderId=scope.row.orderId;">申诉</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </el-row>
            </el-row>


        </el-row>
        <br>
        <!-- 兼职地点查看对话框 -->
        <el-dialog v-model="dialogFormVisible" title="兼职地点" align-center  width="80%">
            <GaodeMapDetail ></GaodeMapDetail>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogFormVisible1" title="为求职者打分" align-center draggable>
            <el-rate id="scoreValue" v-model="jobhunterScore" />
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible1=false;">取消</el-button>
                <el-button @click="setScore">确认</el-button>
            </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible2" title="提交申诉" align-center draggable>
            <el-form :model="appeal" label-width="120px">
                <el-form-item class="input" label="申诉理由">
                    <el-input v-model="appeal.appealContent" :rows="5" type="textarea"/>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible2=false;">取消</el-button>
                <el-button type="primary" @click="apply">确认</el-button>
            </span>
            </template>
        </el-dialog>
        <el-backtop :bottom="80">
            <div
                style="height: 100%;width: 100%;background-color: #444076;text-align: center;line-height: 45px;color: #FFCAA6;vertical-align: middle;border-radius: 10px;">
                <el-icon>
                    <ArrowUpBold />
                </el-icon>
            </div>
        </el-backtop>
    </div>
</template>
<script>
// @ is an alias to /src
import { ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'
import {useRouter} from 'vue-router';
import GaodeMapDetail from '@/components/GaodeMapforJobDetail.vue'

export default {
    name: 'jobDetail',
    components: {
        GaodeMapDetail,

    },
    setup(){
        const router = useRouter();
        const contact = (i) => {
        router.replace({
            path: '/recruiter/message/conversations/privatechat/'+i.email,
            query: {
                name: i.nickname,
                avatar: i.headportrait
            }
        });
        };
        return {
        contact
        };
    },
    data() {
        return {
            jobPositionCenter:[31.233462,121.492156],
            // jobPosition:{
            //     lat:31.233462,
            //     lng:121.492156,
            // },
            jobhunterScore:null,
            scoreId:null,
            recruiterId:null,
            company:{},
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2:false,
            job: {},
            employeeList: [
                {
                    nickname: 'Lucy',
                    email: '2233@qq.com',
                    school: 'tongji',
                    score1: '5',
                    score2: '5',
                },
                {
                    nickname: 'Lucy',
                    email: '2233@qq.com',
                    school: 'tongji',
                    score1: '5',
                    score2: '5',
                },
            ],
            orderList:[{}],
            signupList:[{}],
            replyList:[{}],
            workingList:[{}],
            finishList:[{}],
            appeal:{
                orderId:null,
                appealContent:null,
                appealType:"招聘方评价申诉",
            }
        }
    },
    created() {
        //获取兼职详情
        this.$axios({
            method: 'get',
            url: '/api/job/getJobList?jobId='+localStorage.getItem('jobDetailId'),
        })
        .then(res => {
            this.job=res.data.data.job_list[0];
            console.log('兼职'+res.data.data.job_list[0]);
            this.recruiterId=this.job.recruiterId;
            this.$axios({
                method: 'get',
                url: '/api/recruiter/personInfo/get?recruiterId='+this.recruiterId,
            })
            .then(resu => {
                console.log(resu.data.data.company_list[0]);
                this.company=resu.data.data.company_list[0];
                console.log(this.company);
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })

        //获取兼职报名者列表
        this.$axios({
            method: 'get',
            url: '/api/order/getAppliedList?jobId='+localStorage.getItem('jobDetailId'),
        })
        .then(resu => {
            console.log(this.signupList);
            this.orderList=resu.data.data.order_list;
            this.signupList= this.orderList.filter((value)=>{
                return value.orderState.includes('已报名');
            });
            console.log(this.signupList);
            this.replyList= this.orderList.filter((value)=>{
                return value.orderState.includes('已通过');
            });
            console.log(this.replyList);
            this.workingList= this.orderList.filter((value)=>{
                return value.orderState.includes('已录用');
            });
            console.log(this.signupList);
        })
        .catch(function (error) {
            console.log(error);
        })
        //获取兼职报名者列表
        this.$axios({
            method: 'get',
            url: '/api/order/getAcceptedList?jobId='+localStorage.getItem('jobDetailId'),
        })
        .then(resu => {

            this.finishList= resu.data.data.order_list.filter((value)=>{
                return value.orderState.includes('已完成');
            });
        })
        .catch(function (error) {
            console.log(error);
        })

    },
    methods: {
        getNewData(){
            //获取兼职报名者列表
            this.$axios({
                method: 'get',
                url: '/api/order/getAppliedList?jobId='+localStorage.getItem('jobDetailId'),
            })
            .then(resu => {
                console.log(this.signupList);
                this.orderList=resu.data.data.order_list;
                this.signupList= this.orderList.filter((value)=>{
                    return value.orderState.includes('已报名');
                });
                console.log(this.signupList);
                this.replyList= this.orderList.filter((value)=>{
                    return value.orderState.includes('已通过');
                });
                console.log("this.replyList"+this.replyList);
                this.workingList= this.orderList.filter((value)=>{
                    return value.orderState.includes('已录用');
                });
                console.log(this.signupList);
            })
            .catch(function (error) {
                console.log(error);
            })
            //获取兼职报名者列表
            this.$axios({
                method: 'get',
                url: '/api/order/getAcceptedList?jobId='+localStorage.getItem('jobDetailId'),
            })
            .then(resu => {

                this.finishList= resu.data.data.order_list;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        goBack() {
            this.$router.go(-1);
        },
        finishRecruit(){
            if(this.job.jobState=='已完成'){
                ElMessage({
                    message: "该兼职已完成",
                    type: 'error',
                })
                return;
            }
            if(this.job.jobState=='已结束'){
                ElMessage({
                    message: "招聘已结束",
                    type: 'error',
                })
                return;
            }
            if(this.replyList.length){
                ElMessage({
                    message: "请等待求职者答复",
                    type: 'error',
                })
                return;
            }
            ElMessageBox.confirm(
                '确认结束招聘?',
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
                    url: '/api/job/closeRecruit?jobId='+localStorage.getItem('jobDetailId'),
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        ElMessage({
                            message: "已结束招聘",
                            type: 'success',
                        })
                        this.getNewData();
                    }
                    else{
                        ElMessage({
                            message: "招聘结束，已拒绝录用所有报名者",
                            type: 'success',
                        })
                        this.getNewData();
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
        offer(value){
            ElMessageBox.confirm(
                '确认录用?',
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
                    url: '/api/order/giveOffer?orderId='+value.orderId+'&orderState=已通过',
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        ElMessage({
                            message: "录用成功",
                            type: 'success',
                        })
                        this.getNewData();
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
        noOffer(value){
            ElMessageBox.confirm(
                '确认拒绝?',
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
                    url: '/api/order/giveOffer?orderId='+value.orderId+'&orderState=未通过',
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        ElMessage({
                            message: "拒绝成功",
                            type: 'success',
                        })
                        this.getNewData();
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
        finishJob(value){
            ElMessageBox.confirm(
                '确认该员工已完成工作?',
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
                    url: '/api/order/confirmJobFinish?orderId='+value.orderId,
                })
                .then(res => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        ElMessage({
                            message: "操作成功",
                            type: 'success',
                        })
                        this.getNewData();
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
        score(value){
            this.dialogFormVisible1=true;
            this.scoreId=value;
        },
        setScore(){
            if(this.jobhunterScore==null){
                ElMessage({
                    message: "请打分！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/order/commentOnJobhunter?orderId='+this.scoreId+'&jobhunterScore='+this.jobhunterScore,
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "打分成功",
                        type: 'success',
                    })
                }
                else{
                    ElMessage({
                        message: "打分成功",
                        type: 'success',
                    })
                }
                this.dialogFormVisible1=false;
                this.getNewData();
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
            if(this.appeal.appealContent==null||this.appeal.appealContent==""){
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
                    this.dialogFormVisible2=false;
                    this.getNewData();
                }
                else{
                    ElMessage({
                        message: "您的申诉审核中",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        },
    }
}
</script>

<style scoped>
.body {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(255, 202, 166, 0.3);
}

.back {
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    color: #444076;
    font-weight: 600;
}

.card {
    width: 60vw;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.card1 {
    width: 60vw;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 0px;
    display: flex;
    align-items: left;
    margin-bottom: 10px;
}

.card .workName {
    color: #444076;
    margin-bottom: 5px;
}

.card .salary {
    color: #7A74C2;
    margin-right: 2vw;
}

.card .releaseTime {
    color: grey;
}

.btn {
    width: 7vw;
}

.card-header {
    text-align: left;
    padding-left: 10px;
    color: #023764;
    border-left: 8px solid #023764;
    font-size: 20px;
    margin-left: 3vw;
    margin-bottom: 3vh;
}

.workDetails {
    border-top: 1px solid #d3d2d2;
    border-bottom: 1px solid #d3d2d2;
    color: #646464;
    padding-bottom: 2vw;
    margin-bottom: 1vw;
    line-height: 26px;
}
</style>