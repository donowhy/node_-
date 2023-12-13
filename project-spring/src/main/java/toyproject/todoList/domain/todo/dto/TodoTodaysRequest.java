package toyproject.todoList.domain.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoTodaysRequest {

    private LocalDate localDate;
}
