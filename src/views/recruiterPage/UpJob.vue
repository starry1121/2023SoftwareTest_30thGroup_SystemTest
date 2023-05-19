<template>
    <div class="body">
        <el-row style="padding: 3vh 20vw;">
            <el-button icon="ArrowLeftBold" circle @click="goBack" />
            <span class="back">返回</span>
        </el-row>
        <div class="card">
            <el-row justify="center">
                <h2 style="color:#444076;margin-bottom:2vh;">发布兼职</h2>
            </el-row>
            <el-row justify="center">
                <el-form :model="ruleForm" :rules="rules" ref="ruleFormsss" label-width="100px" style="width:55vw;">
                    <el-form-item label="兼职名称" prop="jobName">
                        <el-input v-model="ruleForm.jobName" placeholder="请填写兼职名称" maxlength="20"
                            show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="兼职类型" prop="jobType">
                        <el-col :span="24">
                            <el-select v-model="ruleForm.jobType" placeholder="请选择兼职类型" style="width: 100%">
                                <el-option v-for="item in typeList" :key="item" :label="item.typeName"
                                    :value="item.typeId" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="薪  水" prop="salary">
                        <el-input-number v-model="ruleForm.salary" :precision="2" :step="0.1" min="0" />
                    </el-form-item>
                    <el-form-item label="兼职时间" prop="jobtime">
                        <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择起始时间"
                            format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
                        —
                        <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择结束时间"
                            format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
                        <el-form-item label="每日时长" prop="workTime">
                            <el-input-number v-model="ruleForm.workTime" max="24" min="0" />
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="兼职地点" prop="selectedOptions">
                        <el-col :span="24">
                            <el-cascader placeholder="请选择地区" style="border-radius:4px;" :options="options"
                                v-model="selectedOptions" @change="handleChange">
                            </el-cascader>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="详细地点">
                        <el-input v-model="place" placeholder="点击地图选择详细地点" style="width=80%;" disabled>
                            <!-- <img style="height: 30px;width: 30px;" src="..\..\assets\images\map.png" /> -->
                            <template #append>
                                <el-button @click="mapDialogVisible = true" class="mapButton">
                                    <img style="height: 30px;width: 30px;" class="mapImg" src="..\..\assets\images\map.png" />
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="招募人数" prop="employeeNum">
                        <el-input-number v-model="ruleForm.employeeNum" :step="5" min="1" />
                    </el-form-item>
                    <el-form-item label="兼职详情" prop="workDetails">
                        <!-- 多行输入框 -->
                        <el-input v-model="ruleForm.workDetails" type="textarea" :rows="5" maxlength="480" show-word-limit
                            placeholder="请输入兼职详情" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="upJob">发 布</el-button>
                        <el-button class="btn" @click="draftJob">存为草稿</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
        <el-dialog v-model="mapDialogVisible" title="选择地点" width="80%">
            <span>
                <div>
                    <GaodeMap></GaodeMap>
                </div>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="mapDialogVisible = false">
                        取消
                    </el-button>
                    <el-button type="primary" @click="mapDialogVisible = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div>
            <!-- <GaodeMap></GaodeMap> -->
        </div>


    </div>
</template>

<script>
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import GaodeMap from '@/components/GaodeMap.vue'


export default {
    name: 'UpJob',
    components: {
        GaodeMap,
    },
    data() {
        return {
            mapDialogVisible: false,
            recruiterId: null,
            typeList: [{}],
            addtions: "",
            options: regionDataPlus,
            selectedOptions: [],
            place: null,
            ruleForm: {
                jobName: null,
                jobType: null,
                startTime: null,
                endTime: null,
                workPlace: null,
                salary: null,
                employeeNum: null,
                workTime: null,
                workDetails: null
            },
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        // Responding to data changes
        handleChange(value) {
            this.selectedOptions = value
            console.log(this.selectedOptions)
            var name = ''
            this.selectedOptions.map(item => name += CodeToText[item] + '') //将省市区三个拼接一起
            this.addtions = name
            console.log(this.addtions)
            //运用了CodeToText把编码转成了中文
            // this.addForm.province = CodeToText[this.selectedOptions[0]]
            // this.addForm.county = CodeToText[this.selectedOptions[1]]
            // this.addForm.area = CodeToText[this.selectedOptions[2]]	
            // console.log(this.addForm)
        },
        upJob() {
            this.ruleForm.workPlace = this.addtions + this.place;
            this.$axios({
                method: 'post',
                url: '/api/job/upJob',
                data: {
                    recruiterId: this.recruiterId,
                    jobInfo: this.ruleForm,
                    ifRelease: true
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        ElMessage({
                            message: "操作成功",
                            type: 'success',
                        })
                        setTimeout(() => console.log(1), 2000)
                        this.$router.go(0)
                    }
                    else {
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
        },
        draftJob() {
            this.ruleForm.workPlace = this.addtions + this.place;
            this.$axios({
                method: 'post',
                url: '/api/job/upJob',
                data: {
                    recruiterId: this.recruiterId,
                    jobInfo: this.ruleForm,
                    ifRelease: false
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        ElMessage({
                            message: "操作成功",
                            type: 'success',
                        })
                        setTimeout(() => console.log(1), 2000)
                        this.$router.go(0)
                    }
                    else {
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
        this.recruiterId = localStorage.getItem('userId')
        this.$axios({
            method: 'get',
            url: '/api/admin/getJobTypeList',
        })
            .then(res => {
                this.typeList = res.data.data.jobtype_list;
            })
            .catch(function (error) {
                console.log(error);
            })
    },
}
</script>

<style scoped>
.body {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(255, 202, 166, 0.3);
}

.back {
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    color: #444076;
    font-weight: 600;
}

.card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    width: 60vw;
    margin: 0 auto;
    padding: 5vh 0px;
}

.btn {
    width: 5vw;
}

.mapButton{
    position:relative;
}
.mapImg{
    position: absolute;
    left: 1px;
    top: 0px;
    max-height: 95%;
    max-width: 100%;
}
</style>