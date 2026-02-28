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
public class AuthIntegrationTest {

    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate rest;

    @Test
    void registerAndLogin() {
        var base = "http://localhost:"+port+"/api/public/auth";
        var reg = Map.of("username","testuser","password","p@ssw0rd");
        var r = rest.postForEntity(base+"/register", reg, Map.class);
        assertThat(r.getStatusCode()).isEqualTo(HttpStatus.OK);

        var l = rest.postForEntity(base+"/login", reg, Map.class);
        assertThat(l.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(l.getBody()).containsKey("token");
    }
}
