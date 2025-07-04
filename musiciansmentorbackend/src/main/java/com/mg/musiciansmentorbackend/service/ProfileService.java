package com.mg.musiciansmentorbackend.service;

import com.mg.musiciansmentorbackend.model.Student;
import com.mg.musiciansmentorbackend.model.Teacher;
import com.mg.musiciansmentorbackend.model.User;
import com.mg.musiciansmentorbackend.repository.StudentRepository;
import com.mg.musiciansmentorbackend.repository.TeacherRepository;
import com.mg.musiciansmentorbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public ProfileService(UserRepository userRepository, StudentRepository studentRepository, TeacherRepository teacherRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    @Transactional
    public void createUserProfile(User user) {
        if (user.isProfileCreated()) {
            return;
        }

        switch (user.getAccountType()) {
            case STUDENT -> createStudentProfile(user);
            case TEACHER -> createTeacherProfile(user);
        }

        user.setProfileCreated(true);
        userRepository.save(user);
    }

    private void createStudentProfile(User user) {
        Student student = new Student();
        student.setUser(user);
        student.setFirstName(null);
        student.setLastName(null);
        student.setLocation(null);
        student.setGradeLevel(null);
        student.setInstrument(null);
        student.setBio(null);
        studentRepository.save(student);
    }

    private void createTeacherProfile(User user) {
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        teacher.setFirstName(null);
        teacher.setLastName(null);
        teacher.setLocation(null);
        teacher.setExperienceLevel(null);
        teacher.setInstrument(null);
        teacher.setBio(null);
        teacher.setRate(null);
        teacherRepository.save(teacher);
    }
}
