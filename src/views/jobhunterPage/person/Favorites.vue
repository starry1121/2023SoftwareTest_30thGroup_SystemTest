<template>
    <personNav/>
    <div class="bg">
        <br>
        <br>
        <el-row class="content">
        <el-col :span="3" :offset="3">
            <el-menu class="sidebar"
            default-active="/jobhunter/favorites"
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
            <span class="word">我的收藏</span>
            <el-button class="btn" color="#444076" @click="dialogFormVisible=true;">添加收藏夹</el-button>
            </el-header>
            <el-row justify="center">
                <el-table
                    :data="favorites_list.slice((page-1) * limit, page * limit)" 
                    style="width: 80%;margin-top: 30px;"
                    size="large"
                    height="397"
                    highlight-current-row
                    @current-change="getCurrentRow"
                >
                    <el-table-column prop="favoritesDirName" label="收藏夹名称"/>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template #default="operation">
                            <el-button type="primary" plain size="small" @click="dialogFormVisible1=true;" circle><el-icon><Edit /></el-icon></el-button>
                            <el-button type="danger" plain size="small" @click="deleteFavoritesDir(operation.row.favoritesDirId)" circle><el-icon><Delete /></el-icon></el-button>
                            <el-button type="success" plain size="small" @click="dialogFormVisible2=true;" circle><el-icon><More /></el-icon></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
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
            <el-empty style="height:478px;" v-if="favorites_list==null" description="您还未收藏审核兼职" />
    
            <!-- 添加收藏夹 -->
            <el-dialog style="width:30%" v-model="dialogFormVisible" title="添加收藏夹" align-center draggable>
                <el-input v-model="favoritesDirName" autocomplete="off"  placeholder="请填写收藏夹名称"/>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="danger" plain @click="dialogFormVisible=false;">取消</el-button>
                        <el-button type="primary" plain @click="addFavoritesDir">确认</el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 重命名收藏夹 -->
            <el-dialog style="width:30%" v-model="dialogFormVisible1" title="重命名收藏夹" align-center draggable>
                <el-input v-model="favorites.favoritesDirName" autocomplete="off"  placeholder="请填写收藏夹名称"/>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="danger" plain @click="dialogFormVisible1=false;">取消</el-button>
                        <el-button type="primary" plain @click="renameFavoritesDir">确认</el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 收藏夹详情 -->
            <el-dialog style="width:50%" v-model="dialogFormVisible2" title="收藏夹详情" align-center draggable>
                <el-row justify="center">
                    <el-scrollbar max-height="400px" style="width:90%">
                        <div v-for="i in favorites.favorites" :key="i">
                            <el-row  v-if="i!=null" class="dir">
                                <el-col :span="21">
                                    <el-row style="font-size:16px;color:#444076;font-weight: 600;">
                                        {{ i.workName }}
                                    </el-row>
                                    <el-row style="font-size:14px;color:grey;">
                                        {{ i.workPlace }}
                                    </el-row>
                                    <el-row>
                                        {{ i.startTime }} —— {{ i.endTime }}&emsp;每日时长：{{ i.workTime }}小时
                                    </el-row>
                                </el-col>
                                <el-col :span="3" class="btnFather">
                                    <el-button color="#444076" size="small" class="btn" icon="ArrowRightBold" circle></el-button>
                                </el-col>
                            </el-row>
                            <el-button type="danger" plain @click="cancelCollect(i.jobId)" size="small">取消收藏</el-button>
                            <el-button type="primary" plain @click="moveCollect(i.jobId)" size="small">移动收藏</el-button>
                            <el-divider>
                                <el-icon><star-filled /></el-icon>
                            </el-divider>
                        </div>
                    </el-scrollbar>
                </el-row>
            </el-dialog>

            <el-dialog v-model="dialogFormVisible3" title="移动收藏" align-center>
            <span style="font-size:16px;">请选择收藏夹：</span>
            <el-select v-model="collectPosition" placeholder="Select" clearable >
                <el-option
                    v-for="item in favorites_list"
                    :key="item.favoritesDirId"
                    :label="item.favoritesDirName"
                    :value="item.favoritesDirId"
                />
            </el-select>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="moveCollect1">
                    确认
                </el-button>
                <el-button type="primary" @click="dialogFormVisible3=false">
                    取消
                </el-button>
            </span>
            </template>
        </el-dialog>
    
        </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
  import personNav from '@/components/personNav.vue'
  import { ElMessage,ElMessageBox } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import 'element-plus/es/components/message-box/style/index'
  
    export default {
    name: "jobhunterFavorites",
    data () {
    return {
        collectPosition:null,
        favorites_list: [{}],
        favoritesDirName:null,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        page: 1,
        limit: 7,
        total: 6,
        favorites:{},
        jobId:null,
    }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        getCurrentRow(value){
            if(value!=null){
                this.favorites=value;
                console.log(this.favorites);
            }
        },
        apply(){
            if(this.authenApply.idcard==null||this.authenApply.realName==null){
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
        addFavoritesDir(){
            if(this.favoritesDirName==""||this.favoritesDirName==null){
                ElMessage({
                    message: "收藏夹名称不能为空",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/jobhunter/addFavoritesDir/?jobhunterId='+localStorage.getItem('userId')+'&favoritesDirName='+this.favoritesDirName,
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "添加成功",
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
        deleteFavoritesDir(Id){
            ElMessageBox.confirm(
                '确认删除该收藏夹?该收藏夹下的所有兼职将被删除！',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
                this.$axios({
                    method: 'delete',
                    url: '/api/jobhunter/removeFavoritesDir/?jobhunterId='+localStorage.getItem('userId')+'&favoritesDirId='+Id,
                })
                .then(res => {
                    if(res.data.code==200){
                        ElMessage({
                            message: "已删除该收藏夹",
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
        renameFavoritesDir(){
            if(this.favorites.favoritesDirName==""||this.favorites.favoritesDirName==null){
                ElMessage({
                    message: "收藏夹名称不能为空",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'put',
                url: '/api/jobhunter/renameFavoritesDir/?jobhunterId='+localStorage.getItem('userId')+'&favoritesDirName='+this.favorites.favoritesDirName+'&favoritesDirId='+this.favorites.favoritesDirId,
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "修改成功",
                        type: 'success',
                    })
                    this.$router.go(0);
                }
                else{
                    ElMessage({
                        message: "修改失败",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        cancelCollect(Id){
            ElMessageBox.confirm(
                '确认取消收藏？',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
            .then(() => {
                this.$axios({
                    method: 'delete',
                    url: '/api/jobhunter/cancelCollect/?jobhunterId='+localStorage.getItem('userId')+'&jobId='+Id,
                })
                .then(res => {
                    if(res.data.code==200){
                        ElMessage({
                            message: "已取消该收藏",
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
        moveCollect(Id){
            this.jobId=Id;
            this.dialogFormVisible3=true;
        },
        moveCollect1(){
            if(this.collectPosition==null||this.collectPosition==''){
                ElMessage({
                    message: "请选择收藏夹！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'put',
                url: '/api/jobhunter/moveCollect',
                data: {
                    jobhunterId: localStorage.getItem('userId'),
                    jobId: this.jobId,
                    collectPosition: this.collectPosition
                }
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: "移动成功",
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
        }
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/jobhunter/favorites/?jobhunterId='+localStorage.getItem('userId'),
        })
        .then(res => {
            if(res.data.code==200){
                this.favorites_list=res.data.data.favorites_list;
                this.total=this.favorites_list.length;
                console.log('收藏夹列表'+this.favorites_list[1].favorites.favorites_list[0].jobId);
            }
            else{
                this.favorites_list=null
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    components: {
        personNav,
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
  .card_hd .btn{
        color: #fff;
        height: 30px;
        width: 100px;
        position: relative; 
        left: 73%;
        top: -15%;
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