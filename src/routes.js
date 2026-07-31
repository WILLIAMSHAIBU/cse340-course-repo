import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm, projectValidation } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, requireRole, showDashboard, showUsersPage } from './controllers/users.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/users', requireRole('admin'), showUsersPage);

// Route for new organization page (admin only)
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to display the edit organization form (admin only)
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission (admin only)
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route to handle new organization form submission (admin only)
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new project page (admin only)
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to display the edit project form (admin only)
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Route to handle the edit project form submission (admin only)
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Route to handle new project form submission (admin only)
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Routes to handle the assign categories to project form (admin only)
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// error-handling routes
router.get('/test-error', testErrorPage);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Dashboard route (protected)
router.get('/dashboard', requireLogin, showDashboard);

export default router;
