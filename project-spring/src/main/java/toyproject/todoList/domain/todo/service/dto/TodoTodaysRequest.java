package toyproject.todoList.domain.todo.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoTodaysRequest {

    private LocalDate localDate;
}
