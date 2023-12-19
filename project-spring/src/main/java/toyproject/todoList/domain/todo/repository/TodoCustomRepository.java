package toyproject.todoList.domain.todo.repository;

import org.springframework.data.repository.query.Param;
import toyproject.todoList.domain.todo.service.dto.DetailTodoResponse;

import java.time.LocalDate;
import java.util.List;

public interface TodoCustomRepository {

    List<DetailTodoResponse> getTodoToday(@Param("startdate") LocalDate startdate,@Param("enddate") LocalDate endDate,@Param("id") Long id);
}
