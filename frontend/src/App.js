import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Praveen's Portfolio</h1>
        <p>Full Stack Developer</p>
      </header>

      <main className="container">
        <section className="projects">
          <h2>My Projects</h2>

          {loading && <p>Loading projects...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Praveen Kumar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
