// https://docs.cypress.io/api/table-of-contents

describe('登录注册子系统-用户找回密码', () => {
  it('获取邮箱验证码', () => {
    //邮箱格式不正确
    cy.visit('/');
    //登录界面 
    cy.get('.el-form-item__content > :nth-child(2)').click();
    //点击找回密码按钮，打开找回密码弹窗
    cy.get('.el-dialog').find('input').first().type("bucunzai@com");
    //输入邮箱 
    cy.get('.el-input-group__append > .el-button').click();
    //点击获取验证码 
    cy.contains('p', '邮箱未注册').should('exist');
    //断言

    //邮箱为空
    cy.visit('/');
    //登录界面 
    cy.get('.el-form-item__content > :nth-child(2)').click();
    //点击找回密码按钮，打开找回密码弹窗 
    cy.get('.el-input-group__append > .el-button').click();
    //不输入邮箱，点击获取验证码 
    cy.contains('p', '请检查邮箱').should('exist');
    //断言

    //邮箱格式正确
    
    cy.visit('/');
    //登录界面 
    cy.get('.el-form-item__content > :nth-child(2)').click();
    //点击找回密码按钮，打开找回密码弹窗 
    cy.get('.el-dialog').find('input').first().type("278803847@qq.com");
    //输入邮箱 
    cy.get('.el-input-group__append > .el-button > span').click();
    cy.wait(2000);
    cy.get('.el-input-group__append > .el-button > span').click();
    //点击获取验证码 
    cy.contains('p', '验证码已发送至您的邮箱').should('exist');
    //断言
  })

})