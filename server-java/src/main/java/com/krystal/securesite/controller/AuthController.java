package com.krystal.securesite.controller;

import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.krystal.securesite.repository.UserRepository;
import com.krystal.securesite.model.AppUser;
import com.krystal.securesite.util.JwtUtil;

import java.util.Map;

@RestController
@RequestMapping("/api/public/auth")
@Validated
public class AuthController {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final UserRepository users;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository users, JwtUtil jwtUtil) {
        this.users = users;
        this.jwtUtil = jwtUtil;
    }

    record LoginRequest(String username, String password) {}
    record RegisterRequest(String username, String password) {}

    @PostConstruct
    void initAdmin() {
        users.findByUsername("admin").orElseGet(() -> users.save(new AppUser("admin", encoder.encode("admin"), "ADMIN")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (users.findByUsername(req.username()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error","username exists"));
        }
        var u = new AppUser(req.username(), encoder.encode(req.password()), "USER");
        users.save(u);
        return ResponseEntity.ok(Map.of("status","registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        var opt = users.findByUsername(req.username());
        if (opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error","invalid credentials"));
        var user = opt.get();
        if (!encoder.matches(req.password(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error","invalid credentials"));
        }
        var token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
