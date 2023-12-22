import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export class UpdateMemberDTO {
    name;
    phoneNumber;
    email;
    password;
    description;

    constructor(member) {
        this.name = member.name ?? undefined;
        this.phoneNumber = member.phoneNumber ?? undefined;
        this.email = member.email ?? undefined;
        this.password = member.password ?? undefined;
        this.description = member.description;
    }

    async updatePassword() {
        this.password = await bcrypt.hash(password, process.env.PASSWORD_SALT);
    }
}
