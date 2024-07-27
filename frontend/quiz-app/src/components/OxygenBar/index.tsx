"use client";

import React from 'react';
import './OxygenBar.css'; 

interface OxygenBarProps {
    oxygenLevel: number; 
  }

  const OxygenBar: React.FC<OxygenBarProps> = ({ oxygenLevel }) => {
    return (
      <div className="oxygen-bar-container">
        <div className="oxygen-bar" style={{ width: `${oxygenLevel}%` }}></div>
      </div>
    );
  };

export default OxygenBar;