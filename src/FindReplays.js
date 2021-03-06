import React from "react";
import {
  forgetSelectedReplays,
  generateTagTreeContents,
  getSelectedReplays,
  ReplayTagTree,
} from "./ReplayTagTree";
import { ReplayFilterAndSort } from "./ReplayFilterAndSort";
import { Alert, Button, Card, Classes, H5, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import "./FindReplays.css";
import { AsyncUtils } from "./AsyncUtils";
import { Guy } from "./Guy";
import { DateUtils } from "./DateUtils";
import { ExportActionsCard } from "./ExportActionsCard";

const isValidDateRange = (dateRange) =>
  dateRange.length === 2 && dateRange[0] !== null && dateRange[1] !== null;

export class FindReplays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      resultsCounter: 0,

      filterReplaysByDate: false,
      setFilterReplaysByDate: (filterReplaysByDate) => {
        this.setState({ filterReplaysByDate: filterReplaysByDate });
      },

      filterDateRange: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],
      setFilterDateRange: (filterDateRange) => {
        this.setState({ filterDateRange: filterDateRange });
      },

      sortReplaysDescending: true,
      setSortReplaysDescending: (sortReplaysDescending) => {
        this.setState({
          sortReplaysDescending: sortReplaysDescending,
        });
      },

      sortTagsDescending: true,
      setSortTagsDescending: (sortReplaysDescending) => {
        this.setState({
          sortReplaysDescending: sortReplaysDescending,
        });
      },

      includeTags: ["game:1v1"],
      setIncludeTags: (includeTags) => {
        this.setState({
          includeTags: includeTags,
        });
      },

      excludeTags: ["opponent:ai"],
      setExcludeTags: (excludeTags) => {
        this.setState({
          excludeTags: excludeTags,
        });
      },

      tagTreeContents: [],
      setTagTreeContents: (tagTreeContents) => {
        this.setState({
          tagTreeContents: tagTreeContents,
        });
      },
      updateTagTree: () => {
        this.setState(this.state);
      },

      viewDetailsButtonLoading: false,
      isConfirmForgetAlertOpen: false,

      exportReplaysButtonLoading: false,
    };
  }

  getSelectedReplayIds = () => {
    return getSelectedReplays(this.state.tagTreeContents).map(
      (replay) => replay.replayId
    );
  };

  render() {
    const { t, setNavbarTabId } = this.props;

    return (
      <div>
        <div className={"FindReplays-filter-sort-container"}>
          <ReplayFilterAndSort {...this.props} {...this.state} />
          <Button
            fill={true}
            intent={Intent.PRIMARY}
            loading={this.state.loading}
            onClick={() => {
              this.setState({
                loading: true,
              });

              (async () => {
                const payload = {
                  includeTags: this.state.includeTags,
                  excludeTags: this.state.excludeTags,

                  ...(this.state.filterReplaysByDate &&
                    isValidDateRange(this.state.filterDateRange) && {
                      startTimestamp: DateUtils.toTimestamp(
                        this.state.filterDateRange[0]
                      ),
                      endTimestamp: DateUtils.toTimestamp(
                        this.state.filterDateRange[1]
                      ),
                    }),
                };

                const [{ replays, tagFrequencyTable }] = await Promise.all([
                  Guy.findReplays(payload),
                  AsyncUtils.sleep(200),
                ]);

                this.setState({
                  loading: false,
                  resultsCounter: this.state.resultsCounter + 1,
                  tagTreeContents: generateTagTreeContents(
                    replays,
                    tagFrequencyTable
                  ),
                });
              })();
            }}
            icon={IconNames.SEARCH}
          >
            {t("findReplaysFindReplaysButton")}
          </Button>
        </div>
        {this.state.resultsCounter === 0 ? null : (
          <div
            className={`FindReplays-results-container ${
              this.state.loading ? Classes.SKELETON : ""
            }`}
          >
            <ReplayTagTree
              className={"FindReplays-tag-tree"}
              key={this.state.resultsCounter}
              contents={this.state.tagTreeContents}
              {...this.props}
              {...this.state}
            />
            <div className={"FindReplays-result-options-container"}>
              <Card className={"FindReplays-result-options-card"}>
                <H5>{t("findReplaysReplayActionsHeading")}</H5>
                <Button
                  fill={true}
                  icon={IconNames.DOCUMENT}
                  disabled={
                    getSelectedReplays(this.state.tagTreeContents).length !== 1
                  }
                  loading={this.state.viewDetailsButtonLoading}
                  onClick={async (event) => {
                    const selectedReplays = getSelectedReplays(
                      this.state.tagTreeContents
                    );
                    if (selectedReplays.length !== 1) {
                      return;
                    }
                    this.setState({ viewDetailsButtonLoading: true });

                    await Guy.selectReplay({
                      replayId: selectedReplays[0].replayId,
                      force: true,
                    });

                    this.setState({ viewDetailsButtonLoading: false });
                    setNavbarTabId("form");
                  }}
                >
                  {t("findReplaysViewDetailsButton")}
                </Button>
                <Button
                  fill={true}
                  intent={Intent.WARNING}
                  icon={IconNames.DELETE}
                  disabled={
                    getSelectedReplays(this.state.tagTreeContents).length === 0
                  }
                  onClick={() => {
                    this.setState({ isConfirmForgetAlertOpen: true });
                  }}
                >
                  {t("findReplaysForgetReplaysButton")}
                </Button>
                <Alert
                  isOpen={this.state.isConfirmForgetAlertOpen}
                  cancelButtonText={t("findReplaysCancelForgetReplaysButton")}
                  confirmButtonText={t("findReplaysConfirmForgetReplaysButton")}
                  canOutsideClickCancel={true}
                  onCancel={() =>
                    this.setState({ isConfirmForgetAlertOpen: false })
                  }
                  onConfirm={async () => {
                    await Guy.forgetReplays({
                      replayIds: this.getSelectedReplayIds(),
                    });

                    forgetSelectedReplays(this.state.tagTreeContents);
                    this.state.updateTagTree();
                    this.setState({ isConfirmForgetAlertOpen: false });
                  }}
                  intent={Intent.WARNING}
                  icon={IconNames.WARNING_SIGN}
                >
                  {t("findReplaysForgetReplaysWarningText")}
                </Alert>
              </Card>
              <ExportActionsCard
                t={t}
                className={"FindReplays-result-options-card"}
                loading={this.state.exportReplaysButtonLoading}
                setLoading={(loading) =>
                  this.setState({ exportReplaysButtonLoading: loading })
                }
                disabled={
                  getSelectedReplays(this.state.tagTreeContents).length === 0
                }
                exportReplaysToTemporaryDirectory={async () =>
                  Guy.exportReplaysToTempDir({
                    replayIds: this.getSelectedReplayIds(),
                  })
                }
                exportReplaysToTargetDirectory={async () =>
                  Guy.exportReplaysToTargetDir({
                    replayIds: this.getSelectedReplayIds(),
                  })
                }
                exportSelectedReplaysToScelight={async () =>
                  Guy.exportReplaysToScelight({
                    replayIds: this.getSelectedReplayIds(),
                  })
                }
                exportSelectedReplaysToSc2ReplayStats={async (authKey) =>
                  Guy.exportReplaysToSc2ReplayStats({
                    replayIds: this.getSelectedReplayIds(),
                    authKey: authKey,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
