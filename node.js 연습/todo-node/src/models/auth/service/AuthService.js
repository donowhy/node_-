import { MemberService } from "../../members/service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthService {
    memberService;

    constructor() {
        this.memberService = new MemberService();
    }

    // props : RegisterDTO
    async register(props) {
        const isExist = await this.memberService.checkMemberByEmail(
            props.email
        );

        if (isExist)
            throw { status: 400, message: "이미 존재하는 이메일입니다." };

        const newUserId = await this.memberService.createMember({
            login_id: props.login_id,
            nickname: props.nickname,
            email: props.email,
            password: await props.hashPassword(),
            create_time: getCurrentTimeFormatted(),
            update_time: getCurrentTimeFormatted(),
        });

        return {};
    }

    // props : LoginDTO
    async login(props) {
        const isExist = await this.memberService.checkMemberByLoginId(
            props.login_id
        );

        console.log(isExist);

        if (!isExist)
            throw { status: 404, message: "유저가 존재하지 않습니다." };

        const isCorrect = await props.comparePassword(isExist.password);
        console.log(isCorrect);
        if (!isCorrect)
            throw { status: 400, message: "비밀번호를 잘못 입력하였습니다." };

        const accessToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
            expiresIn: "14h",
        });
        const refreshToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
            expiresIn: "14d",
        });

        console.log(accessToken);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refresh(accessToken, refreshToken) {
        const accessTokenPayload = jwt.verify(
            accessToken,
            process.env.JWT_KEY,
            {
                ignoreExpiration: true,
            }
        );
        const refreshTokenPayload = jwt.verify(
            refreshToken,
            process.env.JWT_KEY
        );

        if (accessTokenPayload.id !== refreshTokenPayload.id) {
            throw { status: 403, message: "권한이 없습니다." };
        }

        const user = await this.memberService.findMemberById(
            accessTokenPayload.id
        );

        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "2h",
        });
        const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "14d",
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}

function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
