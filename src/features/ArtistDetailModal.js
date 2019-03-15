import React, { Component } from "react";
import { getArtistInfo } from "./api";

class ArtistDetailModal extends Component {
  state = {
    loading: false,
    error: false,
    artistData: null,
    errorMessage: null
  };
  componentDidMount() {
    this.setState({ loading: true });
    getArtistInfo(this.props.artistId)
      .then(response => {
        if (response && response.artist) {
          console.log(response);
          this.setState({ artistData: response.artist, loading: false });
        } else {
          this.setState({
            error: true,
            loading: false,
            errorMessage: "Artist not found"
          });
        }
      })
      .catch(error => {
        this.setState({
          error: true,
          loading: false,
          errorMessage: "Error Loading Data"
        });
        console.log(error);
      });
  }
  render() {
    const { showArtistModal, closeArtistModal } = this.props;
    const { artistData, loading, error, errorMessage } = this.state;
    const showHideClassName = showArtistModal
      ? "modal display-block"
      : "modal display-none";
    console.log("artist data is ", artistData);
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {loading && <div className="centered-text">Loading...</div>}
          {error && <div className="centered-text">{errorMessage}</div>}
          {artistData !== null && (
            <div>
              <div className="modal-data-view">
                <div className="center">
                  <img
                    src={artistData.image[3]["#text"]}
                    alt="track"
                    className="trending-img"
                  />
                </div>
                <div className="center">
                  <h3 className="center questrial">{artistData.name}</h3>

                  <div className="listener-playcount-view">
                    <p
                      className="center questrial"
                      style={{ marginRight: "-30%" }}
                    >
                      <span className="orange">
                        {artistData.stats.listeners}
                      </span>{" "}
                      listeners
                    </p>
                    <p className="center questrial">
                      <span className="orange">
                        {artistData.stats.playcount}
                      </span>{" "}
                      playcounts
                    </p>
                  </div>
                </div>
                <div className="center">
                  {artistData.tags &&
                    artistData.tags.tag.map((tag, index) => {
                      return (
                        <span className="tag" key={index}>
                          {tag.name}
                        </span>
                      );
                    })}
                </div>
                <p className="questrial center" style={{ marginTop: "3%" }}>
                  Published On:{" "}
                  <span className="orange">{artistData.bio.published}</span>
                </p>
              </div>
              <div className="center">
                <p className="questrial orange" style={{ marginTop: "30px" }}>
                  Related Artists
                </p>
              </div>

              <div className="grid-container-related">
                {artistData.similar.artist.map((artist, index) => {
                  return (
                    <div className="grid-item" key={index}>
                      <img
                        src={artist.image[2]["#text"]}
                        alt="similar"
                        style={{ borderRadius: "10px" }}
                      />
                      <p className="orange questrial">{artist.name}</p>
                    </div>
                  );
                })}
              </div>
              <p
                className="questrial center"
                style={{ padding: "0 15%", lineHeight: "25px" }}
                dangerouslySetInnerHTML={{ __html: artistData.bio.summary }}
              />
            </div>
          )}
          <div className="center">
            <button onClick={closeArtistModal} className="close-btn">
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default ArtistDetailModal;
