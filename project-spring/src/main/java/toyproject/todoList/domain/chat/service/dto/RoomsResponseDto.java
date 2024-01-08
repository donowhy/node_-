package toyproject.todoList.domain.chat.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class RoomsResponseDto {

    private String roomName;
    private Long roomNumber;
}

