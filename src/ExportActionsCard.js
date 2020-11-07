import {
  Button,
  Card,
  Classes,
  Dialog,
  FormGroup,
  H5,
  HTMLSelect,
  Icon,
  InputGroup,
  Intent,
  Menu,
  MenuItem,
  Tag,
  UL,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AsyncUtils } from "./AsyncUtils";
import React, { Fragment, useState } from "react";
import { Trans } from "react-i18next";

import "./ExportActionsCard.css";
import { Guy } from "./Guy";

function Sc2ReplayStats() {
  return (
    <a
      href="https://sc2replaystats.com/Account/signin"
      target="_blank"
      rel="noopener noreferrer"
    >
      Sc2ReplayStats
    </a>
  );
}

function MyAccountThenSettings() {
  return (
    <Fragment>
      <Tag large={true}>My Account</Tag> <Icon icon={IconNames.ARROW_RIGHT} />{" "}
      <Tag large={true}>Settings</Tag>
    </Fragment>
  );
}

function ApiAccess() {
  return <Tag large={true}>API Access</Tag>;
}

function GenerateApiKey() {
  return <Tag large={true}>Generate New API Key</Tag>;
}

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
  const { t, loading, outputPath } = props;

  return outputPath ? (
    <FormGroup label={t("exportDirInputLabel")}>
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
              title={t("copyToClipboardButtonLabel")}
              onClick={() => navigator.clipboard.writeText(outputPath)}
            />
            <Button
              loading={loading}
              icon={IconNames.SHARE}
              title={t("openInFileManagerButtonLabel")}
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
    t,
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
  const [showSc2ReplayStatsAuthKey, setShowSc2ReplayStatsAuthKey] = useState(
    false
  );

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
          <FormGroup label={t("scelightInstallationDirPickerLabel")}>
            <InputGroup
              disabled={loading}
              fill={true}
              value={scelightPath ? scelightPath : ""}
              leftElement={<Icon icon={IconNames.APPLICATION} />}
              rightElement={
                <Button
                  loading={loading}
                  icon={IconNames.DOCUMENT_OPEN}
                  title={t("chooseLocationButtonLabel")}
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
          <FormGroup label={t("sc2ReplayStatsApiKeyLabel")}>
            <InputGroup
              type={showSc2ReplayStatsAuthKey ? "text" : "password"}
              disabled={loading}
              fill={true}
              value={sc2ReplayStatsAuthKey ? sc2ReplayStatsAuthKey : ""}
              leftElement={<Icon icon={IconNames.KEY} />}
              rightElement={
                <Fragment>
                  <Button
                    disabled={loading}
                    icon={showSc2ReplayStatsAuthKey ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={() =>
                      setShowSc2ReplayStatsAuthKey(!showSc2ReplayStatsAuthKey)
                    }
                    title={
                      showSc2ReplayStatsAuthKey
                        ? t("hideApiKeyButtonTitle")
                        : t("showApiKeyButtonTitle")
                    }
                  />
                  <Button
                    disabled={loading}
                    icon={IconNames.HELP}
                    title={t("showHelpButtonTitle")}
                    onClick={() => setSc2ReplayStatsHelpOverlayOpen(true)}
                  />
                </Fragment>
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
            {t("exportButtonLabel")}
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
          <Dialog
            title={t("sc2ReplayStatsHelpDialogTitle")}
            isOpen={sc2ReplayStatsHelpOverlayOpen}
            onClose={() => setSc2ReplayStatsHelpOverlayOpen(false)}
          >
            <UL>
              <li>
                <Trans
                  i18nKey={"sc2ReplayStatsHelpDialogStep1"}
                  components={{
                    Sc2ReplayStats: <Sc2ReplayStats />,
                  }}
                >
                  {t("sc2ReplayStatsHelpDialogStep1")}
                </Trans>
              </li>
              <li>
                <Trans
                  i18nKey={"sc2ReplayStatsHelpDialogStep2"}
                  components={{
                    MyAccountThenSettings: <MyAccountThenSettings />,
                  }}
                >
                  {t("sc2ReplayStatsHelpDialogStep2")}
                </Trans>
              </li>
              <li>
                <Trans
                  i18nKey={"sc2ReplayStatsHelpDialogStep3"}
                  components={{
                    ApiAccess: <ApiAccess />,
                  }}
                >
                  {t("sc2ReplayStatsHelpDialogStep3")}
                </Trans>
              </li>
              <Trans
                i18nKey={"sc2ReplayStatsHelpDialogStep4"}
                components={{
                  GenerateApiKey: <GenerateApiKey />,
                }}
              >
                {t("sc2ReplayStatsHelpDialogStep4")}
              </Trans>
              <li>{t("sc2ReplayStatsHelpDialogStep5")}</li>
            </UL>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={() => setSc2ReplayStatsHelpOverlayOpen(false)}>
                  {t("close")}
                </Button>
              </div>
            </div>
          </Dialog>
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
      sc2ReplayStatsAuthKey: await Guy.getSc2ReplayStatsAuthKey(),
    });
  }

  render() {
    const {
      t,
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
        <H5>{t("exportActionsHeader")}</H5>
        <FormGroup label={t("exportTargetPickerLabel")}>
          <HTMLSelect
            fill={true}
            options={[
              { label: t("exportToTempDirOptionLabel"), value: "tempDir" },
              {
                label: t("exportToTargetDirOptionLabel"),
                value: "chooseDir",
              },
              {
                label: t("exportToScelightOptionLabel"),
                value: "scelight",
              },
              {
                label: t("exportToSc2ReplayStatsOptionLabel"),
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
          t={t}
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
