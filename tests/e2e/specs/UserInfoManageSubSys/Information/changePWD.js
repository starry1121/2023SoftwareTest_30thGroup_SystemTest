// https://docs.cypress.io/api/table-of-contents

describe('用户信息管理子系统-用户修改密码', () => {
    it('求职者修改密码', () => {
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
        cy.get('.el-col-8 > :nth-child(3)').click()
        //点击修改密码按钮
        cy.wait(200)
        cy.get('.el-input-group__append > .el-button').click()
        //点击获取验证码按钮
        cy.get('#message_2').should('contain', '验证码已发送至您的邮箱');
        //断言
    })
    it('招聘方修改密码', () => {
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
        cy.get('.el-col-8 > :nth-child(3)').click()
        //点击修改密码按钮
        cy.wait(200)
        cy.get('.el-input-group__append > .el-button').click()
        //点击获取验证码按钮
        cy.get('#message_2').should('contain', '验证码已发送至您的邮箱');
        //断言
    })
})