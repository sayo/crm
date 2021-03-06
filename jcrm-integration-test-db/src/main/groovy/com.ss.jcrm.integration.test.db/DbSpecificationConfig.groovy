package com.ss.jcrm.integration.test.db

import org.jetbrains.annotations.NotNull
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.testcontainers.containers.PostgreSQLContainer

@Configuration
class DbSpecificationConfig {

    static final String DB_NAME = "test-db"
    static final String USER = "test-root"
    static final String PWD = "test-root"

    @Bean(destroyMethod = "stop")
    @NotNull PostgreSQLContainer postgreSQLContainer() {

        def container = new PostgreSQLContainer("postgres:11.1")
            .withDatabaseName(DB_NAME)
            .withUsername(USER)
            .withPassword(PWD)

        container.start()

        while (!container.isRunning()) {
            Thread.sleep(500)
        }

        return container
    }
}
