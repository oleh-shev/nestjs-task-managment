import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('should return true as password is valid', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      bcrypt.hash.mockReturnValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
      expect(result).toEqual(true);
    });

    it('should return false as password is invalid', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      bcrypt.hash.mockReturnValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('wrongPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});