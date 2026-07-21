import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT project_id, title, description, location, project_date
        FROM public.service_project;
    `;
    const { rows } = await db.query(query);
    return rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE project_id = $1;
      `;
      
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
      `;
      
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId, getProjectDetails, getCategoriesByProjectId };

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export { createProject };

const updateProject = async (id, title, description, location, date, organizationId) => {
    const query = `
      UPDATE service_project
      SET title = $1, description = $2, location = $3, project_date = $4, organization_id = $5
      WHERE project_id = $6
    `;

    const queryParams = [title, description, location, date, organizationId, id];
    const result = await db.query(query, queryParams);

    if (result.rowCount === 0) {
        throw new Error('Failed to update project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', id);
    }
};

export { updateProject };