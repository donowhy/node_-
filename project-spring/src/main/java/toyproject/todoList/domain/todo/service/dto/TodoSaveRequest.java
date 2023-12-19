package toyproject.todoList.domain.todo.service.dto;

import toyproject.todoList.domain.todo.entity.enumType.Important;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoSaveRequest {

    private String content;

    private Important important;

    private LocalDate localDate;
}
