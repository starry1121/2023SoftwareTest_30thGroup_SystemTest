describe('选择兼职子系统-查看兼职详情', () => {
    it('查看兼职详情', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        //点击“查看详情”
        cy.url().should('contain', 'jobDetail')
        cy.wait(500)
    })
})