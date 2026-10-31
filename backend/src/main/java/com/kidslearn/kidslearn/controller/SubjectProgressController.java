
package com.kidslearn.kidslearn.controller;

import com.kidslearn.kidslearn.entity.SubjectProgress;
import com.kidslearn.kidslearn.repository.SubjectProgressRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subject-progress")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectProgressController {

    private final SubjectProgressRepository repository;

    public SubjectProgressController(SubjectProgressRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public SubjectProgress saveProgress(
            @RequestBody SubjectProgress progress) {

        return repository.findByEmailAndSubject(
                progress.getEmail(),
                progress.getSubject()
        ).map(existing -> {
            existing.setCorrect(
                existing.getCorrect() + progress.getCorrect()
            );
            existing.setTotal(
                existing.getTotal() + progress.getTotal()
            );
            return repository.save(existing);
        }).orElseGet(() -> repository.save(progress));
    }

    @GetMapping("/{email}")
    public List<SubjectProgress> getProgress(
            @PathVariable String email) {

        return repository.findByEmail(email);
    }
}

