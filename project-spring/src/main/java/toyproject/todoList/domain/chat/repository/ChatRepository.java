package toyproject.todoList.domain.chat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import toyproject.todoList.domain.chat.entity.ChatDocument;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatDocument, Integer> {

    @Query("select r from ChatDocument r where r.chatRoom.roomId = :roomid")
    List<ChatDocument> RoomIdx(@Param("roomid")String roomidx);
}
