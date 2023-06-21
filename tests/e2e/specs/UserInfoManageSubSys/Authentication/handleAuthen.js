
describe('兼职信息管理子系统-管理员审核认证申请', () => {
    it('驳回', () => {
        //审核实名认证-驳回
        //反馈为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(200)
        cy.get('.el-sub-menu.is-active > .el-menu > .is-active').click()
        //点击个人认证
        cy.wait(500)
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        cy.get(':nth-child(3) > .el-checkbox__label').click()
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("审核")').filter(':visible').first().click();
        //点击审核
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("驳回")').filter(':visible').first().click();
        //点击驳回
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '反馈不能为空').should('exist');
        //断言

        //审核实名认证-驳回
        //反馈不为空
        cy.get('.el-textarea__inner').clear()
        cy.get('.el-textarea__inner').type("不可以")
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '已驳回该申请').should('exist');
        //断言

        //审核企业认证-驳回
        //反馈为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(200)
        cy.get('.is-opened > .el-menu > :nth-child(2)').click()
        //点击企业认证
        cy.wait(500)
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        cy.get(':nth-child(3) > .el-checkbox__label').click()
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("审核")').filter(':visible').first().click();
        //点击审核
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("驳回")').filter(':visible').first().click();
        //点击驳回
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '反馈不能为空').should('exist');
        //断言

        //审核企业认证-驳回
        //反馈不为空
        cy.get('.el-textarea__inner').clear()
        cy.get('.el-textarea__inner').type("不可以")
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '已驳回该申请').should('exist');
        //断言
    })
    it('通过', () => {
        //审核实名认证-通过
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(200)
        cy.get('.el-sub-menu.is-active > .el-menu > .is-active').click()
        //点击个人认证
        cy.wait(500)
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        cy.get(':nth-child(3) > .el-checkbox__label').click()
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("审核")').filter(':visible').eq(1).click();
        //点击审核
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("通过")').filter(':visible').first().click();
        //点击通过
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '已通过该申请').should('exist');
        //断言

        //审核企业认证-通过
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(200)
        cy.get('.is-opened > .el-menu > :nth-child(2)').click()
        //点击企业认证
        cy.wait(500)
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        cy.get(':nth-child(3) > .el-checkbox__label').click()
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("审核")').filter(':visible').eq(1).click();
        //点击审核
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("通过")').filter(':visible').first().click();
        //点击通过
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '已通过该申请').should('exist');
        //断言
    })
})