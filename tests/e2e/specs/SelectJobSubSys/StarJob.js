describe('选择兼职子系统-收藏兼职', () => {
    it('收藏兼职', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1500)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        //点击“查看详情”
        cy.wait(500)
        // cy.get('.el-button--primary > span > .el-icon > svg')
        cy.get('.el-button--warning').click()
        //点击收藏兼职
        cy.wait(500)
        cy.get('.el-input__wrapper').click()
        //点击收藏夹选择框
        cy.wait(500)
        cy.get('.el-scrollbar__view > :nth-child(3)').click()
        //点击选择测试收藏夹
        cy.wait(500)
        cy.get('.dialog-footer > :nth-child(1)').click()
        //点击确认
        cy.url().should('contain', 'jobDetail')
        //断言
    })
    it('取消收藏兼职', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1500)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        //点击“查看详情”
        cy.url().should('contain', 'jobDetail')
        cy.wait(500)
        cy.get('.el-button--warning').click()
        //点击取消收藏兼职
        cy.wait(500)
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.url().should('contain', 'jobDetail')
        //断言

        

    })
})