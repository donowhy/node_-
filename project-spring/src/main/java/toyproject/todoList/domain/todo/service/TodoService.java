package toyproject.todoList.domain.todo.service;

import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.todo.repository.TodoCustomRepository;
import toyproject.todoList.domain.todo.service.dto.*;
import toyproject.todoList.domain.todo.entity.TodoList;
import toyproject.todoList.domain.todo.entity.enumType.Important;
import toyproject.todoList.domain.todo.repository.TodoRepository;
import toyproject.todoList.global.error.ErrorCode;
import toyproject.todoList.global.exception.BusinessException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;

    public void saveTodayTodo(TodoSaveRequest request, Integer id) {
        Member member = member(id);

        todoRepository.save(TodoList.builder()
                .content(request.getContent())
                .important(request.getImportant())
                .checked(false)
                .member(member)
                .build()
        );
    }

    public void changeTodoState(DoneMyTodoRequest request, Integer id) {
        Member member = member(id);

        List<TodoList> todoList = member.getTodoList();

        for (TodoList list : todoList) {
            isValid(list, list.getContent(), list.getImportant());
            if (request.getLocalDate() == list.getCreateTime().toLocalDate()) {
                list.setCheckTodo();
            }
        }
    }

    private void isValid(TodoList list, String content, Important important) {
        if (!list.getContent().equals(content) || !list.getImportant().equals(important)) {
            throw new BusinessException(ErrorCode.NOT_EXISTS_DIGITAL_PRODUCT);
        }
    }

    public void delete(TodoDeleteRequest request, Integer id) {
        Member member = member(id);
        List<TodoList> todoList = member.getTodoList();

        for (TodoList list : todoList) {
            isValid(list, list.getContent(), list.getImportant());
            if (request.getLocalDate() == list.getCreateTime().toLocalDate()) {
                todoRepository.delete(list);
            }
        }

    }

    public List<DetailTodoResponse> getTodoToday(LocalDate startdate, LocalDate endDate, Integer id) {
        Member member = member(id);
        return todoRepository.getTodoToday(startdate, endDate, id);
    }



    private Member member(Integer id) {
        return memberRepository.findById(id).orElseThrow(()
                -> new BusinessException(ErrorCode.NOT_EXISTS_USER_ID));
    }
}
