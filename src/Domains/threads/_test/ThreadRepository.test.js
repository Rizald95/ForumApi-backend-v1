const ThreadRepository = require('../ThreadRepository'); // Sesuaikan path sesuai kebutuhan

describe('ThreadRepository', () => {
    let threadRepository;

    beforeEach(() => {
        // Initialize a new instance of ThreadRepository before each test
        threadRepository = new ThreadRepository();
    });

    it('should throw an error when adding a thread', async() => {
        const newThread = { title: 'Test Thread', content: 'Test content' };
        expect(async() => {
            await threadRepository.addThread(newThread, 'userId');
        }).rejects.toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when verifying a thread', async() => {
        const threadId = 'threadId';
        expect(async() => {
            await threadRepository.verifyThread(threadId);
        }).rejects.toThrow('TTHREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when getting a thread by id', async() => {
        const threadId = 'threadId';
        expect(async() => {
            await threadRepository.getThreadById(threadId);
        }).rejects.toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});