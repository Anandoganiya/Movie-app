import React, { useEffect, useState, useRef } from "react";
import ModalStyle from "../styles/Modal.module.scss";
import { MdCancel } from "react-icons/md";
import { img_300 } from "../config/config";
import ClipLoader from "react-spinners/ClipLoader";

const Modal = ({ content, setToggleModal, toggleModal }) => {
  const [modalContent, setModalContent] = useState({});
  const [loading, setLoading] = useState(true);
  const movieModalContainer = useRef(null);
  const seriesModalContainer = useRef(null);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${content.media_type}/${content.id}?api_key=5337a3932c7f5952d92e1ea0248df79e&language=en-US`
      );
      const resJson = await res.json();
      setModalContent(resJson);
      setLoading(false);
    };
    if (content) {
      fetchData();
    }
    return () => {
      setModalContent({});
    };
  }, [content]);
  const handleMovieModal = (e) => {
    if (e.target === movieModalContainer.current) {
      setToggleModal(false);
    }
  };
  const handleSeriesModal = (e) => {
    if (e.target === seriesModalContainer.current) {
      setToggleModal(false);
    }
  };
  return (
    <>
      {content.media_type === "movie" ? (
        <div
          ref={movieModalContainer}
          className={ModalStyle.container}
          onClick={(e) => handleMovieModal(e)}
        >
          <div className={ModalStyle.modalContentStyle}>
            <div className={ModalStyle.cross}>
              <MdCancel
                onClick={() => setToggleModal(!toggleModal)}
                style={{ fontSize: "1.5rem" }}
              />
            </div>
            {modalContent && loading ? (
              <div style={{ textAlign: "center" }}>
                <ClipLoader></ClipLoader>
              </div>
            ) : (
              <div>
                <div className={ModalStyle.poster}>
                  <img
                    src={`${img_300}/${modalContent.poster_path}`}
                    width={200}
                    height={300}
                  ></img>
                  <div className={ModalStyle.desc}>
                    <div className={ModalStyle.title}>
                      Movie : <span>{modalContent.original_title}</span>
                    </div>
                    <span>Description :</span>
                    <p>{modalContent.overview}</p>
                    <p>
                      <span style={{ fontWeight: "600" }}> Duration</span> :{" "}
                      {modalContent.runtime}
                    </p>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        marginRight: ".5rem",
                      }}
                    >
                      genres:
                    </span>
                    {modalContent.genres
                      ? modalContent?.genres.map((item) => {
                          return (
                            <span
                              style={{
                                fontSize: "1rem",
                                fontWeight: "normal",
                                marginRight: ".5rem",
                              }}
                              key={item.id}
                            >
                              {item.name}
                            </span>
                          );
                        })
                      : null}
                    <div className={ModalStyle.ratings}>
                      Ratings : <p> {modalContent.vote_average}</p>
                    </div>
                    <div className={ModalStyle.date}>
                      Release Date : <p> {modalContent.release_date}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          ref={seriesModalContainer}
          className={ModalStyle.container}
          onClick={(e) => handleSeriesModal(e)}
        >
          <div className={ModalStyle.modalContentStyle}>
            <div className={ModalStyle.cross}>
              <MdCancel
                onClick={() => setToggleModal(!toggleModal)}
                style={{ fontSize: "1.5rem" }}
              />
            </div>
            {modalContent && loading ? (
              <div style={{ textAlign: "center" }}>
                <ClipLoader></ClipLoader>
              </div>
            ) : (
              <div>
                <div className={ModalStyle.poster}>
                  <img
                    src={`${img_300}/${modalContent.poster_path}`}
                    width={200}
                    height={300}
                  ></img>
                  <div className={ModalStyle.desc}>
                    <div className={ModalStyle.title}>
                      TV :<span>{modalContent.original_name}</span>
                    </div>
                    <span>Description :</span>
                    <p>{modalContent.overview}</p>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        marginRight: ".5rem",
                      }}
                    >
                      genres:
                    </span>
                    {modalContent.genres
                      ? modalContent?.genres.map((item) => {
                          return (
                            <span
                              style={{
                                fontSize: "1rem",
                                fontWeight: "normal",
                                marginRight: ".5rem",
                              }}
                              key={item.id}
                            >
                              {item.name}
                            </span>
                          );
                        })
                      : null}
                    <div className={ModalStyle.ratings}>
                      Ratings : <p> {modalContent.vote_average}</p>
                    </div>
                    <div className={ModalStyle.date}>
                      Release Date :<p>{modalContent.first_air_date}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
