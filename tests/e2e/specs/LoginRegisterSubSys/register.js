// https://docs.cypress.io/api/table-of-contents

describe('登录注册子系统-用户注册', () => {
  it('获取邮箱验证码', () => {
    //邮箱格式不正确
    cy.visit('/');
    //登录界面 
    cy.get('.con-box > .el-button').click();
    //点击去注册按钮，跳转至注册界面 
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("bucunzai@com");
    //输入邮箱 
    cy.get('.el-input-group__append > .el-button').click();
    cy.wait(2000);
    cy.get('.el-input-group__append > .el-button > span').click();
    //点击获取验证码 
    cy.contains('p', '请检查邮箱').should('exist');
    //断言

    //邮箱为空
    cy.visit('/');
    //登录界面 
    cy.get('.con-box > .el-button').click();
    //点击去注册按钮，跳转至注册界面 
    cy.get('.el-input-group__append > .el-button').click();
    cy.wait(2000);
    cy.get('.el-input-group__append > .el-button > span').click();
    //不输入邮箱，点击获取验证码 
    cy.contains('p', '请检查邮箱').should('exist');
    //断言

    //邮箱已注册
    cy.visit('/');
    //登录界面 
    cy.get('.con-box > .el-button').click();
    //点击去注册按钮，跳转至注册界面 
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("278803847@qq.com");
    //输入邮箱 
    cy.get('.el-input-group__append > .el-button').click();
    cy.wait(2000);
    cy.get('.el-input-group__append > .el-button > span').click();
    //点击获取验证码 
    cy.contains('p', '邮箱已注册').should('exist');
    //断言

    //邮箱格式正确且未注册
    cy.visit('/');
    //登录界面 
    cy.get('.con-box > .el-button').click();
    //点击去注册按钮，跳转至注册界面 
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("1261106631@qq.com");
    //输入邮箱 
    cy.get('.el-input-group__append > .el-button > span').click();
    cy.wait(2000);
    cy.get('.el-input-group__append > .el-button > span').click();
    //点击获取验证码 
    cy.contains('p', '验证码已发送至您的邮箱').should('exist');
    //断言
  })
})