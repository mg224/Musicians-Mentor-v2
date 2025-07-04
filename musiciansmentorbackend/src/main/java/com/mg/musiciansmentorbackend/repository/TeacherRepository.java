package com.mg.musiciansmentorbackend.repository;

import com.mg.musiciansmentorbackend.model.Teacher;
import com.mg.musiciansmentorbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUser(User user);
    Optional<Teacher> findByUserId(Long userId);
}
