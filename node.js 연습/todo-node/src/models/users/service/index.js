import database from "../../../database";

export class MemberService {
    async checkMemberByEmail(email) {
        const member = await database.member.findFirst({
            where: {
                email,
            },
        });

        if (!member) return false;

        return member;
    }

    async findMemberById(id) {
        const member = await database.member.findFirst({
            where: {
                id,
            },
        });

        if (!member) throw { status: 404, message: "유저를 찾을 수 없습니다." };
        return member;
    }

    async findMembers({ skip, take }) {
        const members = await database.member.findMany({
            where: {},
            skip,
            take,
        });

        const count = await database.member.count();

        return {
            members,
            count,
        };
    }

    async createMember(props) {
        const newMember = await database.member.create({
            data: {
                login_id: props.login_id,
                email: props.email,
                nickname: props.nickname,
                open_privacy: false,
                password: props.password,
                create_time: getCurrentTimeFormatted(),
                update_time: getCurrentTimeFormatted(),
            },
        });

        return newMember.id;
    }
}

function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
