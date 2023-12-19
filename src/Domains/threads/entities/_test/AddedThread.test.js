const AddedThread = require('../AddedThread');

describe('AddedThread', () => {
    describe('constructor', () => {
        it('should create an instance of AddedThread with valid payload', () => {
            const payload = {
                id: 'thread-123',
                title: 'Test Title',
                owner: 'user-123',
            };
            const addedThread = new AddedThread(payload);

            expect(addedThread.id).toBe(payload.id);
            expect(addedThread.title).toBe(payload.title);
            expect(addedThread.owner).toBe(payload.owner);
        });

        it('should throw an error if payload is missing a property', () => {
            const invalidPayload = {
                id: 'thread-123',
                title: 'Test Title',
                // Missing owner property
            };

            expect(() => new AddedThread(invalidPayload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_PROPERTY');
        });

        it('should throw an error if payload properties do not meet data specification', () => {
            const invalidPayload = {
                id: 'thread-123',
                title: 123, // title should be a string
                owner: 'user-123',
            };

            expect(() => new AddedThread(invalidPayload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_SPECIFICATION');
        });
    });
});