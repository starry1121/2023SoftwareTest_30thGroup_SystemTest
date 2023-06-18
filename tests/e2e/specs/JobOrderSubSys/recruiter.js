// https://docs.cypress.io/api/table-of-contents

describe('兼职订单子系统-招聘方', () => {
    it('查看求职者报名列表', () => {
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.url().should('contain','/recruiter/jobManage')
        //断言
        cy.wait(200)
        cy.get(':nth-child(3) > div > .el-button > span').click()
        //点击筛选“已通过”的兼职
        cy.get('.el-card > .el-card__body').contains('.work_name', '大学生线上讲解小学数学长期兼职')
        .parents('.el-card > .el-card__body')
        .within(() => {
            // Click the "查看详情" button
            cy.contains('.el-button', '查看详情').click();
        });
        //跳转至兼职“大学生线上讲解小学数学长期兼职”详情页
        cy.url().should('contain','/recruiter/jobDetail')
        cy.get('.workName').should('contain','大学生线上讲解小学数学长期兼职')
        //断言
        cy.get(':nth-child(3) > :nth-child(4)').scrollIntoView()
    })
})