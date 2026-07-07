import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT project_id, title, description, location, project_date
        FROM public.service_project;
    `;
    const { rows } = await db.query(query);
    return rows;
};

export { getAllProjects };