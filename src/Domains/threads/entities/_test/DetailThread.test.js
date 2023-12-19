const DetailThread = require('../DetailThread');

describe('DetailThread', () => {
    describe('constructor', () => {
        it('should create an instance of DetailThread with valid payload', () => {
            const payload = {
                id: 'thread-123',
                title: 'Test Title',
                body: 'Test Body',
                date: '2023-10-13',
                username: 'testuser',
            };
            const detailThread = new DetailThread(payload);

            expect(detailThread.id).toBe(payload.id);
            expect(detailThread.title).toBe(payload.title);
            expect(detailThread.body).toBe(payload.body);
            expect(detailThread.date).toBe(payload.date);
            expect(detailThread.username).toBe(payload.username);
        });

        it('should throw an error if payload is missing a property', () => {
            const invalidPayload = {
                id: 'thread-123',
                title: 'Test Title',
                // Missing body, date, and username properties
            };

            expect(() => new DetailThread(invalidPayload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_PROPERTY');
        });

        it('should throw an error if payload properties do not meet data specification', () => {
            const invalidPayload = {
                id: 'thread-123',
                title: 'Test Title',
                body: 123, // body should be a string
                date: '2023-10-13',
                username: 'testuser',
            };

            expect(() => new DetailThread(invalidPayload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_SPECIFICATION');
        });
    });
});