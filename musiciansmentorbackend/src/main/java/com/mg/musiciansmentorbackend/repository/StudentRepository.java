package com.mg.musiciansmentorbackend.repository;

import com.mg.musiciansmentorbackend.model.Student;
import com.mg.musiciansmentorbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser(User user);
    Optional<Student> findByUserId(Long userId);
}
