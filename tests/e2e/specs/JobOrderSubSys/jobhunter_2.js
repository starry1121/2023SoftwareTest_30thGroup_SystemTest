// https://docs.cypress.io/api/table-of-contents

describe('兼职订单子系统-求职者', () => {
    it('对招聘方打分', () => {
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
        cy.get('button.el-button').filter(':contains("评分")').filter(':visible').first().click();  
        //点击评分按钮
        cy.get('#scoreValue > :nth-child(5)').click()
        //评分
        cy.get('.dialog-footer > :nth-child(2)').click()
        //确认
        cy.contains('p', '打分成功').should('exist');
        //断言
    })
})