import database from "../../../database";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

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

    async checkMemberByLoginId(login_id) {
        const member = await database.member.findFirst({
            where: {
                login_id,
            },
        });

        if (!member) return false;

        return member;
    }

    async findMemberById(id) {
        const member = await database.member.findUnique({
            where: {
                id,
            },
            include:{
                post : true
            }

        });
        console.log(member);
        console.log("method");

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

    async membersInfo () {
        return database.member.findMany({
            where: {},
        });
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

    async changeNickname(memberId, nickname) {
        const member = await this.findMemberById(memberId);
        console.log("service", member);
        await database.member.update({
            where: {
                id: member.id,
            },
            data: {
                update_time: getCurrentTimeFormatted(),
                nickname: nickname,
            },
        });
    }

    async changePrivacy(memberId) {
        const member = await this.findMemberById(memberId);

        await database.member.update({
            where: {
                id: member.id,
            },
            data: {
                update_time: getCurrentTimeFormatted(),
                open_privacy: true ? false : true,
            },
        });
    }

    async changePassword(memberId, password) {
        const member = await this.findMemberById(memberId);

        await database.member.update({
            where: {
                id: member.id,
            },
            data: {
                password: password,
                update_time: getCurrentTimeFormatted(),
            },
        });
    }
    async updatePassword(originPassword, hashedOriginPassword) {
        const compare = await bcrypt.compare(
            originPassword,
            hashedOriginPassword
        );
        console.log(compare);
        return compare;
    }

    async deleteMember(memberId) {
        const member = await this.findMemberById(memberId);

        await database.member.delete({
            where: {
                id: member.id,
            },
        });
    }
}

function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
