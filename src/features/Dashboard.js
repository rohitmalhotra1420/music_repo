import React, { Component } from "react";
import TrendingTrackList from "./TrendingTrackList";
import TopHeader from "./TopHeader";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <TopHeader />
        <TrendingTrackList />
      </div>
    );
  }
}

export default Dashboard;
