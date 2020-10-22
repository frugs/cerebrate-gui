import {
  Button,
  Card,
  FormGroup,
  H5,
  HTMLSelect,
  Intent,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AsyncUtils } from "./AsyncUtils";
import React from "react";

export function ExportActionsCard(props) {
  const {
    className,
    disabled,
    loading,
    setLoading,
    exportReplaysToTemporaryDirectory,
  } = props;

  return (
    <Card className={className}>
      <H5>Export actions</H5>
      <FormGroup label={"Export replay(s) to"}>
        <HTMLSelect
          fill={true}
          options={[
            { label: "Temporary directory", value: "tempDir" },
            {
              label: "Choose directory...",
              value: "chooseDir",
              disabled: true,
            },
            {
              label: "Scelight",
              value: "scelight",
              disabled: true,
            },
            {
              label: "Sc2ReplayStats",
              value: "sc2replaystats",
              disabled: true,
            },
          ]}
        />
      </FormGroup>
      <Button
        fill={true}
        icon={IconNames.EXPORT}
        intent={Intent.PRIMARY}
        loading={loading}
        disabled={disabled}
        onClick={async () => {
          setLoading(true);

          await Promise.all([
            exportReplaysToTemporaryDirectory(),
            AsyncUtils.sleep(200),
          ]);

          setLoading(false);
        }}
      >
        Export
      </Button>
    </Card>
  );
}
