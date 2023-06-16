// https://docs.cypress.io/api/table-of-contents

describe('用户信息管理子系统-用户提交认证申请', () => {
    it('提交异常', () => {

        //前提：求职者未提交实名认证申请，或者提交的实名认证申请状态为“未通过”，个人中心-实名认证显示申请按钮
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10028")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至实名认证界面
        cy.get('.el-header > .el-button').should('contain', '申请')
        //断言
        cy.get('.el-header > .el-button').click()
        //点击申请按钮
        cy.get('.dialog-footer > :nth-child(1)').click()
        //点击确认
        cy.contains('p', '不能为空').should('exist');
        //断言

        //前提：招聘方未提交企业认证申请，或者提交的企业认证申请状态为“未通过”，企业中心-企业认证显示申请按钮
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10023")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/recruiter/company"]').click()
        //跳转至企业中心-企业信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至企业认证界面
        cy.get('.el-header > .el-button').should('contain', '申请')
        //断言
        cy.get('.el-header > .el-button').click()
        //点击申请按钮
        cy.get('.dialog-footer > :nth-child(1)').click()
        //点击确认
        cy.contains('p', '不能为空').should('exist');
        //断言
    })
})