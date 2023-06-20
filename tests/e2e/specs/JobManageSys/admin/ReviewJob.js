
describe('兼职信息管理子系统-审核兼职', () => {
    it('审核兼职-通过', () => {
        //管理员登录-邮箱
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'admin')
        //断言-登录成功

        cy.wait(200)
        cy.get('[aria-expanded="false"] > .el-sub-menu__title').click()
        //点击兼职管理
        cy.get(':nth-child(3) > .el-menu > :nth-child(1)').click()
        //点击审核兼职
        cy.wait(500)
        cy.get(':nth-child(1) > .el-table_2_column_16 > .cell > .el-button').click()
        //点击审核
        cy.wait(200)
        cy.get('.dialog-footer > .el-button--primary').click()
        // 点击审核通过
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.url().should('contain', 'admin/job')
        //断言
    })
    it('审核兼职-不通过', () => {
        //管理员登录-邮箱
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'admin')
        //断言-登录成功

        cy.wait(200)
        cy.get('[aria-expanded="false"] > .el-sub-menu__title').click()
        //点击兼职管理
        cy.get(':nth-child(3) > .el-menu > :nth-child(1)').click()
        //点击审核兼职
        cy.wait(500)
        cy.get(':nth-child(1) > .el-table_2_column_16 > .cell > .el-button').click()
        //点击审核
        cy.wait(200)
        cy.get('.el-button--danger').click()
        // 点击驳回
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.url().should('contain', 'admin/job')
        //断言
    })
})