const AddThreadUseCase = require('./AddThreadUseCase'); // Sesuaikan path sesuai kebutuhan
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NewThread = require('../../Domains/threads/entities/NewThread');
const AddedThread = require('../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
    it('should add a new thread', async() => {
        // Mock the thread repository
        const threadRepository = new ThreadRepository();

        // Create a sample use case payload
        const useCasePayload = {
            title: 'New Thread Title',
            content: 'This is a test thread',
            userId: 'someUserId',
        };

        // Mock the expected behavior of the thread repository
        threadRepository.addThread = jest.fn((newThread) => {
            // Simulate the behavior of the repository by returning the added thread
            return {
                id: 'someThreadId',
                title: newThread.title,
                content: newThread.content,
                userId: newThread.userId,
            };
        });

        // Create an instance of AddThreadUseCase
        const addThreadUseCase = new AddThreadUseCase({
            threadRepository,
        });

        // Execute the use case
        const addedThread = await addThreadUseCase.execute(useCasePayload);

        // Verify that the addThread method was called with the correct payload
        expect(threadRepository.addThread).toHaveBeenCalledWith(
            expect.objectContaining({
                title: useCasePayload.title,
                content: useCasePayload.content,
                userId: useCasePayload.userId,
            })
        );

        // Verify that the addedThread is an instance of AddedThread
        expect(addedThread).toBeInstanceOf(AddedThread);

        // You can add more assertions based on your specific use case
    });
});