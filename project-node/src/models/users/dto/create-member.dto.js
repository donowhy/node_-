export class CreateMemberDTO {
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
}
