package toyproject.todoList.domain.member.repository;

import toyproject.todoList.domain.member.dto.MemberInfo;
import toyproject.todoList.domain.member.entity.Member;

import java.util.List;

public interface CustomMemberRepository {
    MemberInfo findMemberInfo(Member member);
}
