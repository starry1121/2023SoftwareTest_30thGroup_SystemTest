// https://docs.cypress.io/api/table-of-contents

describe('兼职订单子系统-求职者', () => {
    it('查看兼职订单', () => {
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
        cy.wait(200)
        //跳转到兼职订单页
        cy.get('#tab-已完成').click()
        //筛选已完成的订单
        cy.wait(2000)
        cy.get('button.el-button').find('i.el-icon').filter(':visible').first().click();
        //查看兼职详情
        cy.url().should('contain','/jobhunter/jobDetail')
        //断言
    })

    it('接受录用', () => {
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
        cy.wait(500)
        cy.get('#tab-已通过').click()
        //筛选已通过的订单
        cy.wait(2000)
        cy.get('button.el-button').filter(':contains("接受录用")').filter(':visible').eq(1).click();
        //点击接受录用
        cy.get('.el-button--primary').click()
        //点击确认
        cy.contains('p', '已接受该录用').should('exist');
        //断言
    })

    it('放弃录用', () => {
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
        cy.wait(500)
        cy.get('#tab-已通过').click()
        //筛选已通过的订单
        cy.wait(2000)
        cy.get('button.el-button').filter(':contains("放弃录用")').filter(':visible').eq(1).click();
        //点击放弃录用
        cy.get('.el-button--primary').click()
        //点击确认
        cy.contains('p', '已放弃该录用').should('exist');
        //断言
    })
})