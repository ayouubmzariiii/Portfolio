# Dynamic Portfolio & CMS

A fully customizable, white-label portfolio template built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. 

Originally designed as a personal portfolio, this project has been evolved into a dynamic CMS (Content Management System) that allows any developer or creative to deploy their own portfolio and manage all content directly from the browser without touching code.

## 🚀 Features

*   **⚡️ Modern Tech Stack**: Built with the latest web technologies for speed and SEO.
*   **🎨 Dynamic Theming**: Change your primary brand colors and background colors instantly.
*   **📝 Built-in Admin Dashboard**:
    *   **Profile Management**: Edit your name, title, bio, and contact info.
    *   **Project Management**: Add, edit, delete projects with support for images and video uploads.
    *   **Experience Timeline**: Manage your work history.
    *   **Resume Management**: Upload and update your CV PDF directly.
*   **💾 Local Persistence**: All changes are saved to your browser's LocalStorage, making it perfect for demos or single-user deployments.
*   **📱 Fully Responsive**: Looks great on mobile, tablet, and desktop.

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ayouubmzariiii/Portfolio
    cd Portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` (or the port shown in your terminal).

## 🔐 Admin Access

To customize the portfolio, navigate to the Admin Dashboard:

1.  Go to `/login` (e.g., `http://localhost:5173/login`).
2.  Enter the default password: **`admin123`**.
3.  You will be redirected to `/admin`.

> **Note**: This project currently uses a hardcoded password for simplicity. For production use, you should implement proper authentication.

## 🎨 Customization Guide

Once logged into the Admin Dashboard, you have full control:

### 1. Profile
Update your **Name**, **Job Title**, and **Contact Information**. This updates the Hero section, Navbar, Footer, and Contact section automatically.

### 2. Theme
Go to the **Theme** tab to customize the look and feel.
*   **Primary Color**: The accent color used for buttons, highlights, and hovers (Default: Neon Volt `#CCFF00`).
*   **Background Color**: The main page background (Default: Deep Black `#050505`).
*   **Card Color**: Background for project cards and sections (Default: `#1A1A1A`).

### 3. Projects
*   Click **Add New Project** to showcase your work.
*   Upload **Images** (first image is the thumbnail) and **Videos**.
*   Add links to **Live Demos** or **GitHub Repos**.

### 4. Resume
Upload your PDF resume in the **Resume** tab. The "Download CV" buttons on the site will automatically link to the new file.

## 📦 Deployment

You can deploy this to any static hosting provider like **Vercel**, **Netlify**, or **GitHub Pages**.

```bash
npm run build
```

The build output will be in the `dist` folder.

## 📄 License

MIT License. Feel free to use this template for your own portfolio!
