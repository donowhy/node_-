package toyproject.todoList.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.chat.constants.KafkaConstants;
import toyproject.todoList.domain.chat.entity.ChatDocument;
import toyproject.todoList.domain.chat.repository.ChatRepository;
import toyproject.todoList.domain.chat.service.ChatService;
import toyproject.todoList.domain.chat.service.dto.ChatDocumentDto;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;


@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:3001")
@RequestMapping(value = "/kafka")
public class ChatController {

    private final ChatService chatService;

    @PostMapping(value = "/publish/{roomId}")
    public void sendMessage(@PathVariable("roomId") String roomId,
                            @RequestBody ChatRequest request)
                            throws ExecutionException, InterruptedException {
        log.info("roomid={} ,   {}", roomId, request.getRoomId());
       chatService.sendMessage(roomId, request);
    }
    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/group/{roomId}")
    public ChatRequest broadcastGroupMessage(@Payload ChatRequest message, @DestinationVariable String roomId) {
        return message;
    }

    @GetMapping("/{roomId}")
    public List<ChatDocumentDto> chat (@PathVariable("roomId") String roomId, @MemberInfo MembersInfo membersInfo) {
        return chatService.chat(roomId, membersInfo.getId());

    }
}