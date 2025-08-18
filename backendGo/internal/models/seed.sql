-- teams
INSERT INTO teams (team_name, created_at, updated_at)
VALUES
('Cat Alpha', NOW(), NOW()),
('Cat Beta', NOW(), NOW()),
('Cat Gamma', NOW(), NOW());

-- users
INSERT INTO users (provider, provider_id, username, team_id, created_at, updated_at)
VALUES
('github', 'cat001', 'whiskers', 1, NOW(), NOW()),
('github', 'cat002', 'paws', 1, NOW(), NOW()),
('github', 'cat003', 'mittens', 2, NOW(), NOW());

-- projects
INSERT INTO projects (name, description, start_date, created_at, updated_at)
VALUES
('Cat Tower', 'Build the ultimate cat tower', NOW(), NOW(), NOW()),
('Catnip Garden', 'Grow catnip in the backyard', NOW(), NOW(), NOW()),
('Cat Cafe', 'Open a cat-themed cafe', NOW(), NOW(), NOW());

-- project_teams
INSERT INTO project_teams (team_id, project_id, created_at, updated_at)
VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW());

-- tasks
INSERT INTO tasks (title, project_id, author_id, status, created_at, updated_at)
VALUES
('Assemble scratching post', 1, 1, 'Open', NOW(), NOW()),
('Plant catnip seeds', 2, 2, 'In Progress', NOW(), NOW()),
('Design cat menu', 3, 3, 'Done', NOW(), NOW());

-- task_assignments
INSERT INTO task_assignments (user_id, task_id, created_at, updated_at)
VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW());

-- attachments
INSERT INTO attachments (file_url, task_id, uploaded_by_id, created_at, updated_at)
VALUES
('https://example.com/cat1.jpg', 1, 1, NOW(), NOW()),
('https://example.com/cat2.jpg', 2, 2, NOW(), NOW()),
('https://example.com/cat3.jpg', 3, 3, NOW(), NOW());

INSERT INTO comments (text, task_id, user_id) VALUES
('Don’t forget salmon flavor!', 1, 1),
('Do it before 5 PM', 2, 2),
('Check for flea treatment', 3, 3);
