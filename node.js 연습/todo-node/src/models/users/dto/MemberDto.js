export class MemberDto {
    login_id;
    email;

    constructor(member) {
        this.login_id = member.login_id;
        this.email = member.email;
    }
}
