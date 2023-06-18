// https://docs.cypress.io/api/table-of-contents

describe('用户信息管理子系统-我的收藏', () => {
    it('用户新建收藏夹', () => {
        //收藏夹名称为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.get('.el-header > .el-button').click()
        //点击新建收藏夹
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '收藏夹名称不能为空').should('exist');
        //断言

        //收藏夹名称不为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.get('.el-header > .el-button').click()
        //点击新建收藏夹
        cy.get('.el-input__wrapper').type("newTestDir")
        //填写收藏夹名称
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '添加成功').should('exist');
        //断言
    })
    it('用户重命名收藏夹', () => {
        //收藏夹名称为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.contains('tr', 'newTestDir').find('.el-table_1_column_2 > .cell > .el-button--primary').click()
        //点击重命名按钮
        cy.get('.el-input__wrapper').clear()
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '收藏夹名称不能为空').should('exist');
        //断言

        //收藏夹名称不为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.contains('tr', 'newTestDir').find('.el-table_1_column_2 > .cell > .el-button--primary').click()
        //点击重命名按钮
        cy.get('.el-input__wrapper').clear()
        cy.get('.el-input__wrapper').type("newTestDir1")
        //重命名收藏夹名称
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '修改成功').should('exist');
        //断言
    })
    it('用户移除收藏夹', () => {
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.contains('tr', 'newTestDir1').find('.el-table_1_column_2 > .cell > .el-button--danger').click()
        //点击删除按钮
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.contains('p', '已删除该收藏夹').should('exist');
        //断言
    })
    it('用户移除某收藏', () => {
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.contains('tr', '默认收藏夹').find('.el-table_1_column_2 > .cell > .el-button--success').click()
        //点击详情按钮
        cy.get('.el-scrollbar__view > :nth-child(1) > .el-button--danger').click()
        //点击取消收藏
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.contains('p', '已取消该收藏').should('exist');
        //断言
    })
    it('用户移动某收藏', () => {
        //未选择收藏夹
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.contains('tr', '默认收藏夹').find('.el-table_1_column_2 > .cell > .el-button--success').click()
        //点击详情按钮
        cy.get('.el-scrollbar__view > :nth-child(1) > .el-button--primary').click()
        //点击移动收藏
        cy.get('.dialog-footer > :nth-child(1)').click()
        //点击确认
        cy.contains('p', '请选择收藏夹').should('exist');
        //断言

        //选择收藏夹
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10014")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('.nav > [href="/jobhunter/person"]').click()
        //跳转至个人中心-我的信息页面
        cy.get('.el-menu > :nth-child(3)').click()
        //跳转至我的收藏界面
        cy.contains('tr', '默认收藏夹').find('.el-table_1_column_2 > .cell > .el-button--success').click()
        //点击详情按钮
        cy.get('.el-scrollbar__view > :nth-child(1) > .el-button--primary').click()
        //点击移动收藏
        cy.get('.el-input__suffix-inner').click()
        //点击下拉按钮
        cy.contains('span', '测试收藏夹').click();
        //选择收藏夹
        cy.get('.dialog-footer > :nth-child(1)').click()
        //点击确认
        cy.contains('p', '移动成功').should('exist');
        //断言
    })
})