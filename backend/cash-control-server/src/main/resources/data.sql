-- Initialize roles --
INSERT INTO Roles (name)
VALUES ('ROLE_USER'),
       ('ROLE_MODERATOR'),
       ('ROLE_ADMIN'),
       ('ROLE_ROOT')
ON CONFLICT DO NOTHING;

-- Initialize ROOT --
INSERT INTO Users (username, email, password)
VALUES ('root', 'root@root.root', '$2a$12$CAJVDozp7VtXZj4dDeOVXOyNYFFSQSmcuf8pmCX32He2y0a8WrcVm')
ON CONFLICT DO NOTHING;
INSERT INTO User_Roles (user_id, role_id)
VALUES (1, 4)
ON CONFLICT DO NOTHING;
