import { Router } from "express";
import { pagination } from "../../../middleware";

import { MemberDto } from "../dto";
import { MemberService } from "../service";
import { log } from "../../../middleware";

// Router
class MemberController {
    router;
    path = "/members";
    memberService;
    authRequired = true;

    // 생성자
    constructor() {
        this.router = Router();
        this.memberService = new MemberService();
        this.init();
    }

    // 라우터 init
    init() {
        this.router.get("/", pagination, this.getMembers.bind(this));
        this.router.get("/detail/:id", this.getMember.bind(this));
        this.router.patch("/nickname", this.changeNickname.bind(this));
        this.router.patch("/password", this.changePassword.bind(this));
        this.router.patch("/privacy", this.changePrivacy.bind(this));
        this.router.delete("/un-register", this.deleteMember.bind(this));
    }

    async getMembers(req, res, next) {
        try {
            const { members: members, count } =
                await this.memberService.findMembers({
                    skip: req.skip,
                    take: req.take,
                });

            res.status(200).json({
                members: members.map((member) => new MemberDto(member)),
                count,
            });
        } catch (err) {
            next(err);
        }
    }

    async getMember(req, res, next) {
        try {
            const { id } = req.params;
            let memberId = parseInt(id, 10);
            const member = await this.memberService.findMemberById(memberId);
            console.log(member);
            console.log("controller");
            res.status(200).json({ member: new MemberDto(member) });
        } catch (err) {
            next(err);
        }
    }

    async changeNickname(req, res, next) {
        try {
            console.log(req.body.nickname);

            console.log(req.member.id);
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };
            await this.memberService.changeNickname(
                req.member.id,
                req.body.nickname
            );

            res.status(204).json(req.member.id);
        } catch (err) {
            next(err);
        }
    }

    async changePrivacy(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };
            await this.memberService.changePrivacy(req.member.id);

            res.status(204).json(req.member.id);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };

            console.log(req.body.originPassword, `\n`, req.member.password);
            const isPasswordValid = await this.memberService.updatePassword(
                req.body.originPassword,
                req.member.password
            );

            if (!isPasswordValid) {
                throw { status: 403, message: "비밀번호가 다릅니다." };
            }

            await this.memberService.changePassword(
                req.member.id,
                req.body.password
            );

            res.status(204).json(req.member.id);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async deleteMember(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };

            await this.memberService.deleteMember(req.member.id);
            res.stauts(204).json(req.member.id);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

const memberController = new MemberController();
export default memberController;
