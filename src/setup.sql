
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

SELECT * FROM organization;

DELETE FROM organization
WHERE name = 'GreenHarvest Growers';

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

SELECT * FROM service_project;

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
(
    1,
    'Community School Renovation',
    'Renovate classrooms, repair roofs, and install new desks for a rural primary school.',
    'Lilongwe, Malawi',
    '2026-08-15'
),
(
    1,
    'Village Water Well Construction',
    'Construct a clean water well to improve access to safe drinking water.',
    'Kasungu, Malawi',
    '2026-09-10'
),
(
    2,
    'Community Vegetable Garden',
    'Create a shared vegetable garden and provide training on sustainable farming practices.',
    'Blantyre, Malawi',
    '2026-08-22'
),
(
    2,
    'Urban Tree Planting Campaign',
    'Plant indigenous trees in schools and public parks to promote environmental conservation.',
    'Zomba, Malawi',
    '2026-09-05'
),
(
    3,
    'Neighborhood Cleanup Day',
    'Coordinate volunteers to clean streets, markets, and public spaces.',
    'Mzuzu, Malawi',
    '2026-08-30'
),
(
    3,
    'Food Donation Drive',
    'Collect and distribute food packages to vulnerable families in the community.',
    'Machinga, Malawi',
    '2026-09-18'
);


CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


INSERT INTO category (name)
VALUES
    ('Educational'),
    ('Community Service'),
    ('Health and wellness'),
    ('Environment');

SELECT * FROM category;

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO project_category (project_id, category_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 2),
    (3, 4),
    (4, 4),
    (5, 2),
    (6, 2);

SELECT * FROM project_category;
