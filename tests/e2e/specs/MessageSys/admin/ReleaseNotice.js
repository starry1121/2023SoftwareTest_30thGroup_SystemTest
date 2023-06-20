
describe('消息通知子系统-发布公告', () => {
    it('发布公告公告', () => {
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
        //断言
        cy.get('.el-menu--vertical > :nth-child(4)').click()
        //点击公告管理
        // cy.get(':nth-child(1) > .el-table_1_column_7 > .cell > :nth-child(1) > span')
        cy.wait(2000)
        cy.get(':nth-child(1) > .el-table_2_column_15 > .cell > :nth-child(1) > span').click()
        //点击发布
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认按钮
        cy.get('tbody > :nth-child(1) > .el-table_1_column_7 > .cell').should('contain', '撤销')


    })
})