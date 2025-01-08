import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function Layout({
  children,
  models,
  selectedModel,
  onSelectModel,
  selectedKeyword,
  onKeywordClick,
}) {
  return (
    <div className="layout">
      <div className="left-sidebar">
        <LeftSidebar
          models={models}
          selectedModel={selectedModel}
          onKeywordClick={onKeywordClick}
        />
      </div>
      <div className="main-content">{children}</div>
      <div className="right-sidebar">
        <RightSidebar
          models={models}
          selectedModel={selectedModel}
          selectedKeyword={selectedKeyword}
          onSelectModel={onSelectModel}
        />
      </div>
    </div>
  );
}