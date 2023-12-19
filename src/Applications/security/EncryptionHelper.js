class EncryptionHelper {
    async encryptionPassword(password) {
        throw new Error('ENCRYPTION_PASSWORD.METHOD_NOT_IMPLEMENTED');
    }

    async comparePassword(plain, encrypted) {
        throw new Error('ENCRYPTION_PASSWORD.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = EncryptionHelper;