export class User {
  id: number;
  name: string;
  password: string;
  email: string;
  role: number;

  get getRoles() {
    return ['ADMINISTRATOR', 'EDITOR'];
  }

  get rolesID() {
    return  [0, 1];
  }

}
