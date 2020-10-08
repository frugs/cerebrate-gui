import React from "react";
import { FileInput } from "@blueprintjs/core";
import CryptoJS from "crypto-js/crypto-js";

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

          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            const data = event.target.result;
            const base64data = Buffer.from(data).toString("base64");
            const hash =  CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(data)).toString();
            setReplayId(hash);
              setReplayData("data:application/octet-stream;base64," + base64data);
          });
          reader.readAsBinaryString(file);
        }}
        inputProps={{ accept: ".sc2replay" }}
      />
    );
  }
}

export default ReplaySelector;
