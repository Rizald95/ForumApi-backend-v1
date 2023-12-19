const ThreadUseCase = require('../../../../Applications/use_case/ThreadsUseCase');
const ThreadsUseCase = require('../../../../Applications/use_case/ThreadsUseCase');

class ThreadsHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this);
        this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
    }

    async postThreadHandler(request, h) {
        const addThreadsUseCase = this._container.getInstance(ThreadsUseCase.name);
        const {
            id: userId
        } = request.auth.credentials;
        const payload = {
            title: request.payload.title,
            body: request.payload.body,
            owner,
        };

        const addedThread = await addThreadsUseCase.addThread(request.payload, userId);
        return h.response({
            status: 'success',
            data: {
                addedThread,
            },
        }).code(201);
    }

    async getThreadByIdHandler(request, h) {
        const getThreadUseCase = this._container.getInstance(ThreadUseCase.name);

        const { threadId } = request.params;
        const thread = await getThreadUseCase.getThreadById(threadId);
        return h.response({
            status: 'success',
            data: {
                thread,
            },
        });
    }
}

module.exports = ThreadsHandler;