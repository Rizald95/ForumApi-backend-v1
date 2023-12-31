const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const EncryptionHelper = require('../../security/EncryptionHelper');
const AddUserUseCase = require('../AddUserUseCase');

describe('AddUserUseCase', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it('should orchestrating the add user action correctly', async() => {
        // Arrange
        const useCasePayload = {
            username: 'dicoding',
            password: 'secret',
            fullname: 'Dicoding Indonesia',
        };

        const mockRegisteredUser = new RegisteredUser({
            id: 'user-123',
            username: useCasePayload.username,
            fullname: useCasePayload.fullname,
        });

        /** creating dependency of use case */
        const mockUserRepository = new UserRepository();
        const mockEncryptionHelper = new EncryptionHelper();

        /** mocking needed function */
        mockUserRepository.verifyAvailableUsername = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockEncryptionHelper.encryptionPassword = jest.fn()
            .mockImplementation(() => Promise.resolve('encrypted_password'));
        mockUserRepository.addUser = jest.fn()
            .mockImplementation(() => Promise.resolve(mockRegisteredUser));

        /** creating use case instance */
        const getUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            EncryptionHelper: mockEncryptionHelper,
        });

        const registeredUser = await getUserUseCase.execute(useCasePayload);

        expect(registeredUser).toStrictEqual(mockRegisteredUser);
        expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
        expect(mockEncryptionHelper.encryptionPassword).toBeCalledWith(useCasePayload.password);
        expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
            username: useCasePayload.username,
            password: 'encrypted_password',
            fullname: useCasePayload.fullname,
        }));
    });
});