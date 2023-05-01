class RestApi {
    //用户数据示例
    users = [
        {
            id: '08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a',
            name: 'Mattie',
            password: '123',
            avatar: '/static/images/Avatar-1.png',
            email: 'Mattie@goeasy.io',
            phone: '138xxxxxxxx',
        },
        {
            id: '3bb179af-bcc5-4fe0-9dac-c05688484649',
            name: 'Wallace',
            password: '123',
            avatar: '/static/images/Avatar-2.png',
            email: 'Wallace@goeasy.io',
            phone: '138xxxxxxxx',
        },
        {
            id: 'fdee46b0-4b01-4590-bdba-6586d7617f95',
            name: 'Tracy',
            password: '123',
            avatar: '/static/images/Avatar-3.png',
            email: 'Tracy@goeasy.io',
            phone: '138xxxxxxxx',
        },
        {
            id: '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
            name: 'Juanita',
            password: '123',
            avatar: '/static/images/Avatar-4.png',
            email: 'Juanita@goeasy.io',
            phone: '138xxxxxxxx',
        },
        {
            id: '10014',
            name: 'Boaibai',
            password: '123',
            avatar: 'http://dummyimage.com/400x400',
            email: '278803847@qq.com',
            phone: '138xxxxxxxx',
        },
        {
            id: '10018',
            name: 'starry',
            password: '123',
            avatar: 'http://dummyimage.com/400x400',
            email: '123@qq.com',
            phone: '15379989315',
        },
    ];

    findUsers() {
        return this.users;
    }

    findFriends(user) {
        return this.users.filter((v) => v.id !== user.id);
    }

    findUser(username, password) {
        return this.users.find((user) => user.name === username && user.password === password);
    }

    findUserById(userId) {
        return this.users.find((user) => user.id === userId);
    }
}

export default new RestApi();
