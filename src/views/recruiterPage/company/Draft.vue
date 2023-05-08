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
          <el-container>
            <el-header class="card_hd">
            <span class="word">兼职草稿</span>
            </el-header>
            
            <el-row justify="center" style="height:55vh">
                <el-card
                class="jobList"
                v-for="item in job_list.slice((page-1) * limit, page * limit)"
                :key="item.jobId">
                    <el-row class="item">
                    <el-col :span="18" class="content">
                        <h2 class="work_name">{{ item.workName }}</h2>
                        <p class="work_date">{{ item.startTime }} —— {{ item.endTime }}</p>
                        <p class="work_place">{{ item.workPlace }}</p>
                        <p class="job_type">{{item.jobType}}</p>
                    </el-col>
                    <el-col :span="3" style="display:flex;">
                        <p class="salary">{{ item.salary }}元/天</p>
                    </el-col>
                    <el-col :span="3">
                        <div>
                            <el-button color="#7A74C2" class="btn" type="primary"   @click="detail(item)">查看详情</el-button>
                        </div>
                        <div>
                            <el-button color="#7A74C2" class="btn" type="primary"   @click="edit(item)">重新编辑</el-button>
                        </div>
                        <div>
                            <el-button color="#7A74C2" class="btn" type="primary"   @click="deleteJob(item)">删除草稿</el-button>
                        </div>
                    </el-col>
                    </el-row>
                </el-card>
            </el-row>

            <el-footer>            
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
            </el-footer>
          </el-container>
        </el-col>
        </el-row>
        <el-dialog v-model="dialogFormVisible" title="兼职详情" align-center draggable>
          <el-scrollbar max-height="400px">
            <el-descriptions :column="2" size="large" border style="width:100%;">
              <el-descriptions-item :span="2" label="兼职名称">
                  {{ job.workName }}
              </el-descriptions-item>
              <el-descriptions-item label="招募人数">
                  {{ job.workerNum }}
              </el-descriptions-item>
              <el-descriptions-item label="兼职类型">
                  <el-tag size="small">{{ job.jobType }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="开始时间">{{ job.startTime }}</el-descriptions-item>
              <el-descriptions-item label="结束时间">{{ job.endTime }}</el-descriptions-item>
              <el-descriptions-item label="每日工作时间">{{ job.workTime }}</el-descriptions-item>
              <el-descriptions-item label="薪水">{{ job.salary }}</el-descriptions-item>
              <el-descriptions-item :span="2" label="地点">
                  {{ job.workPlace }}
              </el-descriptions-item>
              <el-descriptions-item :span="2" label="兼职详情">
                  {{ job.workDetails }}
              </el-descriptions-item>
            </el-descriptions>
          </el-scrollbar>

          <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible=false;">确认</el-button>
                <el-button type="primary" plain @click="upJob">发布</el-button>
            </span>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible1" title="编辑兼职" align-center draggable>
          <el-scrollbar max-height="400px" style="padding-right:40px">
            <el-row  justify="center">
                <el-form :model="jobEdit" :rules="rules" label-width="100px" style="width:55vw;">
                    <el-form-item label="兼职名称">
                        <el-input v-model="jobEdit.jobName" placeholder="请填写兼职名称" maxlength="20" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="兼职类型">
                        <el-col :span="24">
                            <el-select v-model="jobEdit.jobType" placeholder="请选择兼职类型" style="width: 100%">
                                <el-option v-for="item in typeList" :key="item" :label="item.typeName" :value="item.typeId" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="薪  水">
                        <el-input-number v-model="jobEdit.salary" :precision="2" :step="0.1" min="0"/>
                    </el-form-item>
                    <el-form-item label="兼职起始时间">
                      <el-input v-model="jobEdit.startTime" placeholder="请填写起始时间" maxlength="20" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="兼职结束时间">
                      <el-input v-model="jobEdit.endTime" placeholder="请填写结束时间" maxlength="20" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="每日时长">
                        <el-input-number v-model="jobEdit.workTime" max="24" min="0"/>
                    </el-form-item>
                    <el-form-item label="兼职地点">
                      <el-input v-model="jobEdit.workPlace" placeholder="请填写兼职地点"></el-input>
                    </el-form-item>
                    <el-form-item label="招募人数" prop="employeeNum">
                        <el-input-number v-model="jobEdit.employeeNum" :step="5"  min="1"/>
                    </el-form-item>
                    <el-form-item label="兼职详情" prop="workDetails">
                        <!-- 多行输入框 -->
                        <el-input v-model="jobEdit.workDetails" type="textarea" :rows="5" maxlength="480" show-word-limit
                            placeholder="请输入兼职详情" />
                    </el-form-item>
                </el-form>
            </el-row>
          </el-scrollbar>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible1=false;">取消</el-button>
              <el-button type="primary" plain @click="editJob">确认</el-button>
            </span>
          </template>
        </el-dialog>
    </div>
  </template>
  
  <script>
    import companyNav from '@/components/companyNav.vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import 'element-plus/es/components/message-box/style/index'
    import { BellFilled } from "@element-plus/icons-vue";

    export default {
    name: "jobhunterFavorites",
    data () {
    return {
        page: 1,
        limit: 2,
        total: 3,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        display:true,
        job_list: [{},],
        job:{},
        jobEdit:{
          jobName: null,
          jobType: null,
          workDetails: null,
          startTime: null,
          endTime: null,
          workTime: null,
          workPlace: null,
          salary: null,
          employeeNum: null,
          jobId: null,
        },
        typeList:[{}],
    }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        upJob(){
          ElMessageBox.confirm(
            '确认发布该兼职?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
          )
          .then(() => {
            this.$axios({
                method: 'post',
                url: '/api/recruiter/upJobDraft/?jobId='+this.job.jobId+'&jobState=未审核',
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "发布成功，请等待审核",
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
        detail(value){
            this.dialogFormVisible=true;
            this.display=false;
            this.job=value;
            // const myObject = this.typeList.find((obj) => obj.typeId === value.jobType);
            // this.job.jobType=myObject.typeName;
            for (let i = 0; i < this.typeList.length; i++) {
              const element = this.typeList[i];
              if (element.typeId == value.jobType) {
                this.job.jobType = element.typeName;
                break;
              }
            }
        },
        edit(value){
          this.dialogFormVisible1=true;
          this.jobEdit.jobId=value.jobId;
          this.jobEdit.jobName=value.workName;
          this.jobEdit.jobType=value.jobType;
          this.jobEdit.workDetails=value.workDetails;
          this.jobEdit.startTime=value.startTime;
          this.jobEdit.endTime=value.endTime;
          this.jobEdit.workTime=value.workTime;
          this.jobEdit.workPlace=value.workPlace;
          this.jobEdit.salary=value.salary;
          this.jobEdit.employeeNum=value.workerNum;
          for (let i = 0; i < this.typeList.length; i++) {
            const element = this.typeList[i];
            if (element.typeId == value.jobType) {
              this.jobEdit.jobType = element.typeName;
              break;
            }
          }
        },
        editJob(){
          for (let i = 0; i < this.typeList.length; i++) {
            const element = this.typeList[i];
            if (element.typeName == this.jobEdit.jobType) {
              this.jobEdit.jobType = element.typeId;
              break;
            }
          }
          ElMessageBox.confirm(
            '确认修改该兼职?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
          )
          .then(() => {
            this.$axios({
                method: 'post',
                url: '/api/recruiter/changeJobDraft',
                data: {
                  jobdata: this.jobEdit
                }
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
                        message: "操作失败",
                        type: 'error',
                    })
                    console.log("jobId"+this.jobEdit.jobId)
                    console.log("jobType"+this.jobEdit.jobType)
                    console.log("jobName"+this.jobEdit.jobName)
                    console.log("workDetails"+this.jobEdit.workDetails)
                    console.log("startTime"+this.jobEdit.startTime)
                    console.log("endTime"+this.jobEdit.endTime)
                    console.log("workTime"+this.jobEdit.workTime)
                    console.log("workPlace"+this.jobEdit.workPlace)
                    console.log("salary"+this.jobEdit.salary)
                    console.log("employeeNum"+this.jobEdit.employeeNum)
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
        deleteJob(value){
          ElMessageBox.confirm(
            '确认删除该草稿?',
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
                url: '/api/recruiter/deleteJobDraft/?jobId='+value.jobId,
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "删除成功",
                        type: 'success',
                    })
                    this.$router.go(0);
                }
                else{
                    ElMessage({
                        message: "操作失败",
                        type: 'error',
                    })
                    console.log("失败的job"+this.jobEdit.jobId)
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
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/recruiter/getJobDraftList/?recruiterId='+localStorage.getItem('userId'),
        })
        .then(res => {
          if(res.data.code==200){
              console.log(res.data.data);
              this.job_list=res.data.data.job_list;
              this.total=this.job_list.length;
          }
          else{
            this.job_list=null
          }
        })
        .catch(function (error) {
            console.log(error);
        })
        this.$axios({
            method: 'get',
            url: '/api/admin/getJobTypeList',
        })
        .then(res => {
            this.typeList=res.data.data.jobtype_list;
            console.log('标签列表'+this.typeList);
        })
        .catch(function (error) {
            console.log(error);
        })
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