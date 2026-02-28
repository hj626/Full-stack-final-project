package com.farm.backend.repository;

import com.farm.backend.domain.TestDoc;
import org.springframework.data.mongodb.repository.MongoRepository;

//DAO 역할 저장, 조회, 수정, 삭제 등 (DAO 따로 만들 필요 없음)
public interface TestDocRepository extends MongoRepository<TestDoc, String> {
}
