import React from "react";
import { Classes, Icon, Tree } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import Guy from "./Guy";
import TagUtils from "./TagUtils";
import DateUtils from "./DateUtils";

import "./ReplayTagTree.scss";

const NodeType = {
  ROOT: "root",
  REPLAY_FOLDER: "replay_folder",
  REPLAY: "replay",
  TAG: "tag",
  LOADING: "loading",
};

export class ReplayTagTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [
        {
          id: 0,
          nodeType: NodeType.ROOT,
          filterTags: [],
          icon: (
            <Icon
              icon={IconNames.LIST_COLUMNS}
              className={Classes.TREE_NODE_ICON}
            />
          ),
          label: (
            <div className={"ReplayTagTree-tree-node-label-root"}>
              <strong>Replay results</strong>
            </div>
          ),
          isExpanded: true,
          childNodes: [
            {
              id: 0,
              nodeType: NodeType.LOADING,
              label: (
                <span>
                  <em>Loading...</em>
                </span>
              ),
              disabled: true,
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    (async () => {
      this.getRootNode().childNodes = await this.generateChildNodes(
        this.getRootNode()
      );
      this.setState(this.state);
    })();
  }

  getRootNode = () => {
    return this.state.contents[0];
  };

  generateReplayFolderChildNodes = async (filterTags) => {
    const replaySummaries = await Guy.fetchReplaySummaries(filterTags);

    return replaySummaries.map((replaySummary, index) => ({
      id: index + 1,
      nodeType: NodeType.REPLAY,
      replaySummary: replaySummary,
      icon: (
        <Icon icon={IconNames.DOCUMENT} className={Classes.TREE_NODE_ICON} />
      ),
      className: "ReplayTagTree-tree-node",
      label: (
        <div className={"ReplayTagTree-tree-node-label-replay"}>
          <div className={"ReplayTagTree-tree-node-label-replay-id"}>
            {replaySummary.replayId.substring(0, 8)}
          </div>
          &nbsp;
          <div className={"ReplayTagTree-tree-node-label-replay-teams"}>
            {replaySummary.teams.join(" vs ")}
          </div>
          {replaySummary.notes ? (
            <div className={"ReplayTagTree-tree-node-label-replay-notes"}>
              <em>{replaySummary.notes}</em>
            </div>
          ) : null}
        </div>
      ),
      secondaryLabel: (
        <div className={"ReplayTagTree-tree-node-secondary-label"}>
          <em>{DateUtils.formatDate(replaySummary.replayTimestamp)}</em>
        </div>
      ),
    }));
  };

  generateTagChildNodes = async (filterTags) => {
    const tagFrequencyTable = await Guy.fetchTagFrequencyTable(filterTags);

    return [
      {
        id: 0,
        nodeType: NodeType.REPLAY_FOLDER,
        filterTags: filterTags,
        icon: (
          <Icon
            icon={IconNames.FOLDER_OPEN}
            className={Classes.TREE_NODE_ICON}
          />
        ),
        label: "Replays",
        childNodes: [
          {
            id: 0,
            nodeType: NodeType.LOADING,
            label: (
              <span>
                <em>Loading...</em>
              </span>
            ),
            disabled: true,
          },
        ],
      },
    ].concat(
      tagFrequencyTable.map((tagInfo, index) => ({
        id: index + 1,
        nodeType: NodeType.TAG,
        filterTags: filterTags.concat(tagInfo.tag),
        icon: (
          <Icon
            icon={IconNames.TAG}
            intent={TagUtils.getTagIntent(tagInfo.tag)}
            className={Classes.TREE_NODE_ICON}
          />
        ),
        label: (
          <div>
            <span
              className={
                "ReplayTagTree-tree-node-label-" +
                TagUtils.extractPrefix(tagInfo.tag) +
                "-tag"
              }
            >
              <span className="ReplayTagTree-tree-node-label-tag-prefix">
                {TagUtils.extractPrefix(tagInfo.tag)}:&nbsp;
              </span>
              <span className="ReplayTagTree-tree-node-label-tag-name">
                <strong>{TagUtils.removePrefix(tagInfo.tag)}</strong>
              </span>
            </span>
          </div>
        ),
        secondaryLabel: (
          <span className={"ReplayTagTree-tree-node-secondary-label"}>
            <em>{"Replay(s): " + tagInfo.frequency} </em>
          </span>
        ),
        childNodes: [
          {
            id: 0,
            nodeType: NodeType.LOADING,
            label: (
              <span>
                <em>Loading...</em>
              </span>
            ),
            disabled: true,
          },
        ],
      }))
    );
  };

  generateChildNodes = async (parentNode) => {
    switch (parentNode.nodeType) {
      case NodeType.REPLAY_FOLDER:
        return await this.generateReplayFolderChildNodes(parentNode.filterTags);
      case NodeType.ROOT:
      case NodeType.TAG:
        return await this.generateTagChildNodes(parentNode.filterTags);
      default:
        return [];
    }
  };

  handleNodeCollapse = (nodeData) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand = (nodeData) => {
    nodeData.isExpanded = true;
    this.setState(this.state);

    (async () => {
      nodeData.childNodes = await this.generateChildNodes(nodeData);
      this.setState(this.state);
    })();
  };

  render() {
    return (
      <Tree
        {...this.props}
        contents={this.state.contents}
        onNodeExpand={this.handleNodeExpand}
        onNodeCollapse={this.handleNodeCollapse}
      />
    );
  }
}
