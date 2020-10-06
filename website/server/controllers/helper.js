const faker = require("faker");

function fakeUser(){
    return {
        id: faker.random.uuid(),
        nickname: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        photoUrl: faker.image.imageUrl(),
    }
}
function fakeTweet(){
    const id = faker.random.uuid();
    const tweet = {
        id: faker.random.uuid(),
        user: fakeUser(),
        text: faker.lorem.text(),
        createdAt: faker.time.recent(),
        likes:[
            fakeUser(),
            fakeUser(),
            fakeUser(),
        ]
    };
    return tweet;
}

module.exports = {
    fakeTweet,
    fakeUser,
}