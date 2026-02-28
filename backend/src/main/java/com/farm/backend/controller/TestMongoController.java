package com.farm.backend.controller;

import com.farm.backend.domain.TestDoc;
import com.farm.backend.repository.TestDocRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mongo")
public class TestMongoController {

    private final TestDocRepository repository;

    public TestMongoController(TestDocRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/save")
    public String save() {
        TestDoc doc = new TestDoc("Hello MongoDB!");
        repository.save(doc);
        return "Saved ID: " + doc.getId();
    }

    @GetMapping("/all")
    public List<TestDoc> all() {
        return repository.findAll();
    }
}
