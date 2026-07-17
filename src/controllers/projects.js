import { getAllProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

export const showProjectsPage = async (req, res) => {
    const title = 'Service Projects';

    try {
        const service_projects = await getAllProjects();
        res.render('projects', { title, service_projects });
    } catch (error) {
        console.error('Failed to load projects:', error.message);
        res.render('projects', { title, service_projects: [] });
    }
};

export const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, categories });
};
