// https://docs.cypress.io/api/table-of-contents

describe('用户信息管理子系统-编辑信息', () => {
    it('求职者编辑个人信息', () => {
        //求职者登录
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-header > .el-button').click()
        //点击编辑按钮
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__wrapper').clear()
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__wrapper').type("starry")
        // 输入用户名：“starry”；
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__wrapper').clear()
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__wrapper').type("2002-11-21")
        cy.get('.word').click()
        cy.wait(500)
        // 输入生日：“2002-11-21”；
        cy.get(':nth-child(6) > .el-form-item__content > .el-input > .el-input__wrapper > .el-input__inner').clear()
        cy.get(':nth-child(6) > .el-form-item__content > .el-input > .el-input__wrapper > .el-input__inner').type("黄渡理工大学")
        // 输入学历：“黄渡理工大学”；
        cy.get(':nth-child(7) > .el-form-item__content > .el-input > .el-input__wrapper > .el-input__inner').clear()
        cy.get(':nth-child(7) > .el-form-item__content > .el-input > .el-input__wrapper > .el-input__inner').type("15379982023")
        // 输入联系方式：“15379982023”；
        cy.get(':nth-child(8) > .el-form-item__content > .el-textarea > .el-textarea__inner').clear()
        cy.get(':nth-child(8) > .el-form-item__content > .el-textarea > .el-textarea__inner').type("你好，我是一名大学生")
        // 输入个人简介：“你好，我是一名大学生”；
        cy.get('.el-form-item__content > .el-button--primary').click()
        //点击保存按钮
        cy.get('#message_2').should('contain', '修改成功');
        //断言
    })
    it('招聘方编辑企业信息', () => {
        //求职者登录
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/recruiter/company"]').click()
        //跳转至企业中心-企业信息页面
        cy.get('.el-header > .el-button').click()
        //点击编辑按钮
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__wrapper').clear()
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__wrapper').type("Boaibai")
        // 输入用户名：“Boaibai”；
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__wrapper').clear()
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__wrapper').type("四川爱慕聚优网络技术有限公司")
        cy.get('.word').click()
        cy.wait(500)
        // 输入企业名称：“四川爱慕聚优网络技术有限公司”；
        cy.get(':nth-child(6) > .el-form-item__content > .el-input > .el-input__wrapper > .el-input__inner').clear()
        cy.get(':nth-child(6) > .el-form-item__content > .el-input > .el-input__wrapper > .el-input__inner').type("15379982000")
        // 输入联系方式：“15379982000”；
        cy.get(':nth-child(7) > .el-form-item__content > .el-textarea > .el-textarea__inner').clear()
        cy.get(':nth-child(7) > .el-form-item__content > .el-textarea > .el-textarea__inner').type("你好，这里是四川爱慕聚优网络技术有限公司")
        // 输入企业简介：“你好，这里是四川爱慕聚优网络技术有限公司”；
        cy.get('.el-form-item__content > .el-button--primary').click()
        //点击保存按钮
        cy.get('#message_2').should('contain', '修改成功');
        //断言


    })
})