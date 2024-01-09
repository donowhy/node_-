package toyproject.todoList.domain.chat.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import toyproject.todoList.domain.chat.entity.ChatDocument;
import toyproject.todoList.domain.chat.repository.ChatRepository;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    @Transactional
    public void recordHistory(ChatRequest request) {

        ChatDocument chatDocument = ChatDocument.builder()
                .roomIdx(request.getRoomId())
                .senderName(request.getSender())
                .msg(request.getMsg())
                .build();
        chatRepository.save(chatDocument);
    }
}

