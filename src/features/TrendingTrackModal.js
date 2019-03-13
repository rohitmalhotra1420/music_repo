import React, { Component } from "react";
import { getTrendingTracks, getTrackInfo } from "./api";

class TrendingTrackModal extends Component {
  state = {
    loading: false,
    error: false,
    trackData: null,
    errorMessage:null
  };
  componentDidMount() {
    this.setState({ loading: true });
    getTrackInfo(this.props.trackId)
      .then(response => {
       console.log(response);
        if (response && response.track) {
          this.setState({ trackData: response.track, loading: false });
        } else {
          this.setState({ error: true, loading: false ,errorMessage:response.message});
        }
      })
      .catch(error => {
        this.setState({ error: true, loading: false ,errorMessage:"Error Loading Data"});
        console.log(error);
      });
  }
  render() {
    const { closeModal, showModal, trackImage } = this.props;
    const { trackData, loading, error,errorMessage } = this.state;
    const showHideClassName = showModal
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {loading && <div className="centered-text">Loading...</div>}
          {error && <div className="centered-text">{errorMessage}</div>}
          {trackData !== null && (
            <div>
              <div className="modal-data-view">
                <div className="center">
                  <img
                    src={trackImage[3]["#text"]}
                    alt="track"
                    className="trending-img"
                  />
                </div>
                <div className="center">
                  <h3 className="center questrial">{trackData.name}</h3>
                  <div className="listener-playcount-view">
                    <p
                      className="center questrial"
                      style={{ marginRight: "-26%" }}
                    >
                      Album:{" "}
                      <span className="orange">{trackData.album.title}</span>
                    </p>
                    <p className="center questrial">
                      Artist:{" "}
                      <span className="orange">{trackData.artist.name}</span>
                    </p>
                  </div>
                  <div className="listener-playcount-view">
                    <p
                      className="center questrial"
                      style={{ marginRight: "-30%" }}
                    >
                      <span className="orange">{trackData.listeners}</span>{" "}
                      listeners
                    </p>
                    <p className="center questrial">
                      <span className="orange">{trackData.playcount}</span>{" "}
                      playcounts
                    </p>
                  </div>
                </div>
                <div className="center">
                  {trackData.toptags &&
                    trackData.toptags.tag.map((tag, index) => {
                      return (
                        <span className="tag" key={index}>
                          {tag.name}
                        </span>
                      );
                    })}
                </div>
                <p className="questrial center" style={{ marginTop: "3%" }}>
                  Published On:{" "}
                  <span className="orange">{trackData.wiki.published}</span>
                </p>
                <p
                  className="questrial center"
                  style={{ padding: "0 15%", lineHeight: "25px" }}
                >
                  {trackData.wiki.summary}
                </p>
              </div>
            </div>
          )}
          <div className="center">
            <button onClick={closeModal} className="close-btn">
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default TrendingTrackModal;
