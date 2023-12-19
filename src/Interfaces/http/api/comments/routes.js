const routes = (handler) => ([{
        method: 'POST',
        path: '/threads/{threadId}/comments',
        handler: handler.postCommentByThreadIdHandler,
        options: {
            auth: 'forum_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}',
        handler: handler.deleteCommentByIdHandler,
        options: {
            auth: 'forum_jwt',
        },
    },
]);

module.exports = routes;