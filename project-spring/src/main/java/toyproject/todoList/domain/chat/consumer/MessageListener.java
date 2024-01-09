package toyproject.todoList.domain.chat.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import toyproject.todoList.domain.chat.constants.KafkaConstants;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;

@Slf4j
@Component
public class MessageListener {

    @Autowired
    SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(ChatRequest message) {
        log.info("sending via kafka listener..");
        template.convertAndSend("/topic/group/" + message.getRoomId(), message);
        log.info(" url : /topic/group/{}",message.getRoomId());
    }

}