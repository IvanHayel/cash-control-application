package by.hayel.cash.control.server.validation.validator;

import by.hayel.cash.control.server.validation.IsoZonedDateTime;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class IsoZonedDateTimeValidator implements ConstraintValidator<IsoZonedDateTime, String> {
  private static final String ISO_ZONED_DATE_TIME_PATTERN =
      "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{3})?Z$";

  @Override
  public void initialize(IsoZonedDateTime constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(String date, ConstraintValidatorContext constraintValidatorContext) {
    return date.matches(ISO_ZONED_DATE_TIME_PATTERN);
  }
}
