<template>
    <div class="body">
        <br>
        <el-row style="padding-left: 20vw;margin-bottom: 3vh;">
            <el-button icon="ArrowLeftBold" circle @click="goBack"/>
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
                        <el-button color="#7A74C2" class="btn" type="primary">查看地点</el-button>
                    </div>
                    <div>
                        <el-button color="#7A74C2" style="margin-top:10px;" class="btn" type="primary" @click="contact">联系招聘方</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row class="card" justify="center">
                <el-descriptions
                    direction="vertical"
                    :column="2"
                    size="large"
                    border
                    style="width:90%;"
                >
                    <el-descriptions-item label="开始时间">{{job.startTime}}</el-descriptions-item>
                    <el-descriptions-item label="结束时间">{{job.endTime}}</el-descriptions-item>
                    <el-descriptions-item label="每日工作时间">{{job.workTime}}小时</el-descriptions-item>
                    <el-descriptions-item label="兼职类型">
                    <el-tag size="small">{{job.jobType}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item :span="2" label="地点">
                        {{job.workPlace}}
                    </el-descriptions-item>
                </el-descriptions>
            </el-row>
            <el-row class="card1"  justify="center">
                <el-row style="width:90%;margin-top: 20px;"><div class="card-header">工作详情</div></el-row>
                <el-row style="width:90%;"><div style="width:90%;" v-html="job.workDetails" class="workDetails"></div></el-row>
                <div style="margin:20px auto;">
                    <el-button v-if="!applyState" color="#7A74C2" class="btn" type="primary" @click="this.dialogFormVisible=true;">报名兼职</el-button>
                    <el-button v-if="applyState" color="#7A74C2" class="btn" type="primary" disabled>已报名</el-button>
                    <el-button color="#7A74C2" class="btn" type="primary" @click="dialogFormVisible1=true">举报兼职</el-button>
                    <el-button color="#7A74C2" class="btn" type="primary" @click="jobDetail">收藏兼职</el-button>
                </div>
            </el-row>
        </el-row>
        <br>
        <el-dialog v-model="dialogFormVisible" title="报名兼职" align-center>
            <el-form label-width="120px">
                <el-form-item label="联系方式">
                    <el-input placeholder="联系方式将存储在个人信息" v-if="!contactMethod" v-model="commitContactMethod"/>
                    <el-input v-if="contactMethod" disabled v-model="contactMethod"/>
                </el-form-item>
                <el-form-item label="自我介绍">
                    <el-input v-model="order.applyReason" :rows="5" type="textarea"/>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="signUpJob">
                    确认
                </el-button>
                <el-button type="primary" @click="dialogFormVisible=false">
                    取消
                </el-button>
            </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible1" title="举报兼职" align-center>
            <el-form label-width="120px">
                <el-form-item label="举报理由">
                    <el-input v-model="report.reason" :rows="5" type="textarea"/>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="reportJob">
                    确认
                </el-button>
                <el-button type="primary" @click="dialogFormVisible1=false">
                    取消
                </el-button>
            </span>
            </template>
        </el-dialog>
        <el-backtop :bottom="80">
            <div style="height: 100%;width: 100%;background-color: #444076;text-align: center;line-height: 45px;color: #FFCAA6;vertical-align: middle;border-radius: 10px;">
                <el-icon><ArrowUpBold /></el-icon>
            </div>
        </el-backtop>
    </div>
</template>
<script>
// @ is an alias to /src
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import {useRouter} from 'vue-router';

export default {
name: 'jobDetail',
setup(){
    const router = useRouter();
    const contact = () => {
      router.replace({
        path: '/jobhunter/message/conversations/privatechat/fdee46b0-4b01-4590-bdba-6586d7617f95',
        query: {
          name: 'Tracy',
          avatar: '/static/images/Avatar-3.png'
        }
      });
    };

    return {
      contact
    };
},
components: {
},
data(){
    return{
        applyState:null,
        recruiterId:null,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        contactMethod:null,
        commitContactMethod:null,
        job: {},
        order:{
            jobId:null,
            jobhunterId:null,
            applyReason:null
        },
        report:{
            jobId:null,
            jobhunterId:null,
            reason:null
        },
        company:{}
        
    }
},
created() {
    this.order.jobhunterId=localStorage.getItem('userId');
    this.order.jobId=localStorage.getItem('jobDetailId');
    this.report.jobhunterId=localStorage.getItem('userId');
    this.report.jobId=localStorage.getItem('jobDetailId');

    //判断用户是否报名
    this.$axios({
        method: 'get',
        url: '/api/order/getApplyState?jobId='+localStorage.getItem('jobDetailId')+'&jobhunterId='+localStorage.getItem('userId'),
    })
    .then(res => {
        console.log('状态');
        console.log(res);
        if(res.data.message=='已取消'||res.data.message=='已放弃'){
            this.applyState=false;
        }
        else{
            this.applyState=true;
        }
        if(res.data.code==400){
            this.applyState=false;
        }
    })
    .catch(function (error) {
        console.log(error);
    })

    //获取兼职详情
    this.$axios({
        method: 'get',
        url: '/api/job/getJobList?jobId='+localStorage.getItem('jobDetailId'),
    })
    .then(res => {

        this.job=res.data.data.job_list[0];
        console.log(this.job);
        this.recruiterId=this.job.recruiterId;
        this.$axios({
            method: 'get',
            url: '/api/recruiter/personInfo/get?recruiterId='+this.recruiterId,
        })
        .then(resu => {
            console.log(resu.data.data.company_list);
            this.company=resu.data.data.company_list;
            console.log(this.company);
        })
        .catch(function (error) {
            console.log(error);
        })
    })
    .catch(function (error) {
        console.log(error);
    })
    //获取联系方式
    this.$axios({
        method: 'get',
        url: '/api/contactMethod/get/?userId='+localStorage.getItem('userId'),
    })
    .then(res => {
        this.contactMethod=res.data.data.contactMethod;
    })
    .catch(function (error) {
        console.log(error);
    })
},
methods: {
    goBack(){
        this.$router.go(-1);
    },
    signUpJob(){
        console.log(this.order)
        if((this.contactMethod==null||this.contactMethod=='')&&(this.commitContactMethod==null||this.commitContactMethod=='')){
            ElMessage({
                message: "联系方式不能为空！",
                type: 'error',
            })
            return;
        }
        if(this.order.applyReason==null||this.order.applyReason==''){
            ElMessage({
                message: "请填写自我介绍！",
                type: 'error',
            })
            return;
        }
        if(this.contactMethod==null||this.contactMethod==''){
            //设置联系方式
            this.$axios({
                method: 'post',
                url: '/api/contactMethod/set',
                data:{
                    userId:localStorage.getItem('userId'),
                    contactMethod:this.commitContactMethod,
                }
            })
            .then(res => {
                console.log(res.data.code)
            })
            .catch(function (error) {
                console.log(error);
            })
        }

        //报名
        this.$axios({
            method: 'post',
            url: '/api/order/applyForJob',
            data: this.order
        })
        .then(res => {
            console.log(res)
            if(res.data.code==200){
                ElMessage({
                    message: "报名成功！",
                    type: 'success',
                })
                setTimeout(() => console.log(1), 2000)
                this.$router.go(0)
            }
            else{
                ElMessage({
                    message: "报名失败！",
                    type: 'success',
                })
            }
        })
        .catch(function (error) {
            console.log(error);

        })

    },
    reportJob(){
        if(this.report.reason==null||this.report.reason==''){
            ElMessage({
                message: "请填写举报理由！",
                type: 'error',
            })
            return;
        }
        console.log(this.report)
        //举报兼职
        this.$axios({
            method: 'post',
            url: '/api/job/reportJob',
            data: this.report
        })
        .then(res => {
            console.log(res)
            if(res.data.code==200){
                ElMessage({
                    message: "举报成功！",
                    type: 'success',
                })
            }
            else{
                ElMessage({
                    message: "您已举报过该兼职！",
                    type: 'error',
                })
            }
        })
        .catch(function (error) {
            console.log(error);
            ElMessage({
                message: "举报失败！",
                type: 'error',
            })
        })
    },
    
    // contact(){
    //     const router = useRouter();
    //     router.replace({
    //         path: '/jobhunter/message/conversations/privatechat/' + 'fdee46b0-4b01-4590-bdba-6586d7617f95',
    //         query: {
    //             name: 'Tracy',
    //             avatar: '/static/images/Avatar-3.png'
    //         }
    //     }); 
    // }
}
}
</script>

<style scoped>
.body{
    width: 100%;
    min-height: 100vh;
    background-color: rgba(255, 202, 166, 0.3);
}
.back{
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    color: #444076;
    font-weight: 600;
}
.card{
    width:60vw;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.card1{
    width:60vw;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 0px;
    display: flex;
    align-items: left;
    margin-bottom: 10px;
}
.card .workName{
    color: #444076;
    margin-bottom: 5px;
}
.card .salary{
    color: #7A74C2;
    margin-right: 2vw;
}
.card .releaseTime{
    color: grey;
}
.btn{
    width: 7vw;
}
.card-header{
    text-align: left;
    padding-left: 10px;
    color: #023764;
    border-left: 8px solid #023764;
    font-size: 20px;
    margin-left: 3vw;
    margin-bottom: 3vh;
}
.workDetails{
    border-top: 1px solid #d3d2d2;
    border-bottom: 1px solid #d3d2d2;
    color: #646464;
    padding: 20px 3vw;
    padding-bottom: 2vw;
    margin-bottom: 1vw;
    line-height: 26px;
}
</style>