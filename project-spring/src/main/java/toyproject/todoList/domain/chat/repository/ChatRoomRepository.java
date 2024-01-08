package toyproject.todoList.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import toyproject.todoList.domain.chat.entity.ChatRoom;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    @Query("select m from ChatRoom  m")
    List<ChatRoom> findAllRooms();

    Optional<ChatRoom> findChatRoomById(Long id);

}

