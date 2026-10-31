
package com.kidslearn.kidslearn.controller;

import com.kidslearn.kidslearn.entity.Student;
import com.kidslearn.kidslearn.repository.StudentRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentRepository studentRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping("/register")
    public String registerStudent(@RequestBody Student student) {

        if (student.getName() == null || student.getName().isBlank()
                || student.getEmail() == null || student.getEmail().isBlank()
                || student.getPassword() == null || student.getPassword().isBlank()) {
            return "All fields are required!";
        }

        if (studentRepository.existsByEmail(student.getEmail())) {
            return "Email already registered!";
        }

        String encryptedPassword =
                passwordEncoder.encode(student.getPassword());

        student.setPassword(encryptedPassword);
        studentRepository.save(student);

        return "Student Registered Successfully!";
    }

    @PostMapping("/login")
    public Map<String, String> loginStudent(@RequestBody Student student) {

        Optional<Student> existingStudent =
                studentRepository.findByEmail(student.getEmail());

        if (existingStudent.isPresent()) {

            Student savedStudent = existingStudent.get();

            if (passwordEncoder.matches(
                    student.getPassword(),
                    savedStudent.getPassword())) {

                return Map.of(
                        "message", "Login Successful!",
                        "name", savedStudent.getName(),
                        "email", savedStudent.getEmail()
                );
            }
        }

        return Map.of("message", "Invalid email or password!");
    }
}
