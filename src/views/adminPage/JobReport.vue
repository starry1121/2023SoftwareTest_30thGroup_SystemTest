<template>
    <el-container>
        <el-aside width="15vw" style="background-color:#444076">
            <img class="logo" alt="logo" src="../../assets/logo.png">
            <el-menu
                class="el-menu"
                default-active="/admin/jobReport"
                router=true
                style="height: 89vh;"
                active-text-color="#FFCAA6"
                background-color="#444076"
                text-color="#fff"
                open="1"
            >
                <el-sub-menu index="1">
                <template #title>
                    <el-icon><User /></el-icon>
                    <span class="menu-item1">审查实名</span>
                </template>
                    <el-menu-item class="menu-item2" index="/admin/personAuthentication">&emsp;个人认证</el-menu-item>
                    <el-menu-item class="menu-item2" index="/admin/companyAuthentication">&emsp;企业认证</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/admin/order">
                <template #title>
                    <el-icon><Memo /></el-icon>
                    <span class="menu-item1">订单申诉</span>
                </template>
                </el-menu-item>
                <el-sub-menu index="2">
                <template #title>
                    <el-icon><Notification /></el-icon>
                    <span class="menu-item1">兼职管理</span>
                </template>
                    <el-menu-item class="menu-item2" index="/admin/job">&emsp;审核兼职</el-menu-item>
                    <el-menu-item class="menu-item2" index="/admin/jobReport">&emsp;兼职举报</el-menu-item>
                    <el-menu-item class="menu-item2" index="/admin/jobType">&emsp;兼职类型</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/admin/notification">
                <template #title>
                    <el-icon><Bell /></el-icon>
                    <span class="menu-item1">系统通知</span>
                </template>
                </el-menu-item>
                <el-menu-item index="/admin/notice">
                <template #title>
                    <el-icon><Reading /></el-icon>
                    <span class="menu-item1">公告管理</span>
                </template>
                </el-menu-item>
            </el-menu>  
        </el-aside>
        <el-container class="" style="height: 100vh">
            <el-header class="header">
                <el-row>
                    <el-col :span="22" class="title">
                    </el-col>
                    <el-col :span="2" class="text">
                        你好！管理员
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="background-color: #F0F1F6;">
                <el-card class="card">
                    <template #header>
                    <div class="card-header">
                        <span class="title">兼职举报列表</span>
                    </div>
                    </template>
                    <el-table
                        :data="applyList.slice((page-1) * limit, page * limit)" 
                        style="width: 100%"
                        size="large"
                        height="430"
                        highlight-current-row
                        @current-change="getCurrentRow"
                    >
                        <el-table-column label="序号" type="index" width="150" />
                        <el-table-column prop="jobhunterID" label="举报者ID" sortable width="170"/>
                        <el-table-column prop="jobID" label="兼职ID" sortable width="170"/>
                        <el-table-column prop="reportReason" label="举报理由"/>
                        <el-table-column prop="reportTime" sortable label="举报时间" />
                        <el-table-column
                            prop="reportState"
                            label="状态"
                            width="100"
                            :filters="[
                                { text: '已通过', value: '已通过' },
                                { text: '未通过', value: '未通过' },
                            ]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end"
                            >
                            <template #default="scope">
                                <el-tag
                                v-if="scope.row.reportState == '已通过'"
                                :type="success"
                                disable-transitions
                                >已通过</el-tag>
                                <el-tag
                                v-if="scope.row.reportState =='未通过'"
                                :type="scope.row.reportState === '已通过' ? 'success' : 'danger'"
                                disable-transitions
                                >未通过</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="operation">
                                <el-button v-if="operation.row.appealResult == null" :disabled="operation.row.appealResult != null" link type="primary" size="small" @click="dialogFormVisible = true"
                                >审核</el-button>
                                <el-button v-if="operation.row.appealResult != null" :disabled="operation.row.appealResult != null" link type="primary" size="small" @click="dialogFormVisible = true"
                                >查看</el-button>
                                <el-button link type="primary" size="small" @click="confirmDelete">删除</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                    <el-row justify="center">
                        <div class="pagination">
                            <div class="pagination_style">&emsp;</div>
                            <el-pagination
                            :current-page="page"
                            :page-size="limit"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            @current-change="handleCurrentChange"
                            />
                        </div>
                    </el-row>
                    <el-dialog v-model="dialogFormVisible" title="审批申请" align-center draggable>
                        <el-scrollbar max-height="400px">
                            <el-descriptions
                                direction="vertical"
                                :column="3"
                                size="large"
                                border
                                style="width:90%;"
                                title="兼职详情"
                            >
                                <el-descriptions-item label="开始时间">{{job.startTime}}</el-descriptions-item>
                                <el-descriptions-item label="结束时间">{{job.endTime}}</el-descriptions-item>
                                <el-descriptions-item label="每日工作时间">{{job.workTime}}</el-descriptions-item>
                                <el-descriptions-item label="兼职类型">
                                <el-tag size="small">{{job.jobType}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item :span="3" label="地点">
                                    {{job.workPlace}}
                                </el-descriptions-item>
                                <el-descriptions-item :span="3" label="兼职详情">
                                    <div v-html="job.workDetails" class="workDetails"></div>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-scrollbar>
                        <el-form :model="apply">

                        <el-form-item required v-if="display" label="结果" label-width="70px">
                            <el-input :disabled="apply.reportResult != null" v-model="result" autocomplete="off" type="textarea" :rows="3"/>
                        </el-form-item>
                        <el-form-item required v-if="apply.reportResult != null" label="结果" label-width="70px">
                            <el-input :disabled="apply.reportResult != null" v-model="apply.reportResult" autocomplete="off" type="textarea" :rows="3"/>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button :disabled="apply.reportResult != null" v-if="!display" @click="display=true;">不通过</el-button>
                            <el-button v-if="display" @click="display=false;result=null;">返回</el-button>
                            <el-button v-if="display" @click="noPass">确认</el-button>
                            <el-button :disabled="apply.reportResult != null" v-if="!display" type="primary" @click="pass">通过</el-button>
                        </span>
                        </template>
                    </el-dialog>
                </el-card>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import { ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
    name: 'adminNotice',
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            applyList:[{
                "jobhunterID":1,
                "reportReason":"这个兼职违规了",
                "reportState":"未通过",
                "reportResult":null,
                "jobID":1,
                "reportTime":"1980-11-13 22:09:23"
            },
            {
                "jobhunterID":2,
                "reportReason":"这个兼职违规了",
                "reportState":"未通过",
                "reportResult":null,
                "jobID":1,
                "reportTime":"1980-11-13 22:09:23"
            }],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            result:null,
            apply:{
                "jobhunterID":1,
                "reportReason":"这个兼职违规了",
                "reportState":null,
                "reportResult":null,
                "jobID":1,
                "reportTime":"1980-11-13 22:09:23"
            },
            job:{
                "jobId":1,
                "workDetails":'<br>【工作薪酬】时薪20.5/h&nbsp;&nbsp;法定三薪<br>【上班时间】9:00-22:00之间安排每班4-8小时，一周上班3-7天，需要周末＋工作日最少一天<br>【工作地点】 广州市番禺区东艺路139号-15<br>【岗位要求】<br>1、性格开朗,沟通能力强,擅长与陌生人打交道,能主动招揽商场访客成为会员<br>2、周六日、节假日(包含春节)均能上班,适应零售排班制度,不随意请假缺勤<br>3、完成每日招募目标,超额完成月度目标,可获额外奖励<br>4、亲和力强,热爱家居生活,有服务意识,为商场访客提供良好的购物体验<br>【工作内容】<br>以下为部分部门，实际目前招聘部门可添加报名咨询~<br>顾客关系部收银：面对顾客有服务意识.&nbsp;2.适应轮岗轮休，能接受长时间站着工作。3.对工作充满热情，乐于同团队其他成员合作&nbsp;。<br>销售部：办公家具区卖场服务顾客、开单、卖场basic的维护"<br>餐饮部：顾客餐厅打热餐、小餐馆打雪糕、热狗；餐厅收银、货品补货、盘点"<br>【上岗要求】<br>1.春节可以上班（指的是除夕至初十可以轮岗轮休）<br>2主动积极,服从任何排班安排,服务意识强。<br>3.男女均可,适合学生族,上班族。<br>4、18周岁以上&nbsp;&nbsp;<br>【薪酬发放】工资月结，每月的25号结算',
                "startTime":"2018-04-01",
                "endTime":"2015-12-24",
                "jobType":"市场服务",
                "workPlace":"广东广州番禺广州市番禺区东艺路139号",
                "salary":800,
                "workName":"广州番禺宜家家居长短期兼职",
                "recuriterID":1,
                "releaseTime":"2015-12-24 22:21:18",
                "workTime":"12:07:43",
                "jobState":"未通过"
            },
            display:false,
            isPass:true,
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        getCurrentRow(value){
            if(value!=null){
                console.log(value);
                this.apply.jobhunterID=value.jobhunterID;
                this.apply.reportReason=value.reportReason;
                this.apply.reportState=value.reportState;
                this.apply.jobID=value.jobID;
                this.apply.reportTime=value.reportTime;
            }
        },
        noPass(){
            this.dialogFormVisible1 = false;
            console.log("不通过");
            if(this.result==""||this.result==null){
                ElMessage({
                    message: "反馈不能为空",
                    type: 'error',
                })
                return;
            }
        },
        pass(){
            this.dialogFormVisible1 = false;
        },
        delete(){

        },
        confirmDelete(){
            ElMessageBox.confirm(
                '确认删除?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
                this.delete();
            })
        }
    },
    creater(){

    },
}


</script>

<style scoped>
.header{
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    border-bottom:3px solid gainsboro;
}
.header .title{
    color: #444076;
    font-size: large;
    padding-left: 1vw;
}
.logo{
    display: inline-block;
    height: 10vh;
    background-color: #444076;
    width: 90%;
}
.el-menu{
    background-color: #444076;
}
.menu-item1{
    font-size: large;
}
.menu-item2{
    color: #fff;
    font-size: medium;
}
.el-menu-item.is-active{
    background-color: #444076;
    color: #FFCAA6;
}
.card{
    height: 99%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
.card-header .title{
    padding-left: 10px;
    color: #444076;
    border-left: 8px solid #FFCAA6;
    font-size: 20px;
}
.card-header .button{
    height: 30px;
    width: 80px;
}

.pagination{
--el-color-primary: #444076;
display: block;
margin: 0 auto;
}
.el-pagination {
--el-pagination-font-size: 16px;
--el-pagination-button-color: #024886;
--el-pagination-button-disabled-bg-color:#fff;
--el-pagination-button-bg-color:#fff;
--el-pagination-hover-color: #167fdb;
}
</style>