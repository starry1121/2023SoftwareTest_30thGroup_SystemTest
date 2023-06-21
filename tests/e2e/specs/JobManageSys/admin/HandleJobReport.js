
describe('兼职信息管理子系统-处理兼职举报', () => {
    it('处理兼职举报-通过', () => {
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
        cy.get(':nth-child(3) > .el-menu > :nth-child(2)').click()
        //点击审核兼职
        cy.wait(500)
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        cy.get(':nth-child(3) > .el-checkbox__label').click()
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .el-table_2_column_15 > .cell > .el-button').click()
        //点击审核
        cy.wait(200)
        // cy.get('.dialog-footer > .el-button--primary').click()
        cy.get('.el-dialog__headerbtn > .el-icon > svg').click()
        // 点击审核通过
        // cy.get('.el-message-box__btns > .el-button--primary').click()
        // cy.wait(200)
        // cy.get('.el-message-box__btns > :nth-child(1)').click()
        // cy.get('.el-message-box__headerbtn > .el-icon > svg').click()
        //点击确认
        // cy.get('.el-dialog__headerbtn > .el-icon > svg').click()
        cy.url().should('contain', 'admin/jobReport')
        //断言
    })
    it('处理兼职举报-驳回', () => {
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
        cy.get(':nth-child(3) > .el-menu > :nth-child(2)').click()
        //点击审核兼职
        cy.wait(500)
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        cy.get(':nth-child(3) > .el-checkbox__label').click()
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        cy.wait(500)

        cy.get(':nth-child(1) > .el-table_2_column_15 > .cell > .el-button').click()
        //点击审核
        cy.wait(200)
        cy.get('.el-button--danger').click()
        // 点击驳回
        cy.get('#bohuiInput').type('驳回测试')
        //输入结果反馈
        cy.get('[style="z-index: 2013;"] > .el-overlay-dialog > .el-dialog > .el-dialog__footer > .dialog-footer > .el-button--primary').click()
        //点击确认
     
        cy.url().should('contain', 'admin/jobReport')
        //断言
    })
})