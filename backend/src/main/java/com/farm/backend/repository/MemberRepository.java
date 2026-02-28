package com.farm.backend.repository;

import com.farm.backend.domain.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemberRepository extends MongoRepository<Member, String> {

    boolean existsByEmail(String email);
    boolean existsByUserId(String userId);

    Member findByUserId(String userId);
    Member findByEmail(String email);

    // 아이디 찾기 (이름 + 이메일)
    Member findByNameAndEmail(String name, String email);

    // 비밀번호 찾기 (이름 + 아이디 + 이메일)
    Member findByNameAndUserIdAndEmail(String name, String userId, String email);
}
