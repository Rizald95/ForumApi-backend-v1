class NewComment {
    constructor(payload) {
        this._verifyPayload(payload);

        const { content, threadId, owner } = payload;
        this.content = content;
        this.threadId = threadId;
        this.owner = owner;
    }

    _verifyPayload(payload) {
        const { content, threadId, owner } = payload;
        if (!content || !threadId || !owner) {
            throw new Error('NEW_COMMENT.NOT_CONTAIN_PROPERTY');
        }
        if (typeof content !== 'string' || typeof threadId !== 'string' || typeof owner !== 'string') {
            throw new Error('NEW_COMMENT.NOT_MEET_DATA_SPECIFICATION');
        }
    }
}

module.exports = NewComment;