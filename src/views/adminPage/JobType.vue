<template>
    <el-container>
        <el-aside width="15vw" style="background-color:#444076">
            <img class="logo" alt="logo" src="../../assets/logo.png">
            <el-menu
                class="el-menu"
                default-active="/admin/jobType"
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
                <!-- <el-menu-item index="/admin/notification">
                <template #title>
                    <el-icon><Bell /></el-icon>
                    <span class="menu-item1">系统通知</span>
                </template>
                </el-menu-item> -->
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
                        <span class="title">兼职类型</span>
                        <el-button class="button" color="#444076" @click="dialogFormVisible = true">添加兼职类型</el-button>
                    </div>
                    </template>
                    <el-table
                        :data="typeList.slice((page-1) * limit, page * limit)" 
                        style="width: 100%"
                        size="large"
                        height="430"
                        highlight-current-row
                        @current-change="getCurrentRow"
                    >
                        <el-table-column label="序号" type="index" width="80"/>
                        <el-table-column prop="typeId" label="类型ID" sortable/>
                        <el-table-column prop="typeName" label="类型名称"/>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default>
                                <el-button link type="primary" size="small" @click="dialogFormVisible1 = true"
                                >编辑</el-button
                                >
                                <el-button link type="primary" size="small" @click="confirmDeletePubnot">删除</el-button>
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
                    <el-dialog v-model="dialogFormVisible" title="添加兼职类型" align-center draggable>
                        <el-form :model="type">
                        <el-form-item label="类型名称" label-width="70px">
                            <el-input v-model="type.typeName" autocomplete="off" />
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false;">取消</el-button>
                            <el-button type="primary" @click="addType">
                            确认
                            </el-button>
                        </span>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="dialogFormVisible1" title="编辑兼职类型" align-center draggable>
                        <el-form :model="currentType">
                        <el-form-item
                            label="类型名称" 
                            label-width="80px"
                            :rules="{
                                required: true,
                                message: '请输入类型名称',
                                trigger: 'blur',
                            }"
                         >
                            <el-input v-model="currentType.typeName" autocomplete="off" />
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="editType">
                            确认
                            </el-button>
                        </span>
                        </template>
                    </el-dialog>
                </el-card>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import { ElMessageBox,ElMessage } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'

export default {
    name: 'adminNotice',
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            typeList:[{}],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            type:{
                typeName:null
            },
            currentType:{
                typeId:null,
                typeName:null
            },
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        addType(){
            if(this.type.typeName==null||this.type.typeName==''){
                ElMessage({
                    message: "不能为空！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/admin/addType?typeName='+this.type.typeName,
            })
            .then(res => {
                if(res.data.code==200){
                    if(res.data.message=='兼职类型已存在'){
                        ElMessage.error('兼职类型已存在')
                    }
                    else{
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        this.$router.go(0);
                    }
                }else{
                    ElMessage.error('添加失败')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('添加失败')
            })
        },
        getCurrentRow(value){
            if(value!=null){
                console.log(value);
                this.currentType.typeId=value.typeId;
                this.currentType.typeName=value.typeName;
            }
        },
        editType(){
            this.$axios({
                method: 'put',
                url: '/api/admin/changeType',
                params:{
                    typeId:this.currentType.typeId,
                    typeName:this.currentType.typeName
                }
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    this.$router.go(0);
                }else{
                    ElMessage.error('修改失败')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('修改失败')
            })
        },
        deleteType(){
            this.$axios({
                method: 'delete',
                url: '/api/admin/deleteType?typeId='+this.currentType.typeId,
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    })
                    this.$router.go(0);
                }else{
                    ElMessage.error('删除失败')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('删除失败')
            })
        },
        confirmDeletePubnot(){
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
                this.deleteType();
            })
        }
    },
    created(){
        this.$axios({
            method: 'get',
            url: '/api/admin/getJobTypeList',
        })
        .then(res => {
            this.typeList=res.data.data.jobtype_list;
            this.total=this.typeList.length;
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
    width: 100px;
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