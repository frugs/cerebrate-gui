import React from "react";

import {
  Button,
  Card,
  Elevation,
  FileInput,
  FormGroup,
  H2,
  InputGroup,
  Intent, TextArea,
} from "@blueprintjs/core";

import "./SubmitReplayForm.css";
import SelectTagsInput from "./SelectTagsInput";

function SubmitReplayForm({ ...other }) {
  return (
    <Card
      interactive={true}
      elevation={Elevation.TWO}
      className={"SubmitReplayForm-card"}
    >
      <H2>Save replay tags</H2>
      <br />
      <FormGroup label="Replay ID">
        <InputGroup disabled={true} fill={true} value="" />
      </FormGroup>
      <FormGroup label="Replay path">
        <FileInput text="Choose replay file..." />
      </FormGroup>
      <FormGroup label="Player tags">
        <SelectTagsInput
          {...other}
          tagPrefix={"player:"}
          tagIntent={Intent.SUCCESS}
        />
      </FormGroup>
      <FormGroup label="Opponent tags">
        <SelectTagsInput
          {...other}
          tagPrefix={"opponent:"}
          tagIntent={Intent.DANGER}
        />
      </FormGroup>
      <FormGroup label="Game tags">
        <SelectTagsInput
          {...other}
          tagPrefix={"game:"}
          tagIntent={Intent.PRIMARY}
        />
      </FormGroup>
      <FormGroup label="Notes">
        <TextArea fill={true}/>
      </FormGroup>
      <Button fill={true} intent={Intent.SUCCESS}>Save tags</Button>
    </Card>
  );
}

export default SubmitReplayForm;
