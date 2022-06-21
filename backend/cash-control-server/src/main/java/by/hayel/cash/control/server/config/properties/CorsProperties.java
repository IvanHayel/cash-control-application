package by.hayel.cash.control.server.config.properties;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "cors")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CorsProperties {
    String mapping;
    String allowedOrigins;
    String allowedMethods;
    String allowedHeaders;
    boolean allowCredentials;
}