const EncryptionHelper = require('../EncryptionHelper');

describe('Encryption Password interface', () => {
    it(' should throw error when invoke abstract behavior', async() => {
        //Arrange
        const encryptionPassword = new EncryptionHelper();

        // Action & Assert
        await expect(encryptionPassword.encryptionPassword('dummy_password')).rejects.toThrowError('ENCRYPTION_PASSWORD.METHOD_NOT_IMPLEMENTED');
        await expect(encryptionPassword.comparePassword('plain', 'encrypted')).rejects.toThrowError('ENCRYPTION_PASSWORD.METHOD_NOT_IMPLEMENTED');
    });
});