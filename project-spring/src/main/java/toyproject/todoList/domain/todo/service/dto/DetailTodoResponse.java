package toyproject.todoList.domain.todo.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import toyproject.todoList.domain.todo.entity.enumType.Important;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class DetailTodoResponse {

    private String content;

    private Important important;

    private LocalDate localDate;
}
