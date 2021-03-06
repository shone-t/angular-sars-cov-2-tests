export class User {
  uuid: string | undefined;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  name?: string | undefined;
  confirmPassword?: string | undefined;
  token?: string | undefined;
  isDeleting?: boolean | undefined;
}
