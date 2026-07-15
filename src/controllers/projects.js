import { getAllProjects } from '../models/projects.js';

export const showProjectsPage  = async (req, res) => {
    const title = 'Service Projects';

    try {
        const service_projects = await getAllProjects();
        res.render('projects', { title, service_projects });
    } catch (error) {
        console.error('Failed to load projects:', error.message);
        res.render('projects', { title, service_projects: [] });
    }
};
