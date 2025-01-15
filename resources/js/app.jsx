import '../css/app.css'; // Importing the main CSS file for styling
import './bootstrap'; // Importing bootstrap for initial setup and configuration

import { createInertiaApp } from '@inertiajs/react'; // Importing createInertiaApp to set up Inertia.js application
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'; // Importing helper to resolve page components
import { createRoot } from 'react-dom/client'; // Importing createRoot to manage the React application root

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'; // Getting the application name from environment variables or defaulting to 'Laravel'

// Creating the Inertia application
createInertiaApp({
    title: (title) => `${title} - ${appName}`, // Setting the document title with the app name
    resolve: (name) =>
        resolvePageComponent( // Resolving the page component dynamically
            `./pages/${name}.jsx`, // Constructing the path to the page component
            import.meta.glob('./pages/**/*.jsx'), // Importing all page components
        ),
    setup({ el, App, props }) { // Setting up the application
        const root = createRoot(el); // Creating a root for the React application

        root.render(<App {...props} />); // Rendering the main App component with props
    },
    progress: {
        color: '#4B5563', // Setting the progress bar color
    },
});
