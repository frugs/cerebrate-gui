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
import { Guy } from "./Guy";

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
    <FormGroup label="Export output directory">
      <InputGroup
        disabled={loading}
        fill={true}
        value={outputPath}
        leftElement={<Icon icon={IconNames.FOLDER_CLOSE} />}
        rightElement={
          <Fragment>
            <Button
              loading={loading}
              icon={IconNames.DUPLICATE}
              title={"Copy to clipboard"}
              onClick={() => navigator.clipboard.writeText(outputPath)}
            />
            <Button
              loading={loading}
              icon={IconNames.SHARE}
              title={"Open in file manager"}
              onClick={() => Guy.openDirInFileManager({ dirPath: outputPath })}
            />
          </Fragment>
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
    case "chooseDir":
      const {
        exportReplaysToTemporaryDirectory,
        exportReplaysToTargetDirectory,
      } = other;

      return (
        <Fragment>
          <ExportToDirectoryButton
            disabled={disabled}
            loading={loading}
            setLoading={setLoading}
            setOutputPath={setOutputPath}
            exportToDirectory={
              exportTarget === "tempDir"
                ? exportReplaysToTemporaryDirectory
                : exportReplaysToTargetDirectory
            }
          />
          <ExportOutputPathFormGroup
            loading={loading}
            outputPath={outputPath}
          />
        </Fragment>
      );
    case "scelight":
      const {
        scelightPath,
        setScelightPath,
        exportSelectedReplaysToScelight,
      } = other;

      return (
        <Fragment>
          <FormGroup label="Choose Scelight installation">
            <InputGroup
              disabled={loading}
              fill={true}
              value={scelightPath ? scelightPath : ""}
              leftElement={<Icon icon={IconNames.APPLICATION} />}
              rightElement={
                <Button
                  loading={loading}
                  icon={IconNames.DOCUMENT_OPEN}
                  title={"Choose location"}
                  onClick={async () => {
                    setLoading(true);

                    const [path] = await Promise.all([
                      Guy.selectScelightPath(),
                      AsyncUtils.sleep(200),
                    ]);

                    setScelightPath(path);

                    setLoading(false);
                  }}
                />
              }
            />
          </FormGroup>
          <Button
            fill={true}
            icon={IconNames.EXPORT}
            intent={Intent.PRIMARY}
            loading={loading}
            disabled={disabled || !scelightPath}
            onClick={async () => {
              setLoading(true);

              await Promise.all([
                exportSelectedReplaysToScelight(),
                AsyncUtils.sleep(200),
              ]);

              setLoading(false);
            }}
          >
            Export
          </Button>
        </Fragment>
      );
    case "sc2replaystats":
      const { exportSelectedReplaysToSc2ReplayStats } = other;
      return (
        <Button
          fill={true}
          icon={IconNames.EXPORT}
          intent={Intent.PRIMARY}
          loading={loading}
          disabled={disabled}
          onClick={async () => {
            setLoading(true);

            await Promise.all([
              exportSelectedReplaysToSc2ReplayStats(),
              AsyncUtils.sleep(200),
            ]);

            setLoading(false);
          }}
        >
          Export
        </Button>
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
      scelightPath: null,
    };
  }

  async componentDidMount() {
    this.setState({
      scelightPath: await Guy.getScelightPath(),
    });
  }

  render() {
    const {
      className,
      disabled,
      loading,
      setLoading,
      exportReplaysToTemporaryDirectory,
      exportReplaysToTargetDirectory,
      exportSelectedReplaysToScelight,
      exportSelectedReplaysToSc2ReplayStats,
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
              },
              {
                label: "Scelight",
                value: "scelight",
              },
              {
                label: "Sc2ReplayStats",
                value: "sc2replaystats",
              },
            ]}
            onChange={(event) =>
              this.setState({
                exportOption: event.currentTarget.value,
                outputPath: null,
              })
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
          scelightPath={this.state.scelightPath}
          setScelightPath={(scelightPath) =>
            this.setState({ scelightPath: scelightPath })
          }
          exportReplaysToTemporaryDirectory={exportReplaysToTemporaryDirectory}
          exportReplaysToTargetDirectory={exportReplaysToTargetDirectory}
          exportSelectedReplaysToScelight={exportSelectedReplaysToScelight}
          exportSelectedReplaysToSc2ReplayStats={
            exportSelectedReplaysToSc2ReplayStats
          }
        />
      </Card>
    );
  }
}
