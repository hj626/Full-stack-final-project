package com.farm.backend.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "test_docs")
public class TestDoc {

    @Id
    private String id;

    private String message;

    public TestDoc(String message) {
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }
}
