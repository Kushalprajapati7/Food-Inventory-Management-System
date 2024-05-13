import * as yup from 'yup';
import { IUser } from '../Interfaces/userInterface';

export class UserValidation {
  public static userValidationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
    role: yup.string().oneOf(['user', 'admin']).default('user'),
  });

  public static async validateUser(user: IUser): Promise<void> {
    await this.userValidationSchema.validate(user, { abortEarly: false });
  }
}
