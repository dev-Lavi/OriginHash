import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import "./Header.css"; 

const Sidebar = ({ visible, onClose, activeSection, setActiveSection }) => {
  const [certDrop, setCertDrop] = useState(false);

  return (
    <div className={`sidebar ${visible ? "show" : ""}`}>
<div className="sidebar-logo">
  <img src="/logo.svg" alt="Logo" height={32} /> {/* ✅ From public folder */}
  <span style={{ marginLeft: 12, fontWeight: "600", fontSize: 18 }}>OriginHash</span>
</div>

      <div className="sidebar-nav">
        <div
          className={`sidebar-link${activeSection === "cert" ? " active" : ""}`}
          onClick={() => setCertDrop(v => !v)}
        >
          <span>Certificates</span>
          {certDrop ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </div>
        {certDrop && (
          <div className="sidebar-dropdown">
            <div className="sidebar-sublink">Issue</div>
            <div className="sidebar-sublink">Issued</div>
            <div className="sidebar-sublink">Verified</div>
          </div>
        )}

        <div className={`sidebar-link${activeSection === "update" ? " active" : ""}`}>Update</div>
        <div className={`sidebar-link${activeSection === "support" ? " active" : ""}`}>Support</div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-link"> 
          <AiOutlineSetting size={20} style={{ marginRight: 8 }} />
          Settings
        </div>
        <div className="sidebar-link">
          <AiOutlineLogout size={20} style={{ marginRight: 8 }} />
          Logout
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onHamburger }) => (
  <div className="navbar">
    <button className="hamburger" onClick={onHamburger}>
      <FaBars size={22} />
    </button>
    <input
      className="navbar-search"
      type="text"
      placeholder="Search here..."
    />
    <div className="navbar-profile">
      <img
        src="/admin.jpg"
        alt="Admin Avatar"
        className="navbar-avatar"
      />
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Ananya Singh</div>
        <div style={{ fontSize: 13, color: "#777" }}>Admin</div>
      </div>
    </div>
  </div>
);

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("cert");

  return (
    <>
      <Navbar onHamburger={() => setSidebarOpen(v => !v)} />
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {/* An overlay to close sidebar on click outside */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Header;
