/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('threads', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        body: {
            type: 'TEXT',
            notNull: true,
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"users"'
        },
        date: {
            type: 'DATE',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.addConstraint('threads', 'fk_threads.user_id_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');

    pgm.createIndex('threads', 'owner');
};

exports.down = (pgm) => {
    pgm.dropTable('threads');
    pgm.dropConstraint('threads', 'fk_threads.owner_users.id');
    pgm.dropIndex('threads', 'owner');
};