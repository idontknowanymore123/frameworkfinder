import React, { useState, useEffect } from 'react';
import categories from '../data/categories.json';

export default function LeftSidebar({ models, selectedModel, onKeywordClick }) {
  const [supercategories, setSupercategories] = useState({});
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    const categoryMap = {};

    // Build a map of supercategories with their associated keywords and models
    Object.keys(categories).forEach((keyword) => {
      const relatedModels = models.filter((model) =>
        model.keywords.includes(keyword)
      );

      categories[keyword].forEach((supercategory) => {
        if (!categoryMap[supercategory]) {
          categoryMap[supercategory] = [];
        }

        const existingKeyword = categoryMap[supercategory].find(
          (item) => item.keyword === keyword
        );

        if (!existingKeyword) {
          categoryMap[supercategory].push({ keyword, models: relatedModels });
        }
      });
    });

    // Sort keywords within each supercategory alphabetically
    const sortedCategoryMap = {};
    Object.keys(categoryMap)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sortedCategoryMap[key] = categoryMap[key].sort((a, b) =>
          a.keyword.localeCompare(b.keyword)
        );
      });

    setSupercategories(sortedCategoryMap);
  }, [models]);

  useEffect(() => {
    if (selectedModel) {
      // Automatically expand categories that contain keywords of the selected model
      const relevantCategories = Object.keys(supercategories).filter((category) =>
        supercategories[category].some((item) =>
          selectedModel.keywords.includes(item.keyword)
        )
      );
      setExpandedCategories(relevantCategories);
    }
  }, [selectedModel, supercategories]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Keywords</h3>
      {Object.keys(supercategories).map((category) => (
        <div key={category}>
          <div
            className={`category-item ${
              expandedCategories.includes(category) ? 'selected-keyword' : ''
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </div>
          {expandedCategories.includes(category) && (
            <div className="nested-keyword">
              {supercategories[category].map(({ keyword }) => (
                <div
                  key={keyword}
                  className={`keyword-item ${
                    selectedModel && selectedModel.keywords.includes(keyword)
                      ? 'selected-keyword'
                      : ''
                  }`}
                  onClick={() => onKeywordClick(keyword)}
                >
                  {keyword}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}