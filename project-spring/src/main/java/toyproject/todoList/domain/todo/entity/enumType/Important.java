package toyproject.todoList.domain.todo.entity.enumType;

public enum Important {
    HIGH("상", "High"),
    MIDDLE("중", "middle"),
    LOW("하", "low");

    private final String key;
    private final String value;

    Important(String key, String value){
        this.key = key;
        this.value = value;
    }

    String getImportant(String key){
        Important important = Important.valueOf(key);
        return important.key;
    }
}
