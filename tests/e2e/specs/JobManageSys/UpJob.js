describe('兼职管理子系统-发布兼职', () => {
    it('直接发布兼职--专业技能', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言

      cy.get('a > .el-button').click()
      //点击发布兼职按钮
      cy.url().should('contain','upJob')
      //断言

      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type('短视频后期剪辑')
      //填写兼职名称
      cy.get('.select-trigger > .el-input > .el-input__wrapper').click()
      //选择兼职类型
      cy.get('.el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(4)').click()
      //选择专业技能
      cy.get('.el-form > :nth-child(3) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(500)
      //填写薪水
      cy.get('#jobtime1').type('2023-06-21 10:47:49')
      cy.get('#jobtime2').type('2023-06-28 12:00:00')
      //选择兼职时间
      cy.get(':nth-child(2) > .el-form-item > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(8)
      //每日时长
      // cy.get('.el-cascader > .el-input > .el-input__wrapper').click()
      // //选择兼职地区
      // cy.wait(200)
      // cy.get('.el-cascader > .el-input > .el-input__wrapper > :nth-child(2)').click()
      cy.get(':nth-child(7) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(4)
      //填入招募人数
      cy.get('#inputJobDetail').type('负责公司明星账号短视频的后期与剪辑包装,负责剪辑作品的风格把控以及内容规划、制定及执行；跟踪传播效果，根据分析数据及反馈，及时调整风格方向，提升品牌影响力与活跃度；')
      //填入兼职详情
      cy.get('.el-button--primary').click()
      //点击发布
    })
    it('直接发布兼职--会展演出', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言

      cy.get('a > .el-button').click()
      //点击发布兼职按钮
      cy.url().should('contain','upJob')
      //断言

      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type('流行演唱老师')
      //填写兼职名称
      cy.get('.select-trigger > .el-input > .el-input__wrapper').click()
      //选择兼职类型
      cy.get('.el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(3)').click()
      //选择会展演出
      cy.get('.el-form > :nth-child(3) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(500)
      //填写薪水
      cy.get('#jobtime1').type('2023-06-21 10:47:49')
      cy.get('#jobtime2').type('2023-06-28 12:00:00')
      //选择兼职时间
      cy.get(':nth-child(2) > .el-form-item > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(8)
      //每日时长
      // cy.get('.el-cascader > .el-input > .el-input__wrapper').click()
      // //选择兼职地区
      // cy.wait(200)
      // cy.get('.el-cascader > .el-input > .el-input__wrapper > :nth-child(2)').click()
      cy.get(':nth-child(7) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(4)
      //填入招募人数
      cy.get('#inputJobDetail').type('要求有经验，责任心，团队心，负责流行演唱课程的教学工作、保证教学质量；协助机构举办的各种演出及其他活动，大专以上学历，流行演唱专业')
      //填入兼职详情
      cy.get('.el-button--primary').click()
      //点击发布
    })
    it('直接发布兼职--会展演出', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言

      cy.get('a > .el-button').click()
      //点击发布兼职按钮
      cy.url().should('contain','upJob')
      //断言

      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type('流行演唱老师')
      //填写兼职名称
      cy.get('.select-trigger > .el-input > .el-input__wrapper').click()
      //选择兼职类型
      cy.get('.el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(3)').click()
      //选择会展演出
      cy.get('.el-form > :nth-child(3) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(500)
      //填写薪水
      cy.get('#jobtime1').type('2023-06-21 10:47:49')
      cy.get('#jobtime2').type('2023-06-28 12:00:00')
      //选择兼职时间
      cy.get(':nth-child(2) > .el-form-item > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(8)
      //每日时长
      // cy.get('.el-cascader > .el-input > .el-input__wrapper').click()
      // //选择兼职地区
      // cy.wait(200)
      // cy.get('.el-cascader > .el-input > .el-input__wrapper > :nth-child(2)').click()
      cy.get(':nth-child(7) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(4)
      //填入招募人数
      cy.get('#inputJobDetail').type('要求有经验，责任心，团队心，负责流行演唱课程的教学工作、保证教学质量；协助机构举办的各种演出及其他活动，大专以上学历，流行演唱专业')
      //填入兼职详情
      cy.get('.el-button--primary').click()
      //点击发布
    })
    it('直接发布兼职--其它', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言

      cy.get('a > .el-button').click()
      //点击发布兼职按钮
      cy.url().should('contain','upJob')
      //断言

      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type('家政保洁')
      //填写兼职名称
      cy.get('.select-trigger > .el-input > .el-input__wrapper').click()
      //选择兼职类型
      cy.get('.el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(6)').click()
      //选择其它
      cy.get('.el-form > :nth-child(3) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(500)
      //填写薪水
      cy.get('#jobtime1').type('2023-06-21 10:47:49')
      cy.get('#jobtime2').type('2023-06-28 12:00:00')
      //选择兼职时间
      cy.get(':nth-child(2) > .el-form-item > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(8)
      //每日时长
      // cy.get('.el-cascader > .el-input > .el-input__wrapper').click()
      // //选择兼职地区
      // cy.wait(200)
      // cy.get('.el-cascader > .el-input > .el-input__wrapper > :nth-child(2)').click()
      cy.get(':nth-child(7) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(4)
      //填入招募人数
      cy.get('#inputJobDetail').type('活泼开朗，有上进心，实事求是。大专以上学历。')
      //填入兼职详情
      cy.get('.el-button--primary').click()
      //点击发布
    })
    it('直接发布兼职--其它', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言

      cy.get('a > .el-button').click()
      //点击发布兼职按钮
      cy.url().should('contain','upJob')
      //断言

      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type('家政保洁')
      //填写兼职名称
      cy.get('.select-trigger > .el-input > .el-input__wrapper').click()
      //选择兼职类型
      cy.get('.el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(6)').click()
      //选择其它
      cy.get('.el-form > :nth-child(3) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(500)
      //填写薪水
      cy.get('#jobtime1').type('2023-06-21 10:47:49')
      cy.get('#jobtime2').type('2023-06-28 12:00:00')
      //选择兼职时间
      cy.get(':nth-child(2) > .el-form-item > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(8)
      //每日时长
      // cy.get('.el-cascader > .el-input > .el-input__wrapper').click()
      // //选择兼职地区
      // cy.wait(200)
      // cy.get('.el-cascader > .el-input > .el-input__wrapper > :nth-child(2)').click()
      cy.get(':nth-child(7) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(4)
      //填入招募人数
      cy.get('#inputJobDetail').type('活泼开朗，有上进心，实事求是。大专以上学历。')
      //填入兼职详情
      cy.get('.el-button--primary').click()
      //点击发布
    })
    it('保存兼职到草稿箱', () => {
      //招聘方登录-ID
      cy.visit('/')
      //访问网站
      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type("10018")
      cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper').type("021121")
      //输入账号密码
      cy.get("#login").click()
      //点击登录按钮
      cy.get('#message_1').should('contain', '登录成功');
      cy.url().should('contain','recruiter')
      //断言

      cy.get('a > .el-button').click()
      //点击发布兼职按钮
      cy.url().should('contain','upJob')
      //断言

      cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper').type('短视频编导')
      //填写兼职名称
      cy.get('.select-trigger > .el-input > .el-input__wrapper').click()
      //选择兼职类型
      cy.get('.el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(4)').click()
      //选择专业技能
      cy.get('.el-form > :nth-child(3) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(500)
      //填写薪水
      cy.get('#jobtime1').type('2023-06-21 10:47:49')
      cy.get('#jobtime2').type('2023-06-28 12:00:00')
      //选择兼职时间
      cy.get(':nth-child(2) > .el-form-item > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(8)
      //每日时长
      // cy.get('.el-cascader > .el-input > .el-input__wrapper').click()
      // //选择兼职地区
      // cy.wait(200)
      // cy.get('.el-cascader > .el-input > .el-input__wrapper > :nth-child(2)').click()
      cy.get(':nth-child(7) > .el-form-item__content > .el-input-number > .el-input > .el-input__wrapper').type(4)
      //填入招募人数
      cy.get('#inputJobDetail').type('负责公司明星账号短视频的后期与剪辑包装,负责剪辑作品的风格把控以及内容规划、制定及执行；跟踪传播效果，根据分析数据及反馈，及时调整风格方向，提升品牌影响力与活跃度；')
      //填入兼职详情
      cy.get(':nth-child(9) > .el-form-item__content > :nth-child(2)').click()
      //点击存为草稿
    })
})