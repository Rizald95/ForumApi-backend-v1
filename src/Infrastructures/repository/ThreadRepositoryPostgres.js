const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const DetailThread = require('../../Domains/threads/entities/DetailThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addThread(newThread, userId) {
        const { title, body } = newThread;
        const id = `thread-${this._idGenerator()}`;
        const query = {
            text: 'INSERT INTO threads (id, title, body, owner) VALUES($1, $2, $3, $4) RETURNING id, title, owner',
            values: [id, title, body, userId],
        };
        const result = await this._pool.query(query);
        return new AddedThread({...result.rows[0] });
    }

    async getThreadById(threadId) {
        const query = {
            text: 'SELECT threads. *, users.username AS username FROM threads JOIN users ON threads.owner = users.id WHERE threads.id = $1',
            values: [threadId],
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('THREAD_IS_NOT_FOUND');
        }
        return new DetailThread({
            ...result.rows[0],
            date: new Date(result.rows[0].date).toISOString(),
        });
    }
}

module.exports = ThreadRepositoryPostgres;