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
import toyproject.todoList.domain.chat.service.ChatService;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;


@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/kafka")
public class ChatController {

    private final KafkaTemplate<String, ChatRequest> kafkaTemplate;
    private final ChatService chatService;

    @PostMapping(value = "/publish/{roomId}")
    public void sendMessage(@PathVariable("roomId") Long roomId, @RequestBody ChatRequest message) {
        log.info("Produce message : " + message.toString());
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get();
            chatService.recordHistory(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/group/{roomId}")
    public ChatRequest broadcastGroupMessage(@Payload ChatRequest message, @DestinationVariable String roomId) {
        log.info("polling via kafka");
        //Sending this message to all the subscribers of this room
        return message;
    }
}