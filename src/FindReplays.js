import React from "react";
import { ReplayTagTree } from "./ReplayTagTree";
import { ReplayFilterAndSort } from "./ReplayFilterAndSort";
import { Button, Intent, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import "./FindReplays.css";
import { AsyncUtils } from "./AsyncUtils";

export class FindReplays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterReplaysByDate: false,
      setFilterReplaysByDate: (filterReplaysByDate) => {
        this.setState({ filterReplaysByDate: filterReplaysByDate });
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

      includeTags: [],
      setIncludeTags: (includeTags) => {
        this.setState({
          includeTags: includeTags,
        });
      },

      excludeTags: [],
      setExcludeTags: (excludeTags) => {
        this.setState({
          excludeTags: excludeTags,
        });
      },

      loading: false,
      resultsCounter: 0,
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
                await AsyncUtils.sleep(200);

                this.setState({
                  loading: false,
                });
                this.setState({
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
