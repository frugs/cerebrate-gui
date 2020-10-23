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
import React from "react";

import "./ExportActionsCard.css";

export class ExportActionsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exportTarget: "tempDir",
      outputPath: null,
    };
  }

  renderExportOption() {
    const { disabled, loading, setLoading, ...other } = this.props;

    switch (this.state.exportTarget) {
      case "tempDir":
        const { exportReplaysToTemporaryDirectory } = other;

        return (
          <div>
            <Button
              fill={true}
              icon={IconNames.EXPORT}
              intent={Intent.PRIMARY}
              loading={loading}
              disabled={disabled}
              onClick={async () => {
                setLoading(true);

                const [outputPath] = await Promise.all([
                  exportReplaysToTemporaryDirectory(),
                  AsyncUtils.sleep(200),
                ]);

                setLoading(false);
                this.setState({ outputPath: outputPath });
              }}
            >
              Export
            </Button>
            {this.state.outputPath ? (
              <FormGroup
                className={"ExportActionsCard-output-path-form-group"}
                label="Export output"
              >
                <InputGroup
                  disabled={loading}
                  fill={true}
                  value={this.state.outputPath}
                  leftElement={<Icon icon={IconNames.FOLDER_CLOSE} />}
                  rightElement={
                    <Button
                      loading={loading}
                      icon={IconNames.DUPLICATE}
                      title={"Copy to clipboard"}
                      onClick={() =>
                        navigator.clipboard.writeText(this.state.outputPath)
                      }
                    />
                  }
                />
              </FormGroup>
            ) : null}
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    const { className } = this.props;

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
              this.setState({ exportTarget: event.currentTarget.value })
            }
          />
        </FormGroup>
        {this.renderExportOption()}
      </Card>
    );
  }
}
