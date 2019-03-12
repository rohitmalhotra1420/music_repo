import React, { Component } from "react";
import { getTrendingTracks, getTrackInfo } from "./api";
import TrendingTrackListItem from "./TrendingTrackListItem";
import TrendingTrackModal from "./TrendingTrackModal";
import ArtistDetailModal from "./ArtistDetailModal";
import SelectComponent from "./SelectComponent";

class TrendingTrackList extends Component {
  state = {
    loading: false,
    error: false,
    tracks: [],
    showTrackModal: false,
    trackId: null,
    showArtistModal: false,
    artistId: null
  };
  componentDidMount() {
    this.fetchTracks();
  }

  fetchTracks = country => {
    this.setState({ loading: true, tracks: [] });
    getTrendingTracks(country)
      .then(response => {
        console.log(response);
        if (response && response.tracks.track.length > 0) {
          this.setState({ loading: false, tracks: response.tracks.track });
        } else {
          this.setState({ loading: false, error: true });
        }
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
  };

  openTrackModal = trackData => {
    this.setState({
      showTrackModal: true,
      trackId: trackData.mbid,
      trackImage: trackData.image
    });
  };
  closeTrackModal = () => {
    this.setState({ showTrackModal: false });
  };
  openArtistModal = artistId => {
    this.setState({
      showArtistModal: true,
      artistId
    });
  };
  closeArtistModal = () => {
    this.setState({ showArtistModal: false });
  };
  render() {
    const {
      tracks,
      showTrackModal,
      trackId,
      loading,
      error,
      trackImage,
      showArtistModal,
      artistId
    } = this.state;

    return (
      <div>
        <SelectComponent
          onOptionChange={option => {
            this.fetchTracks(option);
          }}
        />
        {loading && <div className="centered-text">Loading...</div>}
        {error && <div className="centered-text">Error Loading Data</div>}
        <div className="trending-list-view">
          <div className="grid-container">
            {tracks &&
              tracks.map((trackItem, index) => {
                return (
                  <TrendingTrackListItem
                    trackItem={trackItem}
                    key={index}
                    openTrackModal={this.openTrackModal}
                    openArtistModal={this.openArtistModal}
                  />
                );
              })}
          </div>
          {showTrackModal && (
            <TrendingTrackModal
              showModal={showTrackModal}
              trackId={trackId}
              closeModal={this.closeTrackModal}
              trackImage={trackImage}
            />
          )}
          {showArtistModal && (
            <ArtistDetailModal
              showArtistModal={showArtistModal}
              closeArtistModal={this.closeArtistModal}
              artistId={artistId}
            />
          )}
        </div>
      </div>
    );
  }
}

export default TrendingTrackList;
