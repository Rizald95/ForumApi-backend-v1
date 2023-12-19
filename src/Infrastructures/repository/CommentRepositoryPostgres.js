const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const AuthorizationError = require('../../Commons/exceptions/AuthenticationError');

class CommentRepositoryPostgres extends CommentRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addCommentByThreadId(newComment) {
        const { content, threadId, owner } = newComment;
        const id = `comment-${this._idGenerator()}`;
        const date = new Date().toISOString;
        const query = {
            text: 'INSERT INTO comments  VALUES ($1, $2, $3, $4, $5) RETURNING id, content, owner',
            values: [id, content, owner, threadId, date],
        };
        const result = await this._pool.query(query);
        return new AddedComment({...result.rows[0] });
    }

    async getCommentByThreadId(threadId) {
        const query = {
            text: `SELECT comments.*, users.username
           FROM comments INNER JOIN users
           ON comments.owner = users.id
           WHERE comments.thread_id = $1
           ORDER BY comments.date ASC`,
            values: [threadId],
        };
        const { rows } = await this._pool.query(query);
        return rows;
    }

    async getCommentOwner(commentId) {
        const query = {
            text: 'SELECT owner FROM comments WHERE id = $1',
            values: [commentId],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('COMMENT_IS_NOT_FOUND');
        }
        return result.rows[0].owner;
    }

    async verifyCommentOwner(commentId, ownerId) {
        const query = {
            text: 'SELECT 1 FROM comments WHERE id = $1 AND owner = $2',
            values: [commentId, ownerId],
        };

        const { rowCount } = await this._pool.query(query);
        if (!rowCount) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
        return rowCount;
    }

    async verifyAvailableCommentInThread(commentId, threadId) {
        const query = {
            text: 'SELECT 1 FROM  comments WHERE id = $1 AND thread_id = $2',
            values: [commentId, threadId],
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('COMMENT_IN_THREAD_NOT_FOUND');
        }
    }

    async deleteCommentById(commentId) {
        const query = {
            text: 'UPDATE comments SET is_deleted = true WHERE id = $1 RETURNING id',
            values: [commentId],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('COMMENT_IS_NOT_FOUND');
        }
    }
}

module.exports = CommentRepositoryPostgres;