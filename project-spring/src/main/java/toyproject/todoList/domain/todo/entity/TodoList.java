package toyproject.todoList.domain.todo.entity;

import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.todo.entity.enumType.Important;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoList extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Enumerated(EnumType.STRING)
    private Important important;

    private boolean checked;

    private LocalDate localDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Builder
    public TodoList(Long id, String content, Important important, boolean checked, Member member) {
        this.id = id;
        this.content = content;
        this.important = important;
        this.checked = checked;
        this.member = member;
    }

    public void setCheckTodo() {
        this.checked = !this.checked;
    }
}
