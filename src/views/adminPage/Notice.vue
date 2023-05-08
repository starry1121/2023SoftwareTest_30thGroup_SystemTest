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
                        <span class="title">公告列表</span>
                        <el-button class="button" color="#444076" @click="dialogFormVisible = true">上传公告</el-button>
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
                        <el-table-column
                            prop="status"
                            label="状态"
                            width="100"
                            :filters="[
                                { text: '未发布', value: '未发布' },
                                { text: '已发布', value: '已发布' },
                                { text: '已撤销', value: '已撤销' },
                            ]"
                            :filter-method="filterTag1"
                            filter-placement="bottom-end"
                        >
                            <template #default="scope">
                                <el-tag
                                    v-if="scope.row.status == '未发布'"
                                    disable-transitions
                                >未发布</el-tag>
                                <el-tag
                                    v-if="scope.row.status == '已发布'"
                                    type="success"
                                    disable-transitions
                                >已发布</el-tag>
                                <el-tag
                                    v-if="scope.row.status =='已撤销'"
                                    type="danger"
                                    disable-transitions
                                >已撤销</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="options">
                                <el-button v-if="options.row.status =='未发布'" link type="primary" size="small" @click="submit">发布</el-button>
                                <el-button v-if="options.row.status =='已发布'" link type="primary" size="small" @click="cancelPubnot">撤销</el-button>
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
                    <el-dialog v-model="dialogFormVisible" title="上传公告" align-center draggable>
                        <el-form :model="pubnot">
                        <el-form-item label="公告标题" label-width="70px">
                            <el-input v-model="pubnot.title" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="公告内容" label-width="70px">
                            <el-input v-model="pubnot.content" autocomplete="off" type="textarea" :rows="6"/>
                        </el-form-item>
                        <el-form-item label="公告封面" label-width="70px">
                            <el-image v-if="picDisplay" style="width: 300px; height: 150px"  fit="fit"/>
                            <el-image v-if="!picDisplay" style="width: 300px; height: 150px" :src="picUrlReview" :fit="fit" />
                        </el-form-item>
                        <el-form-item label="&emsp;" label-width="70px">
                            <el-upload class="upload"
                                :show-file-list=false
                                :name="'iFile'"
                                limit=1
                                accept=".jpg,.jpeg,.png,.gif"
                                :http-request="upload"
                                :on-remove="handleRemove"
                            >
                                <el-button color="#444076" class="btn" type="primary">上传封面</el-button>
                            </el-upload>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false;">取消</el-button>
                            <el-button type="primary" @click="addPubnot">确认</el-button>
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
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import COS from "cos-js-sdk-v5"
import {ref} from "vue"

var cos = new COS({
    SecretId: "AKIDGOL8fy1oLbeU9aom8E3d2E8tOffQxWzG",
    SecretKey: "7yZw63j9KTXP6f22xoVwFLOFsIkDVgdM",
})

export default {
    name: 'adminNotice',
    data() {
        return {
            picDisplay: true,
            page: 1,
            limit: 8,
            total: 6,
            pubnotList:[{}],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            pubnot:{},
            currentPubnot:{},
            uploadIcon:'https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/upload.png',
            picUrlReview:ref('https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/test.png'),
            picUrl:ref(''),
        }
    },
    methods: {
        cancel(){
            this.picDisplay=true;
        },
        upload(picture) {
            // 随机创建文件昵称
            var suffix = picture.file.name.substring(picture.file.name.lastIndexOf("."));
            var randomContent = Math.random().toString(36);
            var picName = randomContent + suffix;
            console.log(picName)
            cos.putObject({
                Bucket: 'jbgz-1312275634',
                Region: 'ap-shanghai', // 地区
                Key: picName, // 上传的文件名
                StorageClass: 'STANDARD',
                Body: picture.file, // 上传文件对象
            }, function (err, data) {
                console.log(err, data)
            })
            this.picUrl = 'https://jbgz-1312275634.cos.ap-shanghai.myqcloud.com/' + picName;
            console.log(this.picUrlReview)
            this.picDisplay=false;
            setTimeout(() => {
                this.picUrlReview = this.picUrl;
            },500)
        },
        handleRemove(){
            this.picDisplay=true;
        },
        handleCurrentChange(val){
            this.page=val
        },
        addPubnot(){
            if(this.pubnot.title==null||this.pubnot.content==null||this.picUrlReview==null){
                ElMessage({
                    message: "不能为空",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/admin/addNotice',
                data:{
                    adminId: localStorage.getItem('userId'),
                    title: this.pubnot.title,
                    content: this.pubnot.content,
                    imgURL: this.picUrlReview,
                    status: "未发布"
                }
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: "上传成功",
                        type: 'success',
                    })
                    this.picUrlReview==null;
                    this.$router.go(0);
                }else{
                    ElMessage({
                        message: "上传失败",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('上传失败')
            })
        },
        getCurrentRow(value){
            if(value!=null){
                console.log(value);
                this.currentPubnot=value;
                console.log(this.currentPubnot);
            }
        },
        deletePubnot(){
            this.$axios({
                method: 'delete',
                url: '/api/admin/deleteNotice/?noticeId='+this.currentPubnot.noticeId,
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: "删除成功",
                        type: 'success',
                    })
                    this.$router.go(0);
                }else{
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('操作失败')
            })
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
        },
        filterTag(value, row) {
            return row.status===value;
        },
        submit(){
            ElMessageBox.confirm(
                '确认发布公告?',
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
                    url: '/api/admin/releaseOrRepealNotice/?noticeId='+this.currentPubnot.noticeId+'&status=已发布',
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code==200){
                        ElMessage({
                            message: "发布成功",
                            type: 'success',
                        })
                        this.$router.go(0);
                    }else{
                        ElMessage({
                            message: "操作失败",
                            type: 'error',
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error('操作失败')
                })
            })
        },
        cancelPubnot(){
            ElMessageBox.confirm(
                '确认撤销公告?',
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
                    url: '/api/admin/releaseOrRepealNotice/?noticeId='+this.currentPubnot.noticeId+'&status=已撤销',
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code==200){
                        ElMessage({
                            message: "撤销成功",
                            type: 'success',
                        })
                        this.$router.go(0);
                    }else{
                        ElMessage({
                            message: "操作失败",
                            type: 'error',
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error('操作失败')
                })
            })
        },
    },
    created(){
        this.$axios({
            method: 'get',
            url: '/api/admin/getNoticeList',
        })
        .then(res => {
            if(res.data.code==200){
                this.pubnotList=res.data.data.notice_list;
                this.total=this.pubnotList.length;
                console.log('公告列表'+this.pubnotList);
            }
            else{
                this.pubnotList=null
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