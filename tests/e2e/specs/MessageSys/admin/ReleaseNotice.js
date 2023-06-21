
describe('消息通知子系统-发布公告', () => {
    it('发布公告', () => {
        //管理员登录-邮箱
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'admin')
        //断言
        cy.get('.el-menu--vertical > :nth-child(4)').click()
        //点击公告管理
        cy.wait(500)
        cy.get('.el-pager > :nth-child(2)').click()
        //点击第二页
        
        cy.get('.el-table__column-filter-trigger > .el-icon > svg').click()
        //点击状态筛选
        cy.get(':nth-child(1) > .el-checkbox__label').click()
        //点击未发布
        cy.get('.el-table-filter__bottom > :nth-child(1)').click()
        // 点击confirm

        // cy.get(':nth-child(1) > .el-table_2_column_15 > .cell > :nth-child(1) > span').click()
        cy.get('button.el-button').filter(':contains("发布")').filter(':visible').first().click();
        //点击发布
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认按钮
        cy.url().should('contain', 'notice')


    })
})