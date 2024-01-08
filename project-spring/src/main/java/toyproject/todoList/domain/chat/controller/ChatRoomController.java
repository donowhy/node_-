package toyproject.todoList.domain.chat.controller;


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
@RequestMapping(value = "/api/chat")
@Slf4j
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;

    // 채팅방 목록 조회
    @GetMapping("/rooms")
    public List<RoomsResponseDto> rooms() {
        List<ChatRoom> allRooms = chatRoomRepository.findAllRooms();

        List<RoomsResponseDto> names = new ArrayList<>();

        for (ChatRoom room : allRooms) {
            RoomsResponseDto dto = RoomsResponseDto.builder()
                    .roomName(room.getRoomId())
                    .roomNumber(room.getId())
                    .build();

            names.add(dto);
        }

        return names;
    }

    // 채팅방 개설
    @PostMapping(value = "/room")
    public Integer create(@RequestBody String name) {
        log.info("# Create Chat Room, name: [{}]", name);

        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(name)
                .build();

        chatRoomRepository.save(chatRoom);

        return chatRoom.getId();
    }

    @GetMapping("/room/{roomId}/{page}")
    public ChatResponse getRoom(@PathVariable Integer roomId, @MemberInfo MembersInfo membersInfo,
                                @PathVariable int page) {
        log.info("# get Char Room, roomId = [{}]", roomId);

        Pageable pageable = PageRequest.of(page - 1, 50);
        Page<ChatDocument> chatDocuments = chatRepository.findByRoomIdxOrderByCreatedAtDesc(roomId, pageable);

        List<ChatRequest> chatRequests = chatDocuments.getContent().stream()
                .map(this::convertToChatRequest)
                .collect(Collectors.toList());


        return ChatResponse.builder()
                .contents(chatRequests)
                .currentPage(chatDocuments.getNumber() + 1)
                .totalPage(chatDocuments.getTotalPages())
                .build();
    }

    private ChatRequest convertToChatRequest(ChatDocument chatDocument) {

        return ChatRequest.builder()
                .roomidx(chatDocument.getRoomIdx())
                .sender(chatDocument.getSenderName())
                .msg(chatDocument.getMsg())
                .time(chatDocument.getCreatedAt())
                .build();
    }
}
