package com.farm.backend.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "member")
public class Member {

    @Id
    private String id;   // MongoDB ObjectId (String으로 받는 게 관리 쉬움)

    @Indexed(unique = true)
    private String userId;

    private String password;

    private String name;
    private String nickname;

    private String phone;

    @Indexed(unique = true)
    private String email;

    private String provider = "normal";  // default normal (일반로그인)
    private boolean isDeleted = false;
}
