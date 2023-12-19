const NewComment = require('../NewComment');

describe('NewComment', () => {
    it('should create a new comment instance with valid payload', () => {
        const payload = {
            content: 'This is a test comment',
            threadId: 'thread123',
            owner: 'user123',
        };

        const comment = new NewComment(payload);

        expect(comment.content).toBe(payload.content);
        expect(comment.threadId).toBe(payload.threadId);
        expect(comment.owner).toBe(payload.owner);
    });

    it('should throw an error when payload is missing properties', () => {
        const invalidPayload = {
            content: 'This is a test comment',
        };

        expect(() => new NewComment(invalidPayload)).toThrow('NEW_COMMENT.NOT_CONTAIN_PROPERTY');
    });

    it('should throw an error when payload properties do not meet data specification', () => {
        const invalidPayload = {
            content: 123, // Invalid data type
            threadId: 'thread123',
            owner: 'user123',
        };

        expect(() => new NewComment(invalidPayload)).toThrow('NEW_COMMENT.NOT_MEET_DATA_SPECIFICATION');
    });
});