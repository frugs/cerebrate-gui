import {
  Button,
  Card,
  FormGroup,
  H5,
  HTMLSelect,
  Icon,
  InputGroup,
  Intent,
  Overlay,
  Elevation,
  Classes,
  Tag,
  UL,
  Menu,
  MenuItem,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AsyncUtils } from "./AsyncUtils";
import React, { Fragment, useState } from "react";

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

  const [
    sc2ReplayStatsHelpOverlayOpen,
    setSc2ReplayStatsHelpOverlayOpen,
  ] = useState(false);
  const [
    sc2ReplayStatsExportedReplays,
    setSc2ReplayStatsExportedReplays,
  ] = useState([]);

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
      const {
        exportSelectedReplaysToSc2ReplayStats,
        sc2ReplayStatsAuthKey,
        setSc2ReplayStatsAuthKey,
      } = other;
      return (
        <Fragment>
          <FormGroup label="Sc2ReplayStats API Key">
            <InputGroup
              disabled={loading}
              fill={true}
              value={sc2ReplayStatsAuthKey ? sc2ReplayStatsAuthKey : ""}
              leftElement={<Icon icon={IconNames.APPLICATION} />}
              rightElement={
                <Button
                  disabled={loading}
                  icon={IconNames.HELP}
                  title={"Show help"}
                  onClick={() => setSc2ReplayStatsHelpOverlayOpen(true)}
                />
              }
              onChange={(event) =>
                setSc2ReplayStatsAuthKey(event.currentTarget.value)
              }
            />
          </FormGroup>
          <Button
            fill={true}
            icon={IconNames.EXPORT}
            intent={Intent.PRIMARY}
            loading={loading}
            disabled={disabled || !sc2ReplayStatsAuthKey}
            onClick={async () => {
              setLoading(true);

              const [exportedReplays] = await Promise.all([
                exportSelectedReplaysToSc2ReplayStats(sc2ReplayStatsAuthKey),
                AsyncUtils.sleep(200),
              ]);

              setSc2ReplayStatsExportedReplays(exportedReplays);

              setLoading(false);
            }}
          >
            Export
          </Button>
          {sc2ReplayStatsExportedReplays.length === 0 ? null : (
            <Menu className={"ExportActionsCard-sc2replaystats-export-list"}>
              {sc2ReplayStatsExportedReplays.map((replay) => (
                <MenuItem
                  text={
                    <div
                      className={
                        "ExportActionsCard-sc2replaystats-export-list-item"
                      }
                    >
                      <div>
                        <span
                          className={
                            "ExportActionsCard-sc2replaystats-export-list-replay-id"
                          }
                        >
                          {replay.replayId.substring(0, 8)}
                        </span>
                        &nbsp;
                        <span>{replay.teams.join(" vs ")}</span>
                      </div>
                      <div>
                        <a
                          href={replay.exportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {replay.exportUrl}
                        </a>
                      </div>
                    </div>
                  }
                />
              ))}
            </Menu>
          )}
          <Overlay isOpen={sc2ReplayStatsHelpOverlayOpen}>
            <Card
              className={"ExportActionsCard-sc2replaystats-help-overlay-card"}
              elevation={Elevation.FOUR}
            >
              <H5>How to find your Sc2ReplayStats API Key</H5>
              <UL>
                <li>
                  Open
                  <a
                    href="https://sc2replaystats.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sc2ReplayStats
                  </a>
                </li>
                <li>
                  Open the menu and navigate through to{" "}
                  <Tag large={true}>My Account</Tag>
                  &nbsp;
                  <Icon icon={IconNames.ARROW_RIGHT} />
                  &nbsp;
                  <Tag large={true}>Settings</Tag>
                </li>
                <li>
                  Click <Tag large={true}>API Access</Tag> in the side menu.
                </li>
                <li>
                  <Tag round={true} minimal={true}>
                    <em>Optional&nbsp;</em>
                  </Tag>{" "}
                  Click the <Tag large={true}>Generate New API Key</Tag> button.
                </li>
                <li>
                  Copy your authorization key and paste it into Cerebrate.
                </li>
              </UL>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={() => setSc2ReplayStatsHelpOverlayOpen(false)}>
                  Close
                </Button>
              </div>
            </Card>
          </Overlay>
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
      scelightPath: null,
      sc2ReplayStatsAuthKey: null,
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
          sc2ReplayStatsAuthKey={this.state.sc2ReplayStatsAuthKey}
          setSc2ReplayStatsAuthKey={(sc2ReplayStatsAuthKey) =>
            this.setState({ sc2ReplayStatsAuthKey: sc2ReplayStatsAuthKey })
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
