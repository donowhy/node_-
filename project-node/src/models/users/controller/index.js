import { Router } from "express";
import { pagination } from "../../../middleware/pagination";

import { MemberDTO, CreateMemberDTO, UpdateMemberDTO } from "../dto";
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
        this.router.post("/", this.createMember.bind(this));
        this.router.post("/:id", this.updateMember.bind(this));
        this.router.post("/:id", this.deleteMember.bind(this));
    }

    async getMembers(req, res, next) {
        try {
            const { members: members, count } =
                await this.memberService.findMembers({
                    skip: req.skip,
                    take: req.take,
                });

            res.status(200).json({
                members: members.map((member) => new MemberDTO(member)),
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

            res.status(200).json({ member: new MemberDTO(member) });
        } catch (err) {
            next(err);
        }
    }

    async createMember(req, res, next) {
        try {
            const createMemberDto = new CreateMemberDTO(req.body);

            const newMemberId = await this.memberService.createMember(
                createMemberDto
            );

            res.status(201).json({ id: newMemberId });
        } catch (err) {
            next(err);
        }
    }
    async updateMember(req, res, next) {
        try {
            const { id } = req.params;
            const updateMemberDto = new UpdateMemberDTO(req.body);

            await this.memberService.updateMember(id, updateMemberDto);

            res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }

    async deleteMember(req, res, next) {
        try {
            const { id } = req.params;

            await this.memberService.deleteMember(id);

            res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }
}

const memberController = new MemberController();
export default memberController;
