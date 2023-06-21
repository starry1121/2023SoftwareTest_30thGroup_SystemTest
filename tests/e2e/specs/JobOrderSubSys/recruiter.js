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
    })

    it('与报名者交流', () => {
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
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(4)').scrollIntoView()
        cy.wait(500)
        //查看求职者报名列表
        cy.get('button.el-button').filter(':contains("私信")').filter(':visible').first().click();
        //点击私信
        cy.url().should('contain','/recruiter/message/conversations/privatechat')
        //断言
    })

    it('录用求职者', () => {
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
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(4)').scrollIntoView()
        cy.wait(500)
        //查看求职者报名列表
        cy.get('button.el-button').filter(':contains("录用")').filter(':visible').first().click();
        //点击录用
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.contains('p', '录用成功').should('exist');
        //断言
    })

    it('拒绝录用求职者', () => {
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
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(4)').scrollIntoView()
        cy.wait(500)
        //查看求职者报名列表
        cy.get('button.el-button').filter(':contains("拒绝")').filter(':visible').first().click();
        //点击拒绝
        cy.get('.el-message-box__btns > .el-button--primary').click()
        //点击确认
        cy.contains('p', '拒绝成功').should('exist');
        //断言
    })

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
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(6)').scrollIntoView()
        cy.wait(500)
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
        cy.wait(1000)
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(7)').scrollIntoView()
        cy.wait(500)
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

    it('对自己收到的不合理的评价提出申诉', () => {
        //申诉理由为空
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.wait(1000)
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(7)').scrollIntoView()
        cy.wait(500)
        //查看求职者已完成列表
        cy.get('button.el-button').filter(':contains("申诉")').filter(':visible').first().click();
        //点击申诉
        cy.get('.el-textarea__inner').clear()
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '不能为空').should('exist');
        //断言

        //用户未提交申诉，或者提交的申诉状态为未通过
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.wait(1000)
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(7)').scrollIntoView()
        cy.wait(500)
        //查看求职者已完成列表
        cy.get('button.el-button').filter(':contains("申诉")').filter(':visible').first().click();
        //点击申诉
        cy.get('.el-textarea__inner').clear()
        cy.get('.el-textarea__inner').type("打分不合理")
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '已提交申诉').should('exist');
        //断言

        //用户已提交申诉，状态为审核中
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.get('[href="/recruiter/jobManage"]').click()
        //跳转至兼职管理界面
        cy.wait(1000)
        cy.get(':nth-child(3) > div > .el-button > span').click()
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
        cy.get(':nth-child(3) > :nth-child(7)').scrollIntoView()
        cy.wait(500)
        //查看求职者已完成列表
        cy.get('button.el-button').filter(':contains("申诉")').filter(':visible').first().click();
        //点击申诉
        cy.get('.el-textarea__inner').clear()
        cy.get('.el-textarea__inner').type("打分不合理")
        cy.get('.dialog-footer > .el-button--primary').click()
        //点击确认
        cy.contains('p', '您的申诉审核中').should('exist');
        //断言

        //管理员驳回申诉
        cy.visit('/')
        //访问网站
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10007")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("admin")
        //输入账号密码
        cy.get("#login").click()
        //点击登录按钮
        cy.wait(500)
        cy.get('.el-menu--vertical > :nth-child(2)').click()
        //点击订单申诉
        cy.wait(500)
        cy.get('button.el-button').filter(':contains("审核")').filter(':visible').first().click();
        //点击审核
        cy.wait(200)
        cy.get('button.el-button').filter(':contains("驳回")').filter(':visible').first().click();
        //点击驳回
        cy.wait(500)
        cy.get('.el-textarea__inner').filter(':visible').clear()
        cy.get('.el-textarea__inner').filter(':visible').type("已处理")
        cy.get('button.el-button').filter(':contains("确认")').filter(':visible').first().click();
        //点击确认
        cy.contains('p', '已驳回该申诉').should('exist');
        //断言
    })
})