package toyproject.todoList.domain.todo.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import toyproject.todoList.domain.todo.service.dto.DetailTodoResponse;

import java.time.LocalDate;
import java.util.List;

@Repository
public class TodoCustomRepositoryImpl implements TodoCustomRepository {

    // 회원 100명 -> 그에 따른 각 쿼리 + N
    // 상황 : 회원과 팀이 있을 때, 회원 A의 팀이 팀 A, 회원 B의 팀이 팀 A, 회원 C의 팀이 팀 B,

    // 그럼 쿼리가 회원 다 들고와서 loop돌다가 팀 A를 들고와서 1차 캐시 적용.
    // 그 후에 팀 B가 영속성 컨텍스트가 없으니까 다시 쿼리 날려서 팀 B를 들고옴.

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<DetailTodoResponse> getTodoToday(LocalDate startdate, LocalDate endDate, Integer id) {

        TypedQuery<DetailTodoResponse> query = entityManager.createQuery(
                "select new toyproject.todoList.domain.todo.service.dto.DetailTodoResponse(t.content, t.important, t.localDate) from TodoList t join t.member m where m.id = :id and t.localDate between :startdate and :endDate",
                DetailTodoResponse.class
        );

        query.setParameter("startdate", startdate);
        query.setParameter("endDate", endDate);
        query.setParameter("id", id);

        return query.getResultList();
    }
}
