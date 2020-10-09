import React from "react";
import { FileInput } from "@blueprintjs/core";
import CryptoJS from "crypto-js/crypto-js";
import "crypto-js/lib-typedarrays";

const getFilename = (path) => path.split("\\").pop().split("/").pop();

class ReplaySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true,
      text: "Choose replay file...",
    };
  }

  render() {
    const { setReplayId, setReplayData } = this.props;

    return (
      <FileInput
        text={this.state.text}
        onInputChange={(event) => {
          const path = event.target.value;
          const file = event.target.files[0];

          this.setState({ text: getFilename(path) });

          const hashReader = new FileReader();
          hashReader.addEventListener("load", (event) => {
            const data = event.target.result;
            const hash = CryptoJS.SHA256(
              CryptoJS.lib.WordArray.create(data)
            ).toString();
            setReplayId(hash);
          });
          hashReader.readAsArrayBuffer(file);

          const dataReader = new FileReader();
          dataReader.addEventListener("load", (event) => {
            const data = event.target.result;
            setReplayData(data);
          });
          dataReader.readAsDataURL(file);
        }}
        inputProps={{ accept: ".sc2replay" }}
      />
    );
  }
}

export default ReplaySelector;
