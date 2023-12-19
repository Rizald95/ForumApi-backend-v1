const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {

    async addThread({
        id = 'thread-54321',
        title = 'test thread',
        body = 'body thread',
        owner = 'user-rizal',
    }) {
        const createdAt = new Date().toISOString();
        const queryThreads = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
            values: [id, title, body, owner, createdAt],
        };

        await pool.query(queryThreads);
    },

    async findThreads(id) {
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM threads WHERE 1=1');
    },
};

module.exports = ThreadsTableTestHelper;