import database from "../../../database";

export class MemberService {
    // findById, findMany, create, update, delete

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

    async updateMember(id, props) {
        const isExist = await database.member.findUnique({
            where: {
                id,
            },
        });

        if (!isExist)
            throw { status: 404, message: "유저를 찾을 수 없습니다." };
        if (props.password) {
            await props.updatePassword();
        }

        await database.member.update({
            where: {
                id: isExist.id,
            },
            data: {
                name: props.name,
                email: props.email,
                phoneNumber: props.phoneNumber,
                password: props.password,
                description: props.description,
            },
        });
    }

    async deleteMember(id) {
        const isExist = await database.member.findUnique({
            where: {
                id,
            },
        });

        if (!isExist)
            throw { status: 404, message: "유저를 찾을 수 없습니다." };

        await database.member.delete({
            where: {
                id: isExist.id,
            },
        });
    }
}

function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
