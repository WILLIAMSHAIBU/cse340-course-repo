CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS project_category (
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

INSERT INTO category (name)
VALUES ('Environmental'), ('Educational'), ('Community Service'), ('Health and Wellness')
ON CONFLICT (name) DO NOTHING;

INSERT INTO project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM service_project sp
JOIN category c ON c.name = 'Educational'
WHERE sp.title = 'Community School Renovation'
ON CONFLICT DO NOTHING;

INSERT INTO project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM service_project sp
JOIN category c ON c.name = 'Health and Wellness'
WHERE sp.title = 'Village Water Well Construction'
ON CONFLICT DO NOTHING;

INSERT INTO project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM service_project sp
JOIN category c ON c.name = 'Environmental'
WHERE sp.title = 'Community Vegetable Garden'
ON CONFLICT DO NOTHING;

INSERT INTO project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM service_project sp
JOIN category c ON c.name = 'Environmental'
WHERE sp.title = 'Urban Tree Planting Campaign'
ON CONFLICT DO NOTHING;

INSERT INTO project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM service_project sp
JOIN category c ON c.name = 'Community Service'
WHERE sp.title = 'Neighborhood Cleanup Day'
ON CONFLICT DO NOTHING;

INSERT INTO project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM service_project sp
JOIN category c ON c.name = 'Community Service'
WHERE sp.title = 'Food Donation Drive'
ON CONFLICT DO NOTHING;
