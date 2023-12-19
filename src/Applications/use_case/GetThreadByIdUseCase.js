class getThreadByIdUseCase {
    constructor({ commentRepository, threadRepository, likeRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(threadId) {
        const thread = await this._threadRepository.getThreadById(threadId);
        let comments = await this._commentRepository.getCommentByThreadId(threadId);

        comments = comments.map((comment) => ({
            id: comment.id,
            username: comment.username,
            date: comment.date,
            content: comment.is_deleted ? '**Komentar telah dihapus**' : comment.content,
        }));

        return {
            ...thread,
            comments,
        };
    }
}

module.exports = getThreadByIdUseCase;