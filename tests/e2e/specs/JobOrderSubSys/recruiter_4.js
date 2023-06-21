// https://docs.cypress.io/api/table-of-contents

describe('兼职订单子系统-招聘方', () => {
    it('结束招聘', () => {
        //兼职存在“已通过”的求职者
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(1000)
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.url().should('contain','/recruiter/jobManage')
        //断言
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("已通过")').filter(':visible').first().click();   
        cy.wait(2000)
        cy.get('button.el-button').filter(':contains("已通过")').filter(':visible').first().click();   
        //点击筛选“已通过”的兼职
        cy.wait(2000)
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.get('.btn-next').click()
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("结束招聘")').filter(':visible').first().click();
        //点击结束招聘
        cy.wait(200)
        cy.contains('p', '请等待求职者答复').should('exist');
        //断言

        //兼职状态为“已结束”
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(1000)
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.url().should('contain','/recruiter/jobManage')
        //断言
        cy.wait(200)
        cy.get(':nth-child(6) > div > .el-button > span').click()
        cy.wait(2000)
        cy.get(':nth-child(6) > div > .el-button > span').click()
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        cy.get('button.el-button').filter(':contains("结束招聘")').filter(':visible').first().click();
        cy.get('button.el-button').filter(':contains("结束招聘")').filter(':visible').first().click();
        //点击结束招聘
        cy.contains('p', '招聘已结束').should('exist');
        //断言

        //兼职状态为“已完成”
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(1000)
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.url().should('contain','/recruiter/jobManage')
        //断言
        cy.wait(200)
        cy.get(':nth-child(7) > div > .el-button > span').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > div > .el-button > span').click()
        cy.wait(1000)
        cy.get('button.el-button').filter(':contains("查看详情")').filter(':visible').first().click();
        cy.get('button.el-button').filter(':contains("结束招聘")').filter(':visible').first().click();
        
        //点击结束招聘
        cy.contains('p', '该兼职已完成').should('exist');
        //断言
    })
})