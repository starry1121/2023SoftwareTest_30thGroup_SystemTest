describe('兼职管理子系统-举报兼职', () => {
    it('举报兼职', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10028")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("666")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        // cy.url().should('contain', 'jobhunter')
        // //断言
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(500)
        cy.get('.el-pager > :nth-child(8)').click()
        // 17页
        cy.wait(500)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        // 点击“查看详情”
        cy.url().should('contain', 'jobDetail')
        //断言
        cy.wait(500)
        cy.get('.el-button--danger').click()
        //点击举报兼职
        cy.wait(500)
        cy.get('#ReportReason').type("该兼职地址信息不正确")
       //填写举报理由
       cy.wait(500)
       cy.get('.dialog-footer > :nth-child(1)').click()
      //点击确定
        cy.url().should('contain', 'jobDetail')
        //断言
    })
})