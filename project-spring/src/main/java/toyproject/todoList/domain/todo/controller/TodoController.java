package toyproject.todoList.domain.todo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.todo.service.TodoService;
import toyproject.todoList.domain.todo.service.dto.*;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping("/save")
    public void saveTodayTodo(@RequestBody TodoSaveRequest request, @MemberInfo MembersInfo membersInfo) {
        todoService.saveTodayTodo(request, membersInfo.getId());
    }

    @PatchMapping("/update")
    public void changeTodoState(@RequestBody DoneMyTodoRequest request, @MemberInfo MembersInfo membersInfo) {
        todoService.changeTodoState(request, membersInfo.getId());
    }


    @DeleteMapping("/delete")
    public void delete(@RequestBody TodoDeleteRequest request,  @MemberInfo MembersInfo membersInfo) {
        todoService.delete(request, membersInfo.getId());

    }

    @GetMapping("/today")
    public List<DetailTodoResponse> getTodoToday(@RequestParam("start-date") LocalDate startDate, @RequestParam("end-date") LocalDate endDate, @MemberInfo MembersInfo membersInfo) {
        return todoService.getTodoToday(startDate, endDate, membersInfo.getId());
    }


}
