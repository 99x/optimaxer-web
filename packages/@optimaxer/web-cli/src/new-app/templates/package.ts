export const packageJson = {
    "name": "optimaxer-app",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview"
    },
    "devDependencies": {
        "typescript": "^5.2.2",
        "vite": "^5.3.4",
        "vite-plugin-static-copy": "^1.0.6"
    },
    "dependencies": {
        "@optimaxer/web-commands": "^1.0.4"
    }
};