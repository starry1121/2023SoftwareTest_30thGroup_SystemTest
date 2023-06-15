// https://docs.cypress.io/api/table-of-contents

describe('登录注册子系统-用户登录正常', () => {

  it('求职者登录-ID', () => {
    //访问网站
    cy.visit('/')
    //输入账号密码
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //点击登录按钮
    cy.get("#login").click()
    //断言
    cy.get('#message_1').should('contain', '登录成功');
    cy.url().should('contain','jobhunter')
  })

  it('求职者登录-邮箱', () => {
    //访问网站
    cy.visit('/')
    //输入账号密码
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("278803847@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //点击登录按钮
    cy.get("#login").click()
    //断言
    cy.get('#message_1').should('contain', '登录成功');
    cy.url().should('contain','jobhunter')
  })
  
  it('招聘方登录-ID', () => {
    //访问网站
    cy.visit('/')
    //输入账号密码
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //点击登录按钮
    cy.get("#login").click()
    //断言
    cy.get('#message_1').should('contain', '登录成功');
    cy.url().should('contain','recruiter')
  })

  it('招聘方登录-邮箱', () => {
    //访问网站
    cy.visit('/')
    //输入账号密码
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("123@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //点击登录按钮
    cy.get("#login").click()
    //断言
    cy.get('#message_1').should('contain', '登录成功');
    cy.url().should('contain','recruiter')
  })

  it('管理员登录-ID', () => {
    //访问网站
    cy.visit('/')
    //输入账号密码
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
    //点击登录按钮
    cy.get("#login").click()
    //断言
    cy.get('#message_1').should('contain', '登录成功');
    cy.url().should('contain','admin')
  })

  it('管理员登录-邮箱', () => {
    //访问网站
    cy.visit('/')
    //输入账号密码
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
    //点击登录按钮
    cy.get("#login").click()
    //断言
    cy.get('#message_1').should('contain', '登录成功');
    cy.url().should('contain','admin')
  })
})