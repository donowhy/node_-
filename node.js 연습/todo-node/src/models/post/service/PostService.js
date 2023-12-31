import database from "../../../database";
import { MemberService } from "../../members/service";
import { PostDto, PostsDto } from "../dto";

export class PostService {
    memberService;

    constructor() {
        this.memberService = new MemberService();
    }

    // CreatePostDto.js
    async savePost(title, content, tags, memberId) {
        const member = await this.memberService.findMemberById(memberId);

        const newPost = await database.post.create({
            data: {
                title: title,
                content: content,
                member: {
                    connect: {
                        id: member.id,
                    },
                },
                tag: {
                    createMany: {
                        data: tags.map((tag) => ({
                            name: tag,
                        })),
                    },
                },
                create_time: getCurrentTimeFormatted(),
                update_time: getCurrentTimeFormatted(),
                views: 0,
            },
        });
        console.log(newPost);
        return newPost.id;
    }

    async getPost(id, memberInfo) {
        console.log(memberInfo);
        const member = await this.memberService.findMemberById(memberInfo.id);
        const post = await database.post.findUnique({
            where: {
                id,
            },

            include: {
                member: true,
                comment: {
                    include: {
                        member: true,
                        re_comment: {
                            include: {
                                member: true,
                            },
                        },
                    },
                },
                tag: true,
                like_post: true,
            },
        });

        if (!post) {
            throw { status: 404, message: "게시물을 찾을 수 없습니다." };
        }

        await database.post.update({
            where: {
                id,
            },
            data: {
                views: post.views + 1,
            },
        });

        return new PostDto({ ...post, views: post.views + 1 }, member);
    }

    async getPosts({ skip, take }, searchValue) {
        const posts = await database.post.findMany({
            where: {
                title: {
                    contains: searchValue ?? "",
                },
            },
            include: {
                member: true,
            },
            skip,
            take,
            orderBy: {
                create_time: "desc",
            },
        });

        const count = await database.post.count({
            where: {
                title: {
                    contains: searchValue,
                },
            },
        });

        return { posts: posts.map((post) => new PostsDto(post)), count };
    }

    async deletePost(postId, member) {
        const post = await database.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };
        console.log(Number(post.member_id) !== Number(member.id));
        if (Number(post.member_id) !== Number(member.id))
            throw { status: 404, message: "삭제 권한이 없습니다." };

        await database.post.delete({
            where: {
                id: post.id,
            },
        });
    }

    async updatePost(postId, props, member) {
        const post = await database.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };

        if (post.member_id !== member.id)
            throw { status: 403, message: "본인글만 수정이 가능합니다." };

        if (props.tag) {
            // 1) 태그를 모두 삭제하고, 새로 수정한 태그로 교체
            // 2) 기존에 있는 태그에서 중복되는 값만 제외하고 교체

            await database.tag.deleteMany({
                where: {
                    post_id: post.id,
                },
            });

            await database.tag.createMany({
                data: props.tag.map((t) => ({
                    name: t,
                    post_id: post.id,
                })),
            });
        }

        await database.post.update({
            where: {
                id: post.id,
            },
            data: {
                title: props.title,
                content: props.content,
            },
        });
    }

    async postLike(id, memberId) {
        const member = await this.memberService.findMemberById(memberId);
        const post = await database.post.findUnique({
            where: {
                id: id,
            },
        });

        const existingLike =
            await database.$queryRaw`SELECT * FROM like_post WHERE member_id = ${member.id} AND post_id = ${post.id}`;

        console.log(existingLike && !existingLike.length > 0);

        if (existingLike && existingLike.length > 0) {
            return "이미 좋아요 하셨습니다.";
        }


        await database.like_post.create({
            data: {
                member: {
                    connect: {
                        id: member.id,
                    },
                },
                post: {
                    connect: {
                        id: post.id,
                    },
                },
                create_time: getCurrentTimeFormatted(),
                update_time: getCurrentTimeFormatted(),
            },
        });
    }

    async deletePostLike(id, memberId) {
        const member = await this.memberService.findMemberById(memberId);
        const post = await database.post.findUnique({
            where: {
                id: id,
            },
        });

        const likes = await database.like_post.findMany({
            where: {
                member_id: member.id,
                post_id: post.id,
            },
        });

        console.log(likes);

        await database.like_post.delete({
            where: {
                id: likes[0].id,
            },
        });
    }
}

function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
