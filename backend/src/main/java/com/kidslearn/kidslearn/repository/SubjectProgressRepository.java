
package com.kidslearn.kidslearn.repository;

import com.kidslearn.kidslearn.entity.SubjectProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectProgressRepository
        extends JpaRepository<SubjectProgress, Long> {

    List<SubjectProgress> findByEmail(String email);

    Optional<SubjectProgress> findByEmailAndSubject(
        String email,
        String subject
    );
}

