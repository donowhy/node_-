package toyproject.todoList.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import toyproject.todoList.domain.chat.entity.ChatRoom;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    @Query("select m from ChatRoom  m")
    List<ChatRoom> findAllRooms();

    @Query("select room from ChatRoom as room where room.roomId = :roomId")
    Optional<ChatRoom> findChatRoomByRoomId(@Param("roomId") String roomId);


}

