<template>
    <div class="head">
        <div class="head_bg">
            <el-row justify="center" class="content">
                <el-col :span="14">
                    <el-row class="container">
                        <el-col class="form" :span="12" v-if="display">
                            <div class="form-box">
                                <h2 class="title">登录</h2>
                                <el-form :model="loginInfo" label-width="120px">
                                    <el-form-item class="input" label="账号">
                                        <el-input v-model="loginInfo.account" />
                                    </el-form-item>
                                    <el-form-item class="input" label="密码">
                                        <el-input v-model="loginInfo.password" show-password/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="btn" color="#444076" type="primary" @click="login">登录</el-button>
                                        <el-button class="btn" color="#444076" type="primary" @click="dialogFormVisible=true">找回密码</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="12" v-if="!display" class="con">
                            <div class="con-box">
                                <img class="img" alt="logo" src="../assets/logo.png">
                                <br>
                                <el-button class="btn" color="#FFCAA6" type="primary" @click='toLogin'>去登录</el-button>
                            </div>
                        </el-col>
                        <el-col :span="12" v-if="!display">
                            <div class="form-box">
                                <h2 class="title">注册</h2>
                                <el-form :model="register" label-width="120px">
                                    <el-form-item label="类型">
                                        <el-radio-group v-model="register.userType">
                                            <el-radio label="jobhunter">求职者</el-radio>
                                            <el-radio label="recruiter">招聘方</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item class="input" label="邮箱">
                                        <el-input v-model="email" @change="isRegisted"/>
                                    </el-form-item>
                                    <el-form-item class="input" label="验证码">
                                        <el-input
                                            v-model="confirmCaptcha"
                                            class="input-with-select"
                                            @change="isCaptcha"
                                        >
                                            <template #append>
                                                <el-button type="primary" color="#444076" @click="getCaptcha">获取验证码</el-button>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item class="input" label="密码">
                                        <el-input v-model="register.password" show-password/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="btn" color="#444076" type="primary" @click="signup">注册</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="12" v-if="display" class="con">
                            <div class="con-box">
                                <img class="img" alt="logo" src="../assets/logo.png">
                                <br>
                                <el-button class="btn" color="#FFCAA6" type="primary" @click='toSignup'>去注册</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-dialog v-model="dialogFormVisible" title="找回密码" align-center>
                <el-form :model="findPWD">
                <el-form-item label="邮箱&emsp;" :label-width="formLabelWidth">
                    <el-input v-model="findPWD.email" autocomplete="off" />
                </el-form-item>
                <el-form-item class="input" label="验证码">
                    <el-input
                        v-model="confirmCaptcha"
                        class="input-with-select"
                        @change="isCaptcha"
                    >
                        <template #append>
                            <el-button type="primary" color="#444076" @click="getfindPWDCaptcha">获取验证码</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="findPWD.password" autocomplete="off" show-password/>
                </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="findPassword">
                    确认
                    </el-button>
                </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export default {
    name: 'LogIn',
    components: {
    },
    data () {
        return {
            dialogFormVisible:false,
            display: true,
            form_style: '',
            isHidden: true,
            userId: 0,
            captcha:null,
            confirmCaptcha:null,
            email:null,
            loginInfo: {
                account: null,
                password: null,
            },
            register: {
                email:null,
                password:null,
                userType:"jobhunter"
            },
            findPWD:{
                email:null,
                password:null,
            }
        }
    },
    methods: {
        toSignup: function () {
            this.display=false;
        },
        toLogin: function () {
            this.display=true;
        },
        login(){
            if(this.loginInfo.account==null||this.loginInfo.password==null||this.loginInfo.account==''||this.loginInfo.password==''){
                ElMessage({
                    message: "不能为空!",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/login',
                data: this.loginInfo
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    localStorage.setItem('userId',res.data.data.userId);
                    localStorage.setItem('userType',res.data.data.userType);
                    ElMessage({
                        message: "登录成功",
                        type: 'success',
                    })
                    if(localStorage.getItem('userType')=='jobhunter'){
                        this.$router.push('/jobhunter')
                    }
                    if(localStorage.getItem('userType')=='admin'){
                        this.$router.push('/admin/personAuthentication')
                    }
                    if(localStorage.getItem('userType')=='recruiter'){
                        this.$router.push('/recruiter')
                    }
                }else{
                    ElMessage({
                        message: "登陆失败",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('登陆失败')
            })
        },
        isRegisted(){
            this.$axios({
                method: 'post',
                url: '/api/register/find',
                data:{
                    email:this.email
                },
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.register.email=this.email
                }else{
                    ElMessage({
                        message: "邮箱已注册！",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('邮箱校验失败！')
            })
        },
        getCaptcha(){
            if(this.register.email==null||this.register.email==''){
                ElMessage({
                    message: "请检查邮箱！",
                    type: 'error',
                })
                return;
            }
            else{
                this.$axios({
                    method: 'post',
                    url: '/api/register/email',
                    data:{
                        email:this.register.email
                    },
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code==200){
                        ElMessage({
                            message: '验证码已发送至您的邮箱！',
                            type: 'success',
                        })
                        this.captcha=res.data.data.captcha
                    }else{
                        ElMessage.error('获取验证码失败！')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error('获取验证码失败！')
                })
            }
        },
        getfindPWDCaptcha(){
            if(this.findPWD.email==null||this.findPWD.email==''){
                ElMessage({
                    message: "请检查邮箱！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/register/email',
                data:{
                    email:this.findPWD.email
                },
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: '验证码已发送至您的邮箱！',
                        type: 'success',
                    })
                    this.captcha=res.data.data.captcha
                }else{
                    ElMessage.error('获取验证码失败！')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('获取验证码失败！')
            })
        },
        isCaptcha(){//验证码是否正确，传captcha
            if(this.captcha!=this.confirmCaptcha){
                ElMessage({
                    message: "验证码不正确！",
                    type: 'error',
                })
            }
        },
        signup(){
            if(this.register.email==null||this.register.email==''){
                ElMessage({
                    message: "请检查邮箱！",
                    type: 'error',
                })
                return;
            }
            if(this.register.userType==null||this.register.userType==''){
                ElMessage({
                    message: "请选择用户类型！",
                    type: 'error',
                })
                return;
            }
            if(this.captcha!=this.confirmCaptcha){
                ElMessage({
                    message: "验证码不正确！",
                    type: 'error',
                })
                return;
            }
            if(this.register.password==null||this.register.password==''){
                ElMessage({
                    message: "请填写密码！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/register',
                data: this.register
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: "注册成功！",
                        type: 'success',
                    })
                    this.$router.go(0)
                }else{
                    ElMessage({
                        message: "注册失败！",
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('注册失败！')
            })
        },
        findPassword(){
            if(this.findPWD.email==null||this.findPWD.email==''){
                ElMessage({
                    message: "请检查邮箱！",
                    type: 'error',
                })
                return;
            }
            if(this.confirmCaptcha==null||this.confirmCaptcha==''){
                ElMessage({
                    message: "验证码不正确！",
                    type: 'error',
                })
                return;
            }
            if(this.findPWD.password==null||this.findPWD.password==''){
                ElMessage({
                    message: "请填写密码！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/findPassword',
                data: this.findPWD
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: '成功修改密码！',
                        type: 'success',
                    })
                    setTimeout(() => console.log(1), 2000)
                    this.$router.go(0)
                }else{
                    ElMessage.error('修改密码失败！')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('修改密码失败！')
            })
        }
    },
}
</script>

<style scoped>
.head{
    background-image: url("../assets/bg.svg");
    height: 762px;
    background-size:cover;
    background-position:center center;
}
.head_bg{
    text-align: center;
    padding-top: 15vh;
}
/* .head_bg .logo{
    margin-top: 6vh;
    display: inline;
    width: 600px;
    transition: all .2s linear;
    vertical-align: middle;
}
.head_bg .logo:hover{
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
} */
.content{
    align-items: center;
}
.container {
    background: #444076;
    width: 60vw;
    height: 70vh;
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.1);
}
.input{
    width: 25vw;
    
}
.form{
    height: 100%;
    display: flex;
    align-items: center;
}
.form-box{
    background-color: #fff;
    height: 100%;
    border-radius: 20px;
    width: 100%;
}
.form-box .title{
    padding-top: 100px;
    padding-bottom: 60px;
    padding-left: 20px;
    color: #444076;
    font-size: 30px;
}
.form-box .btn{
    margin: 2vh 4vw;
    font-weight: 600;
    width: 8vw;
    border-radius: 10px;
}
.con{
    height: 100%;
    display: flex;
    align-items: center;
}
.con-box{
    margin: 0 auto;
}
.con-box .text{
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    margin: 30px 0px;
}
.con-box .btn{
    color: #444076;
    font-weight: 600;
    margin: 30px 0px;
}

</style>
