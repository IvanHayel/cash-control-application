package by.hayel.cash.control.server.config;

import java.util.Locale;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;

@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServerWebConfiguration implements WebMvcConfigurer {
  @Value("${cors.mapping}")
  String corsMapping;

  @Value("${cors.allowed-origins}")
  String allowedOrigins;

  @Value("${cors.allowed-methods}")
  String allowedMethods;

  @Value("${cors.allowed-headers}")
  String allowedHeaders;

  @Value("${cors.allow-credentials}")
  boolean allowCredentials;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping(corsMapping)
        .allowedOrigins(allowedOrigins)
        .allowedMethods(allowedMethods)
        .allowedHeaders(allowedHeaders)
        .allowCredentials(allowCredentials);
  }

  @Bean
  public LocaleResolver localeResolver() {
    var cookieLocaleResolver = new CookieLocaleResolver();
    cookieLocaleResolver.setDefaultLocale(Locale.ENGLISH);
    return cookieLocaleResolver;
  }
}
