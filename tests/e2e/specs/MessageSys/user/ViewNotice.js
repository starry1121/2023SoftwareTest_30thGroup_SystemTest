describe('消息通知子系统-查看公告', () => {
    it('查看公告', () => {
      //求职者登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','jobhunter')
      //断言
      cy.wait(2000)
      cy.get(':nth-child(2) > .el-card > .el-card__body > [style="padding: 10px;"] > .el-button').click()
      //点击查看详情
      cy.get('[style="z-index: 2008;"] > .el-drawer').should('be.visible')

    })
})