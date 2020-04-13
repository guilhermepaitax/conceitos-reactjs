import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');

      if (response.data) {
        setRepositories(response.data);
      }
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      id: "123",
      url: "https://github.com/guilhermepaitax",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post('/repositories', repository);

    if (response.data) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    const newRepositories = repositories.filter(repo => repo.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
