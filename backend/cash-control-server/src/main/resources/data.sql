INSERT INTO Roles (name)
VALUES
       ('ROLE_USER'),
       ('ROLE_MODERATOR'),
       ('ROLE_ADMIN'),
       ('ROLE_ROOT')
ON CONFLICT DO NOTHING;