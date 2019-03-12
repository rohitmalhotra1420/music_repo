import React, { Component } from "react";
import TrendingTrackModal from "./TrendingTrackModal";

class TrendingTrackListItem extends Component {
  state = {};

  render() {
    const { trackItem, openTrackModal, openArtistModal } = this.props;
    return (
      <div className="grid-item">
        <img
          onClick={() => openTrackModal(trackItem)}
          src={trackItem.image[2]["#text"]}
          alt="track"
          className="trending-img"
        />
        <p className="questrial pointer" style={{ fontWeight: "bold" }}>
          {trackItem.name}
        </p>
        <p
          className="questrial pointer"
          style={{ fontSize: "15px" }}
          onClick={() => {
            openArtistModal(trackItem.artist.mbid);
          }}
        >
          {trackItem.artist.name}
        </p>
      </div>
    );
  }
}

export default TrendingTrackListItem;
