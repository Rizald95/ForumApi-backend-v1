/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"threads"'
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        date: {
            type: 'DATE',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        is_deleted: {
            type: 'BOOLEAN',
            notNull: true,
            defaultValue: false,
        },

    });
    pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
    pgm.addConstraint('comments', 'fk_comments.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.createIndex('comments', 'owner');
    pgm.createIndex('comments', 'thread_id');
};

exports.down = (pgm) => {
    pgm.dropTable('comments');
    pgm.dropConstraint('comments', 'fk_comments.thread_id_threads.id');
    pgm.dropConstraint('comments', 'fk_comments.owner_users.id');
    pgm.dropIndex('comments', 'owner');
    pgm.dropIndex('comments', 'thread_id');
};