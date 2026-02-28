Quick security audit notes for server-java

- JWT secret currently configured in `src/main/resources/application.properties` as `jwt.secret`.
  - Action: set a strong secret via environment or external vault before production. Do NOT commit secrets.

- CSRF: Enabled with `CookieCsrfTokenRepository` and HttpOnly=false to allow JS reading when needed. Consider using double-submit pattern only when necessary.

- SQL: All DB access uses Spring Data JPA repositories which prevent string-concatenation SQL. Continue to avoid `@Query` with concatenated strings.

- Input validation: Controllers use basic `@Valid` but add DTO field constraints (e.g., `@NotBlank`, `@Size`) and output encoding for HTML contexts.

- Refresh tokens: Stored server-side and rotated on create; ensure HTTPS-only cookie storage if returning tokens to clients.

- Headers: Basic CSP and frameOptions set. Consider adding `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.

- Rate limiting: Not implemented yet — add `bucket4j` or API gateway rules to mitigate brute-force.

Checklist before production:
- Move secrets to `SPRING_APPLICATION_JSON`/env or vault
- Enforce HTTPS and HSTS
- Harden CSP and CORS
- Add rate limiting and monitoring
