# Working Holiday Guide

A web application that helps working holiday travelers manage their preparation and life abroad.

## Live Demo

https://taiseiogawa28.github.io/Working-Holiday-Guide/

## Description

Working Holiday Guide is a web application that helps people prepare for and manage their working holiday journey.

Users can organize pre-arrival and post-arrival tasks, view and edit task details, access country-specific information, switch between English and Japanese, and track their progress.

## Features

- Pre-arrival and post-arrival task checklists
- Eight default tasks with descriptions and task-specific information
- English and Japanese display switching without resetting task or filter states
- Dynamic progress tracking with a sticky percentage, progress bar, and remaining task count
- Add custom tasks, edit their titles, and delete them in either checklist
- Expand and collapse task details
- Edit descriptions with Edit Details and Save for both default and custom tasks
- Organized Description and Information sections for Visa, Flight, Accommodation, Resume, Bank, Tax, Mobile, and Job tasks
- Country selection for New Zealand and Australia
- Links to official visa and tax websites
- Country-specific bank, mobile provider, job site, and resume resource recommendations
- Flight search and accommodation service recommendations
- Country-specific resume tips
- External resources open in a new browser tab
- Save custom task titles, descriptions, and checkbox states using localStorage and restore them after reloading
- Add tasks with the Add Task button or Enter key
- Filter tasks by All, Active, and Completed
- Responsive layout for desktop and mobile screens, including narrow 320px and 375px widths

Default task titles cannot be edited, and default tasks cannot be deleted.

Changes to default task descriptions last until the page is reloaded. Custom task content and service, brand, and country names are not translated.

## Technologies

- HTML
- CSS
- JavaScript
- Git
- GitHub
- GitHub Pages

## What I Learned

Through this project, I learned:

- HTML and CSS fundamentals
- JavaScript DOM manipulation
- Event handling
- Data persistence with localStorage
- JavaScript array methods
- Managing tasks as objects with titles, descriptions, and types
- Creating task-specific UI using an object type property
- Dynamically updating resource buttons and resume tips based on a selected country
- Managing translations in one object and updating existing DOM elements without rebuilding task lists
- Preserving checkbox, filter, and custom task states while switching languages
- Sharing styles across task-specific Information sections
- Reusing a shared function to create pre-arrival and post-arrival task elements
- Responsive layouts with CSS media queries
- Git and GitHub workflow
- Deploying a static web application with GitHub Pages

## Future Plans

- Save the selected language between sessions
- Add more countries and country-specific resources
- Improve accessibility and task state management