package toyproject.todoList.domain.member.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import toyproject.todoList.domain.member.dto.MemberInfo;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.entity.QMember;
import toyproject.todoList.domain.member.service.dto.MemberResponse;
import toyproject.todoList.domain.post.entity.QPost;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class CustomMemberRepositoryImpl implements CustomMemberRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public MemberInfo findMemberInfo(Member member) {
        QMember qMember = QMember.member;
        QPost post = QPost.post;

        log.info("QMember={}", qMember);
        log.info("진짜? ={}",member.equals(qMember));

        List<MemberResponse.PostDto> fetch = queryFactory
                .select(Projections.fields(MemberResponse.PostDto.class,
                        post.title,
                        post.likes.size(),
                        post.views
                ))
                .from(post)
                .where(post.member.id.eq(member.getId()))
                .fetch();


        queryFactory
                .select(Projections.fields(MemberInfo.class,
                       qMember.email,
                       qMember.nickname,
                        qMember.loginId,

                        ))
                .from(qMember)
                .leftJoin(qMember.postList)
                .on(qMember.id.eq(post.member.id))
                .where(qMember.id.eq(member.getId()))
                .fetch();

//        return MemberInfo;
        return new MemberInfo();
    }

}
