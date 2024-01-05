import bcrypt from "bcryptjs";

export class LoginDTO {
  login_id;
  password;

  constructor(props) {
    this.login_id = props.login_id;
    this.password = props.password;
  }

  async comparePassword(password) {
    return await bcrypt.compare(this.password, password);

  }
}
