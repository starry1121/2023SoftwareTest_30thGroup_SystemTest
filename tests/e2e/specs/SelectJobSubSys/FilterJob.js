describe('选择兼职子系统-筛选兼职', () => {
    it('根据类型筛选兼职-全部', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(500)
        cy.get("#qbButton").click()
        //选择全部 
        cy.get('.body').should('contain', '天');
        //断言
        cy.wait(500)
    })
    it('根据类型筛选兼职-服务行业', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(2) > div > .el-button > span').click()
        //点击服务行业
        cy.get('.body').should('contain', '服务行业');
        //断言
        cy.wait(1000)
    })
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
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(3) > div > .el-button > span').click()
        //点击教育行业
        cy.get('.body').should('contain', '教育行业')
        //断言
        cy.wait(1000)
    })
    it('根据类型筛选兼职-会展演出', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(4) > div > .el-button > span').click()
        //点击会展演出
        cy.get('.body').should('contain', '会展演出')
        //断言
        cy.wait(1000)
     
    })
    it('根据类型筛选兼职-专业技能', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(5) > div > .el-button > span').click()
        //点击专业技能
        cy.get('.body').should('contain', '专业技能')
        //断言
        cy.wait(1000)
     
    })
    it('根据类型筛选兼职-市场推广', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(6) > div > .el-button > span').click()
        //点击市场推广
        cy.get('.body').should('contain', '市场推广')
        //断言
        cy.wait(1000)
     
    })
    it('根据类型筛选兼职-其它', () => {
        //求职者登录-ID
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        cy.url().should('contain', 'jobhunter')
        //断言
        cy.wait(500)
        cy.get("#jobButton").click()
        //点击寻找兼职按钮
        cy.url().should('contain', 'jobhunter/job')
        //断言 
        cy.wait(1000)
        cy.get(':nth-child(2) > .el-space > :nth-child(7) > div > .el-button > span').click()
        //点击其它
        cy.get('.body').should('contain', '其它')
        //断言
        cy.wait(1000)
     
    })
 
})