import React from 'react';

export default function Layout({ header, leftSidebar, main, rightSidebar, footer }) {
  return (
    <div className="layout">
      <header className="header">{header}</header>
      <div className="layout-body">
        <aside className="sidebar">{leftSidebar}</aside>
        <main className="main-content">{main}</main>
        <aside className="sidebar">{rightSidebar}</aside>
      </div>
      <footer className="footer">{footer}</footer>
    </div>
  );
}