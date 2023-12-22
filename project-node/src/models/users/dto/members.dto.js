export class MemberDTO {
    id;
    name;
    phoneNumber;
    email;
    description;

    constructor(member) {
        this.id = member.id;
        this.name = member.name;
        this.phoneNumber = member.phoneNumber;
        this.email = member.email;
        this.description = member.description;
    }
}
