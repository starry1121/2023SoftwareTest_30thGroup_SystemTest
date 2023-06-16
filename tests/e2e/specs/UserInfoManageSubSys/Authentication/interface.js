// https://docs.cypress.io/api/table-of-contents

describe('用户信息管理子系统-用户点击实名认证/企业认证', () => {
    it('显示界面', () => {
        //求职者已提交实名认证申请，状态为“已通过”，个人中心-实名认证显示申请详情
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至实名认证界面
        cy.get('.el-tag__content').should('contain', '已通过');
        //断言

        //求职者已提交实名认证申请，状态为“未审核”，个人中心-实名认证显示申请详情
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10070")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至实名认证界面
        cy.get('.el-tag__content').should('contain', '未审核');
        //断言

        //求职者未提交实名认证申请，个人中心-实名认证显示空状态和申请按钮
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10071")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至实名认证界面
        cy.get('.el-empty__description > p').should('contain', '您还未申请实名认证')
        cy.get('.el-header > .el-button').should('contain', '申请')
        //断言

        //求职者提交的实名认证申请状态为“未通过”，个人中心-实名认证显示申请详情和申请按钮
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10052")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至实名认证界面
        cy.get('.el-tag__content').should('contain', '未通过');
        cy.get('.el-header > .el-button').should('contain', '申请')
        //断言

        //招聘方已提交企业认证申请，状态为“已通过”，企业中心-企业认证显示申请详情
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/recruiter/company"]').click()
        //跳转至企业中心-企业信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至企业认证界面
        cy.get('.el-tag__content').should('contain', '已通过');
        //断言

        //招聘方已提交企业认证申请，状态为“未审核”，企业中心-企业认证显示申请详情
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10073")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/recruiter/company"]').click()
        //跳转至企业中心-企业信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至企业认证界面
        cy.get('.el-tag__content').should('contain', '未审核');
        //断言

        //招聘方未提交企业认证申请，企业中心-企业认证显示空状态和申请按钮
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10074")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/recruiter/company"]').click()
        //跳转至企业中心-企业信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至企业认证界面
        cy.get('.el-empty__description > p').should('contain', '您还未申请企业认证')
        cy.get('.el-header > .el-button').should('contain', '申请')
        //断言

        //招聘方提交的企业认证申请状态为“未通过”，企业中心-企业认证显示申请详情和申请按钮
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10075")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/recruiter/company"]').click()
        //跳转至企业中心-企业信息页面
        cy.get('.el-menu > :nth-child(2)').click()
        //跳转至企业认证界面
        cy.get('.el-tag__content').should('contain', '未通过');
        cy.get('.el-header > .el-button').should('contain', '申请')
        //断言
    })
})