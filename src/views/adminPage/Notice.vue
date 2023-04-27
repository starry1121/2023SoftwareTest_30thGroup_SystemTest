<template>
    <el-container>
        <el-aside width="15vw" style="background-color:#444076">
            <img class="logo" alt="logo" src="../../assets/logo.png">
            <el-menu
                class="el-menu"
                default-active="/admin/notice"
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
                        <span class="title">公告列表</span>
                        <el-button class="button" color="#444076" @click="dialogFormVisible = true">发布公告</el-button>
                    </div>
                    </template>
                    <el-table
                    :data="pubnotList.slice((page-1) * limit, page * limit)" 
                    style="width: 100%"
                    size="large"
                    height="430"
                    highlight-current-row
                    @current-change="getCurrentRow"
                    >
                        <el-table-column label="序号" type="index" width="60" />
                        <el-table-column prop="title" label="标题"/>
                        <el-table-column prop="content" label="内容"/>
                        <el-table-column label="公告封面">
                            <template #default="scope">
                                <el-image style="width: 100px; height: 100px" :src="scope.row.imgURL" :fit="fit" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="announceTime" sortable label="发布时间" />
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
                    <el-dialog v-model="dialogFormVisible" title="发布公告" align-center draggable>
                        <el-form :model="pubnot">
                        <el-form-item label="公告标题" label-width="70px">
                            <el-input v-model="pubnot.title" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="公告内容" label-width="70px">
                            <el-input v-model="pubnot.content" autocomplete="off" type="textarea" :rows="6"/>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false;">取消</el-button>
                            <el-button type="primary" @click="addPubnot">
                            确认
                            </el-button>
                        </span>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="dialogFormVisible1" title="编辑公告" align-center draggable>
                        <el-form :model="currentPubnot">
                        <el-form-item
                         label="公告标题" 
                         label-width="80px"
                         :rules="{
                            required: true,
                            message: '请输入公告标题',
                            trigger: 'blur',
                         }"
                         >
                            <el-input v-model="currentPubnot.title" autocomplete="off" />
                        </el-form-item>
                        <el-form-item 
                         label="公告内容" 
                         label-width="80px"
                         :rules="{
                            required: true,
                            message: '请输入公告内容',
                            trigger: 'blur',
                         }"
                         >
                            <el-input v-model="currentPubnot.content" autocomplete="off" type="textarea" :rows="6"/>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="editPubnot">
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
import { ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'

export default {
    name: 'adminNotice',
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            pubnotList:[{
                "noticeID": 1,
                "adminID": 1,
                "content": "这是公告内容",
                "status": "已发布",
                "announceTime": "2021-02-18 05:43:00",
                "title": "这是公告标题",
                "imgURL": "http://dummyimage.com/400x400"
            },
            {
                "noticeID": 2,
                "adminID": 2,
                "content": "这是公告内容",
                "status": "已发布",
                "announceTime": "1974-12-11 07:41:38",
                "title": "这是公告标题",
                "imgURL": "http://dummyimage.com/400x400"
            }],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            pubnot:{
                adminId: 1,
                pubnotTitle: "",
                pubnotContent: ""
            },
            currentPubnot:{
                id: 0,
                pubnotTitle: "",
                pubnotContent: ""
            },
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        addPubnot(){

        },
        getCurrentRow(value){
            if(value!=null){
                console.log(value);
                this.currentPubnot.noticeID=value.noticeID;
                this.currentPubnot.title=value.title;
                this.currentPubnot.content=value.content;
                console.log(this.currentPubnot);
            }
        },
        editPubnot(){

        },
        deletePubnot(){

        },
        confirmDeletePubnot(){
            ElMessageBox.confirm(
                '确认删除公告?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
                this.deletePubnot();
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