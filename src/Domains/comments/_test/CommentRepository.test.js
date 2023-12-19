const CommentRepository = require('../CommentRepository'); // Sesuaikan path sesuai kebutuhan

describe('CommentRepository', () => {
    let commentRepository;

    beforeEach(() => {
        // Initialize a new instance of CommentRepository before each test
        commentRepository = new CommentRepository();
    });

    it('should throw an error when adding a comment', async() => {
        const newComment = { content: 'Test comment' };
        expect(async() => {
            await commentRepository.addComment(newComment, 'owner', 'threadId');
        }).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when getting comments by threadId', async() => {
        const threadId = 'threadId';
        expect(async() => {
            await commentRepository.getCommentByThreadId(threadId);
        }).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when getting comment owner', async() => {
        const commentId = 'commentId';
        expect(async() => {
            await commentRepository.getCommentOwner(commentId, 'owner');
        }).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when deleting a comment by id', async() => {
        const commentId = 'commentId';
        expect(async() => {
            await commentRepository.deleteCommentById(commentId);
        }).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when verifying available comment in a thread', async() => {
        const commentId = 'commentId';
        const threadId = 'threadId';
        expect(async() => {
            await commentRepository.verifyAvailableCommentInThread(commentId, threadId);
        }).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});