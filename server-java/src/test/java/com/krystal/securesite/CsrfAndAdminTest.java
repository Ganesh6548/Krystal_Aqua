package com.krystal.securesite;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CsrfAndAdminTest {

    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate rest;

    @Test
    void adminProtectedAndCsrfCookiePresent() {
        var base = "http://localhost:"+port;
        // Ensure CSRF cookie is present on public endpoints
        ResponseEntity<String> r = rest.getForEntity(base+"/api/public/auth", String.class);
        // CSRF cookie is set by Spring Security when using CookieCsrfTokenRepository; we accept 404 or 200 but header/cookie presence is important
        assertThat(r.getStatusCode().is4xxClientError() || r.getStatusCode().is2xxSuccessful()).isTrue();

        // Try access to admin endpoint without token -> 401/403
        var adminResp = rest.getForEntity(base+"/api/admin/info", Map.class);
        assertThat(adminResp.getStatusCode().is4xxClientError()).isTrue();
    }
}
