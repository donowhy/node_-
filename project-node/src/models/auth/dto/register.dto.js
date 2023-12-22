import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class RegisterDTO {
    loginId;
    nickname;
    email;
    password;

    constructor(member) {
        this.loginId = member.loginId;
        this.nickname = member.nickname;
        this.email = member.email;
        this.password = member.password;
    }

    async hashPassword() {
        const hashedPassword = await bcrypt.hash(
            this.password,
            Number(process.env.PASSWORD_SALT)
        );

        return hashedPassword;
    }
}
