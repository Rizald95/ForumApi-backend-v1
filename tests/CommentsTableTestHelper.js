const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {

    async addComment(id, { content = 'content' }, userId, threadId, date, owner) {
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
            values: [id, content, userId, threadId, owner, date],
        };
        await pool.query(query);
    },

    async findComment(id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
        };

        const resultQuery = await pool.query(query);
        return resultQuery.rows;
    },

    async checkDeletedCommentById(id) {
        const query = {
            text: 'SELECT isDeleted FROM comments WHERE id = $1',
            values: [id],
        };

        const resultQuery = await pool.query(query);
        const isDelete = resultQuery.rows[0].isDeleted;
        return isDelete;
    },

    async deleteComment(id) {
        const query = {
            text: 'UPDATE comments SET isDeleted = 1 WHERE id = $1',
            values: [id],

        };
        await pool.query(query);
    },

    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
    },
};

module.exports = CommentsTableTestHelper;