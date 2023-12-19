const createServer = require('../src/Infrastructures/http/createServer');
const container = require('../src/Infrastructures/container');

const ServerTableTestHelper = {
    async getAccessToken() {
        const usergetPayload = {
            username: 'dicoding',
            password: 'supersecretpassword',
            fullname: 'dicoding indonesia',
        };

        const loginPayload = {
            username: 'abc',
            password: 'abc',
        };

        const server = await createServer(container);
        await server.inject({
            method: 'POST',
            url: '/users',
            payload: usergetPayload,
        });

        const response = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: loginPayload,
        });

        const responseJSON = JSON.parse(response.payload);
        if (response.statusCode !== 201) {
            throw new Error('FAILED_DO_AUTHENTICATION');
        }
        return responseJSON.data.accessToken;
    },
};

module.exports = ServerTableTestHelper;