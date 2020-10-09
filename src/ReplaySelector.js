import React from "react";
import { FileInput } from "@blueprintjs/core";
import CryptoJS from "crypto-js/crypto-js";
import "crypto-js/lib-typedarrays";
import Guy from "./Guy";

const REPLAY_FILE_PLACEHOLDER_TEXT = "Choose replay file...";

const getFilename = (path) => path.split("\\").pop().split("/").pop();

class ReplaySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true,
      disabled: false,
    };
  }

  render() {
    const {
      replayFileName,
      setReplayId,
      setReplayFileName,
      setReplayData,
      resetAndDisableForm,
      ...other
    } = this.props;

    return (
      <FileInput
        disabled={this.state.disabled}
        text={replayFileName || REPLAY_FILE_PLACEHOLDER_TEXT}
        onInputChange={(event) => {
          const path = event.target.value;
          if (!path || !event.target.files) {
              return;
          }

          const file = event.target.files[0];

          this.setState({ disabled: true });
          setReplayFileName(getFilename(path));
          resetAndDisableForm();

          const hashReader = new FileReader();
          hashReader.addEventListener("load", (event) => {
            const data = event.target.result;
            const hash = CryptoJS.SHA256(
              CryptoJS.lib.WordArray.create(data)
            ).toString();
            setReplayId(hash);

            const dataReader = new FileReader();
            dataReader.addEventListener("load", (event) => {
              const data = event.target.result;
              setReplayData(data);

              this.setState({ disabled: false });
              Guy.selectReplay({ replayId: hash, replayData: data });
            });
            dataReader.readAsDataURL(file);
          });
          hashReader.readAsArrayBuffer(file);
        }}
        inputProps={{ accept: ".sc2replay" }}
        {...other}
      />
    );
  }
}

export default ReplaySelector;
