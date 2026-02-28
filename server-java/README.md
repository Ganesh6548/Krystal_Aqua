Security-enabled Spring Boot demo

Quick start

1. Install JDK 17+ and Maven.
2. From project root run:

```bash
cd "server-java"
mvn spring-boot:run
```

What this includes:
- CSRF protection with cookie-based token repository
- Basic auth (http basic) for demo; extend to JWT for APIs
- JPA usage (H2 in-memory) to avoid raw SQL and prevent SQL injection
- Content Security Policy and frame options headers

Next steps:
- Replace stubbed `AuthController` with real user service and JWT token handling
- Add PreparedStatements/Repository usage for all DB interactions
- Add rate limiting (e.g., bucket4j) and stricter CSP
