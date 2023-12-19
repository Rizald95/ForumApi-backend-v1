const DeleteCommentsUseCase = require('../../../../Applications/use_case/DeleteCommentsUseCase');
const ThreadsUseCase = require('../../../../Applications/use_case/ThreadsUseCase');

class CommentsHandler {
    constructor(container) {
        this._container = container;
        this.postCommentByThreadIdHandler = this.postCommentByThreadIdHandler.bind(this);
        this.deleteCommentByIdHandler = this.deleteCommentByIdHandler.bind(this);
    }

    async postCommentByThreadIdHandler(request, h) {
        const addCommentsUseCase = this._container.getInstance(ThreadsUseCase.name);
        const { id: userId } = request.auth.credentials;
        const { threadId } = request.params;
        const addedComments = await addCommentsUseCase.addCommentByThreadId(request.payload, { userId, threadId });

        return h.response({
            status: 'success',
            data: {
                addedComments,
            },
        }).code(201);
    }

    async deleteCommentByIdHandler(request, h) {
        const deleteCommentsUseCase = this._container.getInstance(ThreadsUseCase.name);
        const { id: userId } = request.auth.credentials;
        const { threadId, commentId } = request.params;
        await deleteCommentsUseCase.deleteComment({ commentId, threadId, userId });
        return h.response({
            status: 'success',
        });
    }
}

module.exports = CommentsHandler;