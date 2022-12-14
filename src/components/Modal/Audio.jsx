import React from "react";
import { Modal, Stack } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Audio ({ show, onHide, dataAudio }) {
  const style = {
    imgMusic: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
    }
  }
  return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Body>
        <Stack direction="horizontal" gap={3}>
          <img alt="" src={dataAudio?.thumbnail} style={style.imgMusic}/>
          <Stack direction="vertical">
          <p>
            {dataAudio?.title} - {dataAudio?.singer.name}
          </p>
          <Stack direction="horizontal">
            <AudioPlayer
            autoPlay
            src={dataAudio?.music_file}
            layout="horizontal"
            className="player"
            />
          </Stack>
            </Stack>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default Audio;