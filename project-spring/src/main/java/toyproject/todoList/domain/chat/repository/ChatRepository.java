package toyproject.todoList.domain.chat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import toyproject.todoList.domain.chat.entity.ChatDocument;

public interface ChatRepository extends JpaRepository<ChatDocument, Long> {
    Page<ChatDocument> findByRoomIdxOrderByCreatedAtDesc(Long roomdx, Pageable pageable);
}
