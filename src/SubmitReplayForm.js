import React from "react";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  H2,
  InputGroup,
  Intent,
  TextArea,
} from "@blueprintjs/core";

import { IconNames } from "@blueprintjs/icons";

import "./SubmitReplayForm.css";
import SelectTagsInput from "./SelectTagsInput";
import ReplaySelector from "./ReplaySelector";

function SubmitReplayForm(props) {
  let {
    replayId,
    notes,
    submittingReplay,
    setNotes,
    submitTaggedReplay,
    ...other
  } = props;
  const { formDisabled, failedToTagReplay, failedToLoadReplay } = other;
  return (
    <Card
      interactive={true}
      elevation={Elevation.TWO}
      className={"SubmitReplayForm-card"}
    >
      <H2>Save replay tags</H2>
      <br />
      <FormGroup label="Replay ID">
        <InputGroup disabled={true} fill={true} value={replayId} />
      </FormGroup>
      <FormGroup
        label="Replay file"
        intent={failedToLoadReplay ? Intent.DANGER : null}
        helperText={
          failedToLoadReplay
            ? "Failed to load replay, please select another or try again."
            : null
        }
      >
        <ReplaySelector fill={true} {...other} />
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
        <TextArea
          fill={true}
          disabled={formDisabled}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </FormGroup>
      <FormGroup
        intent={failedToTagReplay ? Intent.DANGER : null}
        helperText={
          failedToTagReplay
            ? "Failed to save tags, please select another replay or try again."
            : null
        }
      >
        <Button
          fill={true}
          loading={submittingReplay}
          intent={Intent.SUCCESS}
          disabled={formDisabled}
          onClick={submitTaggedReplay}
          icon={IconNames.TAG}
        >
          Save tags
        </Button>
      </FormGroup>
    </Card>
  );
}

export default SubmitReplayForm;
