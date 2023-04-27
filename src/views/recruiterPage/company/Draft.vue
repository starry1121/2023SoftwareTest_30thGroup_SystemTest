<template>
    <companyNav/>
    <div class="bg">
        <br>
        <br>
        <el-row class="content">
        <el-col :span="3" :offset="3">
            <el-menu class="sidebar"
                default-active="/recruiter/draft"
                router=true
                active-text-color="#FFCAA6"
                background-color="#444076"
                text-color="#fff"
                @open="handleOpen"
                @close="handleClose"
                >
                <el-menu-item index="/recruiter/company">
                    <p style="margin: 0 auto;">
                    <el-icon><User/></el-icon>
                    <span>企业信息</span>
                    </p>
                </el-menu-item>
                <el-menu-item index="/recruiter/authen">
                    <p style="margin: 0 auto;">
                    <el-icon><Postcard/></el-icon>
                    <span>企业认证</span>
                    </p>
                </el-menu-item>
                <el-menu-item index="/recruiter/draft">
                    <p style="margin: 0 auto;">
                    <el-icon><Document/></el-icon>
                    <span>兼职草稿</span>
                    </p>
                </el-menu-item>
                <el-menu-item index="/recruiter/message">
                    <p style="margin: 0 auto;">
                    <el-icon><BellFilled/></el-icon>
                    <span>消息通知</span>
                    </p>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="15" class="card">
            <el-header class="card_hd">
            <span class="word">兼职草稿</span>
            </el-header>
            <el-row justify="center">
                <el-card 
                class="jobList"
                v-for="item in job_list.slice((page-1) * limit, page * limit)"
                :key="item.jobId">
                    <el-row class="item">
                    <el-col :span="18" class="content">
                        <h2 class="work_name">{{ item.workName }}</h2>
                        <p class="work_date">{{ item.startTime }}-{{ item.endTime }}</p>
                        <p class="work_place">{{ item.workPlace }}</p>
                        <p class="job_type">{{item.jobType}}</p>
                    </el-col>
                    <el-col :span="3" style="display:flex;">
                        <p class="salary">{{ item.salary }}元/天</p>
                    </el-col>
                    <el-col :span="3">
                        <div style="margin-top:20px;">
                            <el-button color="#7A74C2" class="btn" type="primary"   @click="detail(item)">查看详情</el-button>
                        </div>
                        <div>
                            <el-button color="#7A74C2" class="btn" type="primary"   @click="dialogFormVisible=true;">重新编辑</el-button>
                        </div>
                    </el-col>
                    </el-row>
                </el-card>
                <el-row>
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
            </el-row>

    
        </el-col>
        </el-row>
        <el-dialog v-model="dialogFormVisible" title="兼职详情" align-center draggable>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible=false;">取消</el-button>
                <el-button @click="apply">确认</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
  </template>
  
  <script>
    import companyNav from '@/components/companyNav.vue'
    import { ElMessage } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import { BellFilled } from "@element-plus/icons-vue";
    export default {
    name: "jobhunterFavorites",
    data () {
    return {
        page: 1,
        limit: 2,
        total: 3,
        dialogFormVisible:false,
        display:true,
        job_list: [
            {
                "jobId": 45,
                "recruiterId": 36,
                "workName": "省价共住",
                "workDetails": "sit dolor consectetur velit enim",
                "startTime": "1974-02-24 08:47:53",
                "endTime": "2017-07-03 23:29:16",
                "jobType": "市场推广",
                "workPlace": "Ut qui anim",
                "workPlaceDetail": "non cillum magna aliqua",
                "salary": 12,
                "releaseTime": "1988-04-01 22:36:16",
                "jobState": "et magna",
                "workTime": "1972-05-27 02:27:47"
            },
            {
                "jobId": 13,
                "recruiterId": 24,
                "workName": "务写感",
                "workDetails": "officia laborum",
                "startTime": "1991-09-29 13:39:24",
                "endTime": "1996-05-26 17:51:59",
                "jobType": "市场推广",
                "workPlace": "ipsum sed labore",
                "workPlaceDetail": "cupidatat sed irure dolore pariatur",
                "salary": 98,
                "releaseTime": "2003-01-17 16:13:25",
                "jobState": "reprehenderit in adipisicing irure commodo",
                "workTime": "2015-05-15 10:23:39"
            }
        ],
        job:{},
    }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        apply(){
            if(this.appeal.appealContent==null||this.appeal.appealType==null){
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
        detail(value){
            this.dialogFormVisible=true;
            this.display=false;
            this.job=value;
        },
    },
    created() {
        // this.$axios({
        //     method: 'get',
        //     url: ''+localStorage.getItem('userId'),
        // })
        // .then(res => {
          // if(resizeBy.data.code==200){
          //     console.log(res.data.data);
          //     this.authen=res.data.data.personauthen_list[0];
          // }
          // else{
          //   this.authen=null
          // }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
    },
    components: {
        companyNav,
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

  .jobList{
    width:85%;
    height: 20vh;
    margin-top: 50px;
  }
  .item{
    vertical-align: middle;
  }
  .item .work_name{
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #444076;
    overflow: hidden;
  }
  .item .work_date{
    height: 25px;
    line-height: 30px;
    color: rgb(122, 116, 194);
  }
  .item .work_place{
    font-size: 14px;
    color: rgba(51, 51, 51, 0.6);
    height: 30px;
    line-height: 30px;
  }
  .item .job_type{
    text-align: center;
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #444076;
    background-color: #FFCAA6;
    border-radius: 10px;
    font-size: 14px;
  }
  .item .salary{
    color: #fbb485;
    font-weight: 600;
    margin-top: 6vh;
  }
  .item .btn{
    color: #fff;
    font-weight: 600;
    margin-top: 4px;
  }

  .pagination{
    --el-color-primary: #444076;
    display: block;
    margin: 0px auto;
    margin-top: 20px;
  }
  .el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #444076;
    --el-pagination-button-disabled-bg-color:#fff;
    --el-pagination-button-bg-color:#fff;
    --el-pagination-hover-color: #444076;
  }
</style>