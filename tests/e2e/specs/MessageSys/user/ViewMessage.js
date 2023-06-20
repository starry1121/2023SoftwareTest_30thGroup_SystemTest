describe('消息通知子系统-查看消息', () => {
    it('招聘发查看消息', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言 是否登录成功
      cy.wait(1500)

      cy.get('a > .el-icon > svg').click()
      //点击消息通知按钮
      cy.url().should('contain','conversation')
      //断言 是否成功跳转到消息界面
      cy.get('.conversation').click()
      //点击某一头像
      cy.get('.chat-title').should('be.visible')
      //断言 是否出现了聊天信息

      
    })
})