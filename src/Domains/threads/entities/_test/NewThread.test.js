const NewThread = require('../NewThread');

describe('NewThread', () => {
    it('should throw error when payload not contain nedded property', () => {
        const payload = {
            title: 'title-123',
        };
        expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_PROPERTY');
    });

    it('should throw error when payload not meet data specification', () => {
        const payload = {
            title: 'title-123',
            body: 1234,
            owner: 'user-123',
        };

        expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_SPECIFICATION');
    });

    it('should create NewThread correctly', () => {
        const payload = {
            title: 'title',
            body: 'body',
            owner: 'user-123',
        };
        const newThread = new NewThread(payload);

        expect(newThread).toBeInstanceOf(NewThread);
        expect(newThread.title).toEqual(payload.title);
        expect(newThread.body).toEqual(payload.body);
        expect(newThread.owner).toEqual(payload.owner);
    });
});