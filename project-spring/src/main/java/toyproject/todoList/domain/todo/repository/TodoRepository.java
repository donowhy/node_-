package toyproject.todoList.domain.todo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import toyproject.todoList.domain.todo.entity.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<TodoList, Integer>, TodoCustomRepository {

}
