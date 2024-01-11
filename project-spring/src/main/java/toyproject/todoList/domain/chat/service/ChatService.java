package toyproject.todoList.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import toyproject.todoList.domain.chat.constants.KafkaConstants;
import toyproject.todoList.domain.chat.entity.ChatDocument;
import toyproject.todoList.domain.chat.entity.ChatRoom;
import toyproject.todoList.domain.chat.repository.ChatRepository;
import toyproject.todoList.domain.chat.repository.ChatRoomRepository;
import toyproject.todoList.domain.chat.service.dto.ChatDocumentDto;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final KafkaTemplate<String, ChatRequest> kafkaTemplate;
    private final MemberRepository memberRepository;

    @Transactional
    public void recordHistory(ChatRequest request) {
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(request.getRoomId()).orElseThrow();
        ChatDocument chatDocument = ChatDocument.builder()
                .chatRoom(chatRoom)
                .senderName(request.getSender())
                .msg(request.getMsg())
                .build();
        chatRepository.save(chatDocument);
    }

    @Transactional
    public void sendMessage(String roomId, ChatRequest request) throws ExecutionException, InterruptedException {
        if(!roomId.equals( request.getRoomId())) {
            throw new RuntimeException();
        }
        kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, request).get();
        log.info("kafka, {}", kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, request).get());
        recordHistory(request);
    }

    @Transactional(readOnly = true)
    public List<ChatDocumentDto> chat (String roomId, Integer memberId) {
        List<ChatDocument> byRoomIdxOrder = chatRepository.RoomIdx(roomId);
        Member member = memberRepository.findById(memberId).orElseThrow();

        return byRoomIdxOrder.stream()
                .map(chatDocument -> ChatDocumentDto.builder()
                        .roomID(chatDocument.getChatRoom().getRoomId())
                        .sendername(member.getNickname())
                        .msg(chatDocument.getMsg())
                        .createAt(chatDocument.getCreatedAt())
                        .build())
                .toList();
    }
}

