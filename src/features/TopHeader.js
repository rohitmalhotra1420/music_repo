import React from "react";

const TopHeader = ({ countryName }) => (
  <div>
    <h1 className="top-header">
      TOP TRACKS IN {countryName && countryName.toUpperCase()}
    </h1>
  </div>
);

export default TopHeader;
