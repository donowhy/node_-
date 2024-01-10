export class MemberDto {
    login_id;
    nickname;
    id;
    open_privacy;
    post;

    constructor(member) {
        this.login_id = member.login_id;
        this.nickname = member.nickname;
        this.id = member.id;
        this.open_privacy = member.open_privacy;
        this.post = member.post;
    }
}
