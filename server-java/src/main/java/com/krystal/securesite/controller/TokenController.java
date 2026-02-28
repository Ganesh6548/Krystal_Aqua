package com.krystal.securesite.controller;

import com.krystal.securesite.model.RefreshToken;
import com.krystal.securesite.repository.RefreshTokenRepository;
import com.krystal.securesite.repository.UserRepository;
import com.krystal.securesite.util.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/public/token")
public class TokenController {

    private final RefreshTokenRepository refreshRepo;
    private final UserRepository users;
    private final JwtUtil jwtUtil;
    private final long refreshExpiryMs;

    public TokenController(RefreshTokenRepository refreshRepo, UserRepository users, JwtUtil jwtUtil,
                           @Value("${jwt.refresh-expiration-ms}") long refreshExpiryMs) {
        this.refreshRepo = refreshRepo; this.users = users; this.jwtUtil = jwtUtil; this.refreshExpiryMs = refreshExpiryMs;
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String,String> body) {
        var token = body.get("refreshToken");
        if (token == null) return ResponseEntity.badRequest().build();
        var opt = refreshRepo.findByToken(token);
        if (opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error","invalid refresh token"));
        var rt = opt.get();
        if (rt.getExpiresAt().isBefore(Instant.now())) { return ResponseEntity.status(401).body(Map.of("error","expired")); }
        var user = users.findByUsername(rt.getUsername()).orElseThrow();
        var jwt = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/create-refresh/{username}")
    public ResponseEntity<?> createRefresh(@PathVariable String username) {
        var user = users.findByUsername(username).orElseThrow();
        refreshRepo.deleteByUsername(username);
        var rtoken = generateSecureToken();
        var expires = Instant.now().plusMillis(refreshExpiryMs);
        refreshRepo.save(new RefreshToken(rtoken, username, expires));
        return ResponseEntity.ok(Map.of("refreshToken", rtoken));
    }

    private String generateSecureToken() {
        var bytes = new byte[64]; new SecureRandom().nextBytes(bytes); return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
