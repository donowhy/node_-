package toyproject.todoList.domain.chat.controller;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.chat.entity.ChatDocument;
import toyproject.todoList.domain.chat.entity.ChatRoom;
import toyproject.todoList.domain.chat.repository.ChatRepository;
import toyproject.todoList.domain.chat.repository.ChatRoomRepository;
import toyproject.todoList.domain.chat.service.ChatRoomService;
import toyproject.todoList.domain.chat.service.dto.ChatRequest;
import toyproject.todoList.domain.chat.service.dto.ChatResponse;
import toyproject.todoList.domain.chat.service.dto.RoomsResponseDto;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:3001")
@RequestMapping(value = "/api/chat")
@Slf4j
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final ChatRoomService chatRoomService;

    // 채팅방 개설
    @PostMapping(value = "/room")
    public void create(@RequestBody String chatRoomName) {
        log.info("# Create Chat Room, name: [{}]", chatRoomName);
        chatRoomService.registerRoom(chatRoomName);
    }

    // 채팅방 입장
    @PostMapping("/{roomId}")
    public void enterRoom(@PathVariable("roomId") String roomId, @MemberInfo MembersInfo membersInfo){
        chatRoomService.enterRoom(roomId, membersInfo.getId());
    }

    // 모든 채팅방 조회
    @GetMapping("/rooms")
    @Transactional
    public List<ChatRoomDto> allrooms () {
        return chatRoomService.allrooms();
    }
}
