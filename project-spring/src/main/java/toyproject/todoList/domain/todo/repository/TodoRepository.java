package toyproject.todoList.domain.todo.repository;

import toyproject.todoList.domain.todo.entity.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoList, Long> {
}
