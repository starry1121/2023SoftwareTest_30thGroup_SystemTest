// https://docs.cypress.io/api/table-of-contents

describe('选择兼职子系统-搜索兼职', () => {
    it('搜索短视频', () => {
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
      cy.get("#jobButton").click()
      //点击寻找兼职按钮
      cy.url().should('contain','jobhunter/job')
      //断言 
      cy.get("#searchBox").type('短视频')
      //输入搜索词 
      cy.get('.body').should('contain', '短视频');
      //断言
    })
    it('搜索测试', () => {
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
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain','jobhunter/job')
        //断言 searchBox
        cy.get("#searchBox").type('测试')
        //输入搜索词 jobList
        cy.get('.body').should('contain', '测试');
        //断言
    })
  
  })