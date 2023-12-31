import { CreateMemberDTO as CreateMemberDTO } from "../../users/dto";
import { MemberService } from "../../users/service";
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

        const newUserId = await this.memberService.createMember(
            new CreateMemberDTO({
                ...props,
                password: await props.hashPassword(),
            })
        );

        const accessToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY, {
            expiresIn: "2h",
        });
        const refreshToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY, {
            expiresIn: "14d",
        });

        return { accessToken, refreshToken };
    }

    // props : LoginDTO
    async login(props) {
        const isExist = await this.memberService.checkMemberByEmail(
            props.email
        );

        if (!isExist)
            throw { status: 404, message: "유저가 존재하지 않습니다." };

        const isCorrect = await props.comparePassword(isExist.password);

        if (!isCorrect)
            throw { status: 400, message: "비밀번호를 잘못 입력하였습니다." };

        const accessToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
            expiresIn: "2h",
        });
        const refreshToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
            expiresIn: "14d",
        });

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
