describe('业务流测试-筛选搜索兼职', () => {

    it('根据类型筛选兼职-教育行业', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        // cy.url().should('contain', 'jobhunter')
        // //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(3) > div > .el-button > span').click()
        //点击教育行业
        cy.wait(1000)
        cy.get('.body').should('contain', '大学生线上讲解小学数学长期兼职')
        //断言
        cy.wait(1000)
        cy.get("#searchBox").type('家教')
        //输入搜索词 
        cy.wait(500)
        // cy.get('.body').should('contain', '家教');
        //断言
        cy.wait(1000)
        cy.get("#searchBox").clear()
        //清空搜索框
        cy.wait(500)
        cy.get('.el-space > :nth-child(1) > div > .el-button').click()
        //点击全部
        cy.get('.body').should('contain', '天');
        //断言

    })



})