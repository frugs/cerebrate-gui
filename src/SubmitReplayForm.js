import React from "react";

import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from "@blueprintjs/core";

import { IconNames } from "@blueprintjs/icons";

import SelectTagsInput from "./SelectTagsInput";
import ReplaySelector from "./ReplaySelector";
import { SelectPlayerAndOpponentInput } from "./SelectPlayerAndOpponentInput";
import { ReplayDateFormGroup } from "./ReplayDateFormGroup";

function SubmitReplayForm(props) {
  const {
    notes,
    submittingReplay,
    setNotes,
    updateReplayInfo,
    ...other
  } = props;
  const {
    replayId,
    formDisabled,
    playerTeam,
    opponentTeam,
    failedToTagReplay,
    failedToLoadReplay,
  } = other;
  return (
    <div>
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
      <ReplayDateFormGroup {...other} />
      <SelectPlayerAndOpponentInput {...other} />
      <FormGroup label="Player tags">
        <SelectTagsInput
          {...other}
          disabled={formDisabled || playerTeam === null}
          tagPrefix={"player:"}
          tagIntent={Intent.SUCCESS}
        />
      </FormGroup>
      <FormGroup label="Opponent tags">
        <SelectTagsInput
          {...other}
          disabled={formDisabled || opponentTeam === null}
          tagPrefix={"opponent:"}
          tagIntent={Intent.DANGER}
        />
      </FormGroup>
      <FormGroup label="Game tags">
        <SelectTagsInput
          {...other}
          disabled={formDisabled}
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
          disabled={
            formDisabled || playerTeam === null || opponentTeam === null
          }
          onClick={updateReplayInfo}
          icon={IconNames.TAG}
        >
          Save tags
        </Button>
      </FormGroup>
    </div>
  );
}

export default SubmitReplayForm;
