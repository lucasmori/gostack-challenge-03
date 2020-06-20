import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'Desafio dos repositórios mostrados no ReactJS',
      url: 'http://github.com/lucasmori',
      techs: ['Node.js', 'ReactJS', 'React Native'],
    });
    const newRepo = response.data;

    setRepos([...repos, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repo = response.status;
    if (repo === 204) {
      const filteredRepo = repos.filter((rep) => rep.id !== id);
      setRepos(filteredRepo);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
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
