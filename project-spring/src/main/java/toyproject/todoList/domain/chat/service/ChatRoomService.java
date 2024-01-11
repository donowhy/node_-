package toyproject.todoList.domain.chat.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import toyproject.todoList.domain.chat.controller.ChatRoomDto;
import toyproject.todoList.domain.chat.entity.ChatRoom;
import toyproject.todoList.domain.chat.repository.ChatRoomRepository;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.global.error.ErrorCode;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    // roomId를 매개변수로 받고 체크 후, 인원을 추가한다.
    public void enterRoom (String roomId, Integer memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId).orElseThrow();
        if(chatRoom.getChatMember().contains(member.getId())) {
            throw new IllegalArgumentException("이미 포함된 인원입니다");
        }
        chatRoom.getChatMember().add(member.getId());
    }

    // 현재 생성된 모든 채팅방을 나타내고 채팅방 내에 있는 인원수를 나타낸다.
    public List<ChatRoomDto> allrooms () {
        List<ChatRoom> allRooms = chatRoomRepository.findAllRooms();

        return allRooms.stream()
                .map(allRoom -> ChatRoomDto.builder()
                        .roomId(allRoom.getRoomId())
                        .people(allRoom.getChatMember().size())
                        .build())
                .collect(Collectors.toList());
    }

    // 채팅방 생성
    public void registerRoom (String chatRoomName) {
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(chatRoomName)
                .build();
        chatRoomRepository.save(chatRoom);
    }

}
