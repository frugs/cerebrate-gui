import React from "react";
import { ReplayTagTree } from "./ReplayTagTree";
import { ReplayFilterAndSort } from "./ReplayFilterAndSort";
import { Button, Intent, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import "./FindReplays.css";
import { AsyncUtils } from "./AsyncUtils";
import { Guy } from "./Guy";
import { DateUtils } from "./DateUtils";

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

      rootNodeReplays: [],
      rootNodeTagFrequencyTable: [],
    };
  }

  render() {
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
                  rootNodeReplays: replays,
                  rootNodeTagFrequencyTable: tagFrequencyTable,
                  loading: false,
                  resultsCounter: this.state.resultsCounter + 1,
                });
              })();
            }}
            icon={IconNames.SEARCH}
          >
            Find replays
          </Button>
        </div>
        {this.state.resultsCounter === 0 ? null : (
          <ReplayTagTree
            key={this.state.resultsCounter}
            className={this.state.loading ? Classes.SKELETON : ""}
            {...this.props}
            {...this.state}
          />
        )}
      </div>
    );
  }
}
