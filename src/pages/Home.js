import React, { useEffect, useState } from 'react';
import allModels from '../data/models.json';

export default function Home({ onSelectModel, selectedModel }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Ensure SEM is default and others are sorted alphabetically
    const SEM = allModels.find((m) => m.name === 'Socio-Ecological Model (SEM)');
    const others = allModels.filter((m) => m.name !== 'Socio-Ecological Model (SEM)');
    others.sort((a, b) => a.name.localeCompare(b.name));
    setModels([SEM, ...others]);
    onSelectModel(SEM); // Default selection is SEM
  }, [onSelectModel]);

  return (
    <div>
      <h2>{selectedModel?.name || 'Select a Model'}</h2>
      {selectedModel ? (
        <div>
          <img
            src={selectedModel.image}
            alt={selectedModel.name}
            style={{ maxWidth: '100%', marginBottom: '1rem' }}
          />
          <p><strong>Description:</strong> {selectedModel.description}</p>
          <p><strong>Citation:</strong> {selectedModel.citation}</p>
          <p><strong>Reference:</strong> {selectedModel.reference}</p>
          <p>
            <strong>Link:</strong>{' '}
            <a href={selectedModel.url} target="_blank" rel="noopener noreferrer">
              {selectedModel.url}
            </a>
          </p>
          <p><strong>Keywords:</strong> {selectedModel.keywords.join(', ')}</p>
        </div>
      ) : (
        <p style={{ color: '#ccc' }}>No model selected.</p>
      )}
    </div>
  );
}