// https://docs.cypress.io/api/table-of-contents

describe('兼职订单子系统-招聘方', () => {
    it('确认求职者工作完成', () => {
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("已通过")').filter(':visible').first().click();   
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("已通过")').filter(':visible').first().click();   
        //点击筛选“已通过”的兼职
        cy.wait(2000)
        cy.get('.el-card > .el-card__body').contains('.work_name', '大学生线上讲解小学数学长期兼职')
        .parents('.el-card > .el-card__body')
        .within(() => {
            // Click the "查看详情" button
            cy.contains('.el-button', '查看详情').click();
        });
        //跳转至兼职“大学生线上讲解小学数学长期兼职”详情页
        cy.get(':nth-child(3) > :nth-child(6)').scrollIntoView()
        cy.wait(1000)
        //查看求职者已完成列表
        cy.get('button.el-button').filter(':contains("确认工作完成")').filter(':visible').first().click();
        //点击确认工作完成
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.contains('p', '操作成功').should('exist');
        //断言
    })

    it('对求职者打分', () => {
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("已通过")').filter(':visible').first().click();   
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("已通过")').filter(':visible').first().click();   
        //点击筛选“已通过”的兼职
        cy.wait(2000)
        cy.get('.el-card > .el-card__body').contains('.work_name', '大学生线上讲解小学数学长期兼职')
        .parents('.el-card > .el-card__body')
        .within(() => {
            // Click the "查看详情" button
            cy.contains('.el-button', '查看详情').click();
        });
        //跳转至兼职“大学生线上讲解小学数学长期兼职”详情页
        cy.get(':nth-child(3) > :nth-child(7)').scrollIntoView()
        cy.wait(1000)
        //查看求职者已完成列表
        cy.get('button.el-button').filter(':contains("评分")').filter(':visible').first().click();
        //点击评分
        cy.get('#scoreValue > :nth-child(5)').click()
        //评分
        cy.get('.dialog-footer > :nth-child(2)').click()
        //点击确认
        cy.wait(200)
        cy.contains('p', '打分成功').should('exist');
        //断言
    })
})