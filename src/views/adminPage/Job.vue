<template>
    <el-container>
        <el-aside width="15vw" style="background-color:#444076">
            <img class="logo" alt="logo" src="../../assets/logo.png">
            <el-menu
                class="el-menu"
                default-active="/admin/job"
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
                    <el-col :span="22">
                    </el-col>
                    <el-col :span="2">
                        <el-button plain type="primary">
                            <router-link to="/">退出登录</router-link>
                        </el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="background-color: #F0F1F6;">
                <el-card class="card">
                    <template #header>
                    <div class="card-header">
                        <span class="title">兼职列表</span>
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
                        <el-table-column label="序号" type="index" />
                        <el-table-column prop="jobId" label="兼职ID" sortable width="100"/>
                        <el-table-column prop="companyName" label="发布公司"/>
                        <el-table-column prop="workName" label="兼职名称"/>
                        <el-table-column prop="workDetails" label="兼职详情"/>
                        <el-table-column prop="jobType" label="兼职类型"/>
                        <el-table-column prop="workPlace" label="兼职地点"/>
                        <!-- <el-table-column
                            prop="jobState"
                            label="状态"
                            width="100"
                            :filters="[
                                { text: '已通过', value: '已通过' },
                                { text: '未通过', value: '未通过' },
                                { text: '未审核', value: '未审核' },
                            ]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end"
                            >
                            <template #default="scope">
                                <el-tag
                                    v-if="scope.row.jobState == '未审核'"
                                    disable-transitions
                                >未审核</el-tag>
                                <el-tag
                                    v-if="scope.row.jobState == '已通过'"
                                    type="success"
                                    disable-transitions
                                >已通过</el-tag>
                                <el-tag
                                    v-if="scope.row.jobState =='未通过'"
                                    type="danger"
                                    disable-transitions
                                >未通过</el-tag>
                            </template>
                        </el-table-column> -->
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="operation">
                                <el-button v-if="operation.row.jobState == '未审核'" link type="primary" size="small" @click="dialogFormVisible = true"
                                >审核</el-button>
                                <el-button v-if="operation.row.jobState != '未审核'" link type="primary" size="small" @click="dialogFormVisible = true"
                                >查看</el-button>
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
                    <el-dialog v-model="dialogFormVisible" title="兼职详情" align-center draggable>
                        <el-scrollbar max-height="400px">
                            <!-- 兼职详情 -->
                            <el-descriptions direction="vertical" :column="2" size="large" border style="width:100%;" title="兼职详情">
                            <el-descriptions-item :span="1" label="兼职名称">
                                {{ apply.workName }}
                            </el-descriptions-item>
                            <el-descriptions-item :span="1" label="发布公司">
                                {{ apply.companyName }}
                            </el-descriptions-item>
                            <el-descriptions-item :span="1" label="兼职类型">
                                <el-tag size="small">{{ apply.jobType }}</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="薪水">{{ apply.salary }}</el-descriptions-item>
                            <el-descriptions-item label="开始时间">{{ apply.startTime }}</el-descriptions-item>
                            <el-descriptions-item label="结束时间">{{ apply.endTime }}</el-descriptions-item>
                            <el-descriptions-item label="每日工作时间">{{ apply.workTime }}</el-descriptions-item>
                            <el-descriptions-item :span="2" label="公司名称">
                                {{ apply.companyName }}
                            </el-descriptions-item>
                            <el-descriptions-item :span="2" label="地点">
                                {{ apply.workPlace }}
                            </el-descriptions-item>
                            <el-descriptions-item :span="2" label="兼职详情">
                                <div v-html="apply.workDetails" class="workDetails"></div>
                            </el-descriptions-item>
                            </el-descriptions>
                            <el-form v-if="apply.jobState!='未审核'" :model="apply">
                                <br>
                                <h3 style="margin-bottom:10px;">审核详情</h3>
                                <el-form-item label="审核状态" label-width="80px">
                                    <el-tag
                                        v-if="apply.jobState == '已通过'"
                                        type="success"
                                        disable-transitions
                                    >已通过</el-tag>
                                    <el-tag
                                        v-if="apply.jobState =='未通过'"
                                        type="danger"
                                        disable-transitions
                                    >未通过</el-tag>
                                </el-form-item>
                                <el-form-item v-if="apply.jobState=='未通过'" label="结果反馈" label-width="80px">
                                    <el-input disabled v-model="apply.reportResult" autocomplete="off" type="textarea" :rows="3"/>
                                </el-form-item>
                            </el-form>
                        </el-scrollbar>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button v-if="apply.jobState!='未审核'" type="primary" @click="dialogFormVisible=false">返回</el-button>
                                <el-button v-if="apply.jobState=='未审核'" type="danger" plain @click="noPass">驳回</el-button>
                                <el-button v-if="apply.jobState=='未审核'" type="primary" plain @click="pass">通过</el-button>
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
            applyList:[],
            dialogFormVisible: false,
            apply:{},
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        getCurrentRow(value){
            if(value!=null){
                console.log(value);
                this.apply=value;
            }
        },
        noPass(){
            console.log("不通过");

            ElMessageBox.confirm(
                '确认驳回该兼职?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
                this.dialogFormVisible = false;
                this.$axios({
                    method: 'post',
                    url: '/api/admin/auditJobUnreviewed?jobId='+this.apply.jobId+'&jobState=未通过',
                })
                .then(res => {
                    if(res.data.code==200){
                        ElMessage({
                            message: "已驳回该兼职",
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
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                })
            })
        },
        pass(){
            ElMessageBox.confirm(
                '确认通过该兼职?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
                this.dialogFormVisible = false;
                this.$axios({
                    method: 'post',
                    url: '/api/admin/auditJobUnreviewed?jobId='+this.apply.jobId+'&jobState=已通过',
                })
                .then(res => {
                    if(res.data.code==200){
                        ElMessage({
                            message: "已通过该兼职",
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
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                })
            })

        },
        filterTag(value, row) {
            return row.jobState===value;
        },
    },
    created(){
        // 获取待审核的兼职列表
        this.$axios({
            method: 'get',
            url: '/api/admin/getJobUnreviewed/?jobId=-1',
        })
        .then(res => {
            if(res.data.code==200){
                this.applyList=res.data.data.job_list;
                this.total=this.applyList.length;
                console.log('待审核的兼职列表'+this.applyList);
            }
            else{
                this.applyList=null
            }
        })
        .catch(function (error) {
            console.log(error);
        })
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