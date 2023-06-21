// https://docs.cypress.io/api/table-of-contents

describe('兼职订单子系统-求职者', () => {
    it('对自己收到的不合理的评价提出申诉', () => {

        //申诉理由为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(4)').click()
        //跳转到兼职订单页
        cy.wait(200)
        cy.get('#tab-已完成').click()
        //筛选已完成的订单
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("申诉")').filter(':visible').first().click();      
        //点击申诉按钮
        cy.get('.el-textarea__inner').clear()
        cy.get('.dialog-footer > :nth-child(2)').click()
        //点击确认
        cy.contains('p', '不能为空').should('exist');
        //断言

        //用户未提交申诉，或者提交的申诉状态为未通过
        cy.get('.el-textarea__inner').clear()
        cy.get('.el-textarea__inner').type("打分不合理")
        cy.get('.dialog-footer > :nth-child(2)').click()
        //点击确认
        cy.contains('p', '已提交申诉').should('exist');
        //断言

        //用户已提交申诉，状态为审核中
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("申诉")').filter(':visible').first().click();   
        //点击申诉按钮
        cy.get('.el-textarea__inner').clear()
        cy.get('.el-textarea__inner').type("打分不合理")
        cy.get('.dialog-footer > :nth-child(2)').click()
        //点击确认
        cy.contains('p', '您的申诉审核中').should('exist');
        //断言

        //管理员驳回申诉
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(500)
        cy.get('.el-menu--vertical > :nth-child(2)').click()
        //点击订单申诉
        cy.wait(500)
        cy.get('button.el-button').filter(':contains("审核")').filter(':visible').first().click();
        //点击审核
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("驳回")').filter(':visible').first().click();
        //点击驳回
        cy.wait(500)
        cy.get('.el-textarea__inner').filter(':visible').clear()
        cy.get('.el-textarea__inner').filter(':visible').type("已处理")
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '已驳回该申诉').should('exist');
        //断言
    })
})