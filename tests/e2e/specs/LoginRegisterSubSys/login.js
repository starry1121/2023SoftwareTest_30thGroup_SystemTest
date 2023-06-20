// https://docs.cypress.io/api/table-of-contents

describe('登录注册子系统-用户登录', () => {
  it('用户登录正常', () => {
    //求职者登录-ID
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录成功').should('exist');
    cy.url().should('contain','jobhunter')
    //断言

    //求职者登录-邮箱
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("278803847@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录成功').should('exist');
    cy.url().should('contain','jobhunter')
    //断言

    //招聘方登录-ID
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录成功').should('exist');
    cy.url().should('contain','recruiter')
    //断言

    //招聘方登录-邮箱
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("2523862206@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮  
    cy.contains('p', '登录成功').should('exist');
    cy.url().should('contain','recruiter')
    //断言

    //管理员登录-ID
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录成功').should('exist');
    cy.url().should('contain','admin')
    //断言

    //管理员登录-邮箱
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录成功').should('exist');
    cy.url().should('contain','admin')
    //断言
  })
  it('登录注册子系统-用户登录异常', () => {
    //求职者登录-账号不存在
    
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("11014")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录失败').should('exist');
    //断言

    //求职者登录-密码错误
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021111")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录失败').should('exist');
    //断言

    //招聘方登录-账号不存在
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("11018")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录失败').should('exist');
    //断言

    //招聘方登录-密码错误
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021111")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录失败').should('exist');
    //断言

    //管理员登录-账号不存在
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("11007")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录失败').should('exist');
    //断言

    //管理员登录-密码错误
    cy.visit('/')
    //访问网站
    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin1")
    //输入账号密码
    cy.get("#login").click()
    //点击登录按钮
    cy.contains('p', '登录失败').should('exist');
    //断言
  })

})