import { Router } from "express";
import { pagination } from "../../../middleware/pagination";

import { MemberDto } from "../dto";
import { MemberService } from "../service";

// Router
class MemberController {
    router;
    path = "/members";
    memberService;

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
            const member = await this.memberService.findMemberById(id);

            res.status(200).json({ member: new MemberDto(member) });
        } catch (err) {
            next(err);
        }
    }
}

const memberController = new MemberController();
export default memberController;
