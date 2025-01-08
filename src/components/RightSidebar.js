import React, { useEffect, useState } from 'react';

export default function RightSidebar({ models, selectedModel, selectedKeyword, onSelectModel }) {
  const [filteredModels, setFilteredModels] = useState([]);

  useEffect(() => {
    if (selectedKeyword) {
      const filtered = models.filter((model) =>
        model.keywords.includes(selectedKeyword)
      );
      setFilteredModels(filtered.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      const sorted = models.sort((a, b) => a.name.localeCompare(b.name));
      if (selectedModel) {
        setFilteredModels([
          selectedModel,
          ...sorted.filter((model) => model.id !== selectedModel.id),
        ]);
      } else {
        setFilteredModels(sorted);
      }
    }
  }, [selectedKeyword, selectedModel, models]);

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Frameworks</h3>
      {filteredModels.map((model) => (
        <div
          key={model.id}
          className={`framework-item ${
            selectedModel && selectedModel.id === model.id ? 'selected-framework' : ''
          }`}
          onClick={() => onSelectModel(model)}
        >
          {model.name}
        </div>
      ))}
    </div>
  );
}