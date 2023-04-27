<template>
    <el-container>
        <el-aside width="15vw" style="background-color:#444076">
            <img class="logo" alt="logo" src="../../assets/logo.png">
            <el-menu
                class="el-menu"
                default-active="/admin/personAuthentication"
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
                        <span class="title">申请列表</span>
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
                        <el-table-column prop="jobhunterID" label="求职者ID" sortable width="170"/>
                        <el-table-column prop="idCard" label="证件号码"/>
                        <el-table-column label="证件照片">
                            <template #default="scope">
                                <el-image style="width: 100px; height: 100px" :src="scope.row.identification" :fit="fit" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="applyTime" sortable label="申请时间" />
                        <el-table-column
                            prop="checkStatus"
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
                                v-if="scope.row.checkStatus == '已通过'"
                                :type="success"
                                disable-transitions
                                >已通过</el-tag>
                                <el-tag
                                v-if="scope.row.checkStatus =='未通过'"
                                :type="scope.row.checkStatus === '已通过' ? 'success' : 'danger'"
                                disable-transitions
                                >未通过</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="operation">
                                <el-button v-if="operation.row.result == null" :disabled="operation.row.checkStatus =='已通过'" link type="primary" size="small" @click="dialogFormVisible = true"
                                >审核</el-button>
                                <el-button v-if="operation.row.result != null" :disabled="operation.row.checkStatus =='已通过'" link type="primary" size="small" @click="dialogFormVisible = true"
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
                        <el-form :model="apply">
                        <el-form-item label="证件号码" label-width="70px">
                            <el-input disabled v-model="apply.idCard" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="证件照片" label-width="70px">
                            <el-image style="width: 100px; height: 100px" :src="apply.identification" :fit="fit" />
                        </el-form-item>
                        <el-form-item required v-if="display" label="结果" label-width="70px">
                            <el-input :disabled="apply.result != null" v-model="result" autocomplete="off" type="textarea" :rows="3"/>
                        </el-form-item>
                        <el-form-item required v-if="apply.result != null" label="结果" label-width="70px">
                            <el-input :disabled="apply.result != null" v-model="apply.result" autocomplete="off" type="textarea" :rows="3"/>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button :disabled="apply.result != null" v-if="!display" @click="display=true;">不通过</el-button>
                            <el-button v-if="display" @click="display=false;result=null;">返回</el-button>
                            <el-button v-if="display" @click="noPass">确认</el-button>
                            <el-button :disabled="apply.result != null" v-if="!display" type="primary" @click="pass">通过</el-button>
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
                "applyID": 1,
                "realName": "张三",
                "jobhunterID": 1,
                "applyTime": "2019-06-05 13:53:42",
                "idCard": "620403111122223333",
                "identification": "http://dummyimage.com/400x400",
                "checkStatus": "未通过",
                "checkTime": null,
                "result": null
            },
            {
                "applyID": 2,
                "realName": "李四",
                "jobhunterID": 2,
                "applyTime": "2003-04-20 03:17:12",
                "idCard": "620403111122223333",
                "identification": "http://dummyimage.com/400x400",
                "checkStatus": "未通过",
                "checkTime": null,
                "result": null
            }],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            result:null,
            apply:{
                "applyID": null,
                "applyTime": "2019-06-05 13:53:42",
                "checkStatus": "未通过",
                "result": null,
                "idCard": null,
                "identification": null,
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
                this.apply.applyID=value.applyID;
                this.apply.result=value.result;
                this.apply.checkStatus=value.checkStatus;
                this.apply.applyTime=value.applyTime;
                this.apply.idCard=value.idCard;
                this.apply.identification=value.identification;
                console.log(this.currentPubnot);
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