package toyproject.todoList.domain.chat.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.chat.entity.ChatDocument;
import toyproject.todoList.domain.chat.constants.KafkaConstants;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;

import java.time.LocalDateTime;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping(value = "/kafka")
public class ChatController {
    @Autowired
    private KafkaTemplate<String, ChatDocument> kafkaTemplate;

    @PostMapping(value = "/publish")
    public void sendMessage(@RequestBody ChatDocument message) {
        log.info("Produce message : " + message.toString());
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/group")
    public ChatRequest broadcastGroupMessage(@Payload ChatDocument message) {
        return ChatRequest.builder()
                .roomidx(message.getRoomIdx())
                .sender(message.getSenderName())
                .msg(message.getMsg())
                .time(message.getCreatedAt())
                .build();
    }

}