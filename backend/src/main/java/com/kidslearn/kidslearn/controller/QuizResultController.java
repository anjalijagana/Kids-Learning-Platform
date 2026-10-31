
package com.kidslearn.kidslearn.controller;

import com.kidslearn.kidslearn.entity.QuizResult;
import com.kidslearn.kidslearn.repository.QuizResultRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quiz-results")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizResultController {

    private final QuizResultRepository quizResultRepository;

    public QuizResultController(QuizResultRepository quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
    }

    // Save quiz result
    @PostMapping
    public QuizResult saveResult(@RequestBody QuizResult result) {
        return quizResultRepository.save(result);
    }

    // Get quiz results using student email
    @GetMapping("/{email}")
    public List<QuizResult> getResults(@PathVariable String email) {
        return quizResultRepository.findByEmailOrderByIdDesc(email);
    }
}
