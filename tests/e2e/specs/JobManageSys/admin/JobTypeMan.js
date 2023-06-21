
describe('兼职信息管理子系统-兼职类型管理', () => {
    it('兼职类型管理-增加兼职类型', () => {
        //管理员登录-邮箱
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        // cy.url().should('contain', 'admin')
        // //断言-登录成功

        cy.wait(200)
        cy.get('[aria-expanded="false"] > .el-sub-menu__title').click()
        //点击兼职管理
        cy.get(':nth-child(3) > .el-menu > :nth-child(3)').click()
        //点击兼职类型
        cy.wait(500)
        cy.get('.card-header > .el-button').click()
        //点击“添加兼职类型”按钮
        cy.wait(500)
        cy.get('.el-input__wrapper').type('家政')
        //输入兼职名称：“家政”
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击提示框的确认按钮
        cy.get('.el-card__body').should('contain', '家政')
        //断言
    })
    it('兼职类型管理-修改兼职类型', () => {
        //管理员登录-邮箱
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        // cy.url().should('contain', 'admin')
        // //断言-登录成功

        cy.wait(200)
        cy.get('[aria-expanded="false"] > .el-sub-menu__title').click()
        //点击兼职管理
        cy.get(':nth-child(3) > .el-menu > :nth-child(3)').click()
        //点击兼职类型
        cy.wait(500)
        cy.get(':nth-child(1) > .el-table_2_column_12 > .cell > :nth-child(1) > span').click()
        //点击修改按钮
        cy.get('.el-input__wrapper').type('管理')
        //填写修改后的名称
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认按钮
        cy.wait(1000)
        cy.get('.el-card__body').should('contain', '家政管理')
        //断言
    })
    it('兼职类型管理-删除兼职类型', () => {
        //管理员登录-邮箱
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        // cy.get('#message_1').should('contain', '登录成功');
        // cy.url().should('contain', 'admin')
        // //断言-登录成功

        cy.wait(200)
        cy.get('[aria-expanded="false"] > .el-sub-menu__title').click()
        //点击兼职管理
        cy.get(':nth-child(3) > .el-menu > :nth-child(3)').click()
        //点击兼职类型
        cy.wait(1000)
        cy.get(':nth-child(1) > .el-table_2_column_12 > .cell > :nth-child(2) > span').click()
        //点击删除按钮
        cy.wait(1000)
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认按钮
        cy.wait(1000)
    })

})