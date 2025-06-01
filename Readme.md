# Wine-Web

## 🥂Welcome to my Wine-Web Platform🥂

## 🍷 Wine Links – A Web App for Wine Enthusiasts

Wine Links is a full-stack web application developed for wine enthusiasts to share, discover, and rate links related to wine culture. The platform allows public visitors to register as members, post new links with titles and descriptions, rate existing links, and manage their favorites. Members can view a sortable front page displaying links with aggregate ratings and the contributor’s Wine Points, which are dynamically updated based on user feedback. The site includes functionality for hiding links, viewing positively rated content, and encourages community engagement through a points-based reputation system.

The application is built using a RESTful API back-end with a PostgreSQL database, securely storing user credentials using bcrypt. Dynamic operations, such as posting, rating, and hiding links, are handled without full-page reloads to enhance user experience. The API is protected against unauthorized access to ensure data integrity and privacy. Developed as part of a web development course, the project demonstrates secure database interaction, client/server communication, API design, and front-end responsiveness using modern web development practices.

> #### To Run the project

1. Clone the repository

```command
git clone https://github.com/sulav02/WineWeb.git
```

2. Run below commands:

```command
cd WineWeb
```

- **Note:** Rename .env.sample to .env and update with your **POSTGRES DETAILS**  
  <br>

3. And start the backend server:

```command
deno run --watch --allow-net --allow-env --allow-read --allow-write src/server.js
```

4. **Run the front-end** using Live Server in VS Code (`Go Live` button). If you don't have  `Go Live` button, please download and install the Live-Server extension. You can copy this extension id to download `ritwickdey.LiveServer` in your VS Code IDE.
__Example: Open your browser to the local address provided by Live Server (e.g., `http://127.0.0.1:57755`).__

## Author
#### Sulav Dhakal