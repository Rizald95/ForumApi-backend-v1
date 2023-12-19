const AddedComment = require('../AddedComment');

describe('AddedComment', () => {
    describe('constructor', () => {
        it('should create an instance of AddedComment with valid payload', () => {
            const payload = {
                id: 'comment-123',
                content: 'Test Comment',
                owner: 'user-123',
            };
            const addedComment = new AddedComment(payload);

            expect(addedComment.id).toBe(payload.id);
            expect(addedComment.content).toBe(payload.content);
            expect(addedComment.owner).toBe(payload.owner);
        });

        it('should throw an error if payload is missing a property', () => {
            const invalidPayload = {
                id: 'comment-123',
                // Missing content and owner properties
            };

            expect(() => new AddedComment(invalidPayload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_PROPERTY');
        });

        it('should throw an error if payload properties do not meet data specification', () => {
            const invalidPayload = {
                id: 'comment-123',
                content: 123, // content should be a string
                owner: 'user-123',
            };

            expect(() => new AddedComment(invalidPayload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_SPECIFICATION');
        });
    });
});