package toyproject.todoList.global.jwt;

import java.lang.annotation.*;

@Target({ ElementType.PARAMETER, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MemberInfo {

    boolean required() default true;
}

