package by.hayel.cash.control.server.validation;

import by.hayel.cash.control.server.validation.validator.IsoZonedDateTimeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsoZonedDateTimeValidator.class)
public @interface IsoZonedDateTime {
  String message() default "Date must be in ISO-8601 format!";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
