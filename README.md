# Tech Lens 🚀

Tech Lens is a dynamic full stack MERN (MongoDB, Express, React, Node.js) blog application currently under development. It aims to provide a seamless and immersive experience for tech enthusiasts to share and explore the latest trends and insights in the world of technology.

## Project Structure 📁

```
└── 📁tech-lens-blog
    └── 📁api
        └── 📁controllers
            └── auth.controller.ts
            └── post.controller.ts           
            └── user.controller.ts
        └── index.ts
        └── 📁models
            └── user.model.ts
        └── 📁routes
            └── auth.route.ts
            └── user.route.ts
        └── 📁utils
            └── error.ts
            └── verifyUser.ts
    └── 📁client
        └── .eslintrc.cjs
        └── index.html
        └── package-lock.json
        └── package.json
        └── postcss.config.js
        └── 📁public
        └── README.md
        └── 📁src
            └── App.tsx
            └── 📁assets
            └── 📁components
                └── DashProfile.tsx
                └── DashSidebar.tsx
                └── Footer.tsx
                └── Header.tsx
                └── Logo.tsx
                └── OAuth.tsx
                └── PrivateRoute.tsx
                └── ThemeProvider.tsx
            └── firebase.ts
            └── index.css
            └── main.tsx
            └── 📁pages
                └── About.tsx
                └── CreatePost.tsx
                └── Dashboard.tsx
                └── Home.tsx
                └── Projects.tsx
                └── SignIn.tsx
                └── SignUp.tsx
            └── 📁redux
                └── store.ts
                └── 📁theme
                    └── themeSlice.ts
                └── 📁user
                    └── userSlice.ts
            └── vite-env.d.ts
        └── tailwind.config.js
        └── tsconfig.json
        └── tsconfig.node.json
        └── vite.config.ts
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
```

## Major Tech Stack 🛠️

- **Frontend**:
  - React ⚛️
  - Redux Toolkit 🔄
  - Flowbite 🌐

- **Backend**:
  - Node.js 🚀
  - Express 🌐
  - JWT (JSON Web Tokens) 🔐

- **Database**:
  - MongoDB 🍃

- **Authentication**:
  - Firebase Auth 🔥

## Features 🌟

- **User Authentication**: Secure user authentication using Firebase Auth for a seamless login experience.
- **Dynamic Blogging**: Create, edit, and delete blog posts with ease.
- **Real-time Updates**: Stay updated with real-time changes and notifications.
- **Responsive Design**: Enjoy a smooth and responsive UI across various devices.
- **State Management**: Efficient state management using Redux Toolkit for a streamlined user experience.

## Getting Started 🚀

1. **Clone the repository:**

    ```bash
    git clone https://github.com/aviroopjana/tech-lens-blog.git
    ```

    Navigate to the project directory:

    ```bash
    cd tech-lens-blog
    ```

    Install dependencies for the server and client:

    ```bash
    npm install
    ```

## Start the Backend Server 🌐

To run the api server, execute the following command in the root of the project:

```bash
npm run dev
```
This command will start the server using nodemon, enabling automatic restarts on file changes.

## Start the Client ⚛️
Navigate to the client directory:

```bash
cd client
```
Install client dependencies:

```bash
npm install
```
Then, start the client server:

```bash
npm run dev
````
Explore, contribute, and enhance the MERN Blog project! 🎉
