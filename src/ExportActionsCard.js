import {
  Button,
  Card,
  FormGroup,
  H5,
  HTMLSelect,
  Icon,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AsyncUtils } from "./AsyncUtils";
import React, { Fragment } from "react";

import "./ExportActionsCard.css";

function ExportToDirectoryButton(props) {
  const {
    disabled,
    loading,
    setLoading,
    setOutputPath,
    exportToDirectory,
  } = props;

  return (
    <Button
      fill={true}
      icon={IconNames.EXPORT}
      intent={Intent.PRIMARY}
      loading={loading}
      disabled={disabled}
      onClick={async () => {
        setLoading(true);

        const [outputPath] = await Promise.all([
          exportToDirectory(),
          AsyncUtils.sleep(200),
        ]);

        setLoading(false);
        setOutputPath(outputPath);
      }}
    >
      Export
    </Button>
  );
}

function ExportOutputPathFormGroup(props) {
  const { loading, outputPath } = props;

  return outputPath ? (
    <FormGroup
      className={"ExportActionsCard-output-path-form-group"}
      label="Export output"
    >
      <InputGroup
        disabled={loading}
        fill={true}
        value={outputPath}
        leftElement={<Icon icon={IconNames.FOLDER_CLOSE} />}
        rightElement={
          <Button
            loading={loading}
            icon={IconNames.DUPLICATE}
            title={"Copy to clipboard"}
            onClick={() => navigator.clipboard.writeText(outputPath)}
          />
        }
      />
    </FormGroup>
  ) : null;
}

function ExportOptionFragment(props) {
  const {
    exportTarget,
    disabled,
    loading,
    setLoading,
    outputPath,
    setOutputPath,
    ...other
  } = props;

  switch (exportTarget) {
    case "tempDir":
      const { exportReplaysToTemporaryDirectory } = other;

      return (
        <Fragment>
          <ExportToDirectoryButton
            disabled={disabled}
            loading={loading}
            setLoading={setLoading}
            setOutputPath={setOutputPath}
            exportToDirectory={exportReplaysToTemporaryDirectory}
          />
          <ExportOutputPathFormGroup
            loading={loading}
            outputPath={outputPath}
          />
        </Fragment>
      );
    default:
      return null;
  }
}

export class ExportActionsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exportOption: "tempDir",
      outputPath: null,
    };
  }

  render() {
    const {
      className,
      disabled,
      loading,
      setLoading,
      exportReplaysToTemporaryDirectory,
    } = this.props;

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
            onChange={(event) =>
              this.setState({ exportOption: event.currentTarget.value })
            }
          />
        </FormGroup>
        <ExportOptionFragment
          disabled={disabled}
          loading={loading}
          setLoading={setLoading}
          exportTarget={this.state.exportOption}
          outputPath={this.state.outputPath}
          setOutputPath={(outputPath) =>
            this.setState({ outputPath: outputPath })
          }
          exportReplaysToTemporaryDirectory={exportReplaysToTemporaryDirectory}
        />
      </Card>
    );
  }
}
