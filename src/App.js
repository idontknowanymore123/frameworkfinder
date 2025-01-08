import React, { useState } from 'react';
import models from './data/models.json';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Layout from './components/Layout';
import './App.css';

export default function App() {
  const defaultModel = models.find((model) => model.name === 'Socio-Ecological Model');
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSelectedKeyword(null);
  };

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    setSelectedModel(null);
  };

  return (
    <Layout
      header={
        <div>
          <h1 className="header-title">Framework Finder</h1>
          <p className="header-subtitle">
  Explore various conceptual frameworks utilized in public health and social work research.
</p>
        </div>
      }
      leftSidebar={
        <LeftSidebar
          models={models}
          selectedModel={selectedModel}
          onKeywordClick={handleKeywordClick}
        />
      }
      main={
        <div className="main-content">
          {selectedModel ? (
            <>
              <h2 className="model-title">{selectedModel.name}</h2>
              <table className="model-table">
  <tbody>
    <tr>
      <td className="table-label">Description</td>
      <td className="table-value">{selectedModel.description}</td>
    </tr>
    <tr>
      <td className="table-label">Reference</td>
      <td className="table-value">{selectedModel.reference}</td>
    </tr>
    <tr>
      <td className="table-label">Source</td>
      <td className="table-value">
        <a
          href={selectedModel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          {selectedModel.url}
        </a>
      </td>
    </tr>
    <tr>
      <td className="table-label">Keywords</td>
      <td className="table-value">{selectedModel.keywords.join(', ')}</td>
    </tr>
    <tr>
      <td className="table-label">Image Reference</td>
      <td className="table-value">{selectedModel.imageReference}</td>
    </tr>
  </tbody>
</table>
              {selectedModel.image && (
                <img
                  src={selectedModel.image}
                  alt={`${selectedModel.name} visual representation`}
                  className="model-image"
                />
              )}
            </>
          ) : (
            <p className="main-placeholder">Please select a framework to view its details.</p>
          )}
        </div>
      }
      rightSidebar={
        <RightSidebar
          models={models}
          selectedModel={selectedModel}
          selectedKeyword={selectedKeyword}
          onSelectModel={handleModelSelect}
        />
      }
      footer={
<p className="footer-text">
Disclaimer: This website is exclusively intended for instructional and non-commercial purposes. All information presented on this website is the intellectual property of its respective authors and/or publishers. The source content was gathered using an artificial intelligence-driven large language model chatbot (i.e., ChatGPT 4o) and may contain inaccuracies. Users (i.e., students and academic researchers) are solely responsible for verifying the accuracy of this information against original sources obtained directly from journals, publishers, or authors themselves. The development team is not liable for any errors on the site or in works utilizing the information presented here.
</p>
      }
    />
  );
}