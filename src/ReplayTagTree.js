import React from "react";
import { Classes, Icon, Tree } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { Guy } from "./Guy";
import { TagUtils } from "./TagUtils";
import { DateUtils } from "./DateUtils";

import "./ReplayTagTree.scss";

const NodeType = {
  ROOT: "root",
  REPLAY_FOLDER: "replay_folder",
  REPLAY: "replay",
  TAG: "tag",
  LOADING: "loading",
};

export class ReplayTagTree extends React.Component {
  deselectNodes = (nodes) => {
    if (!nodes) {
      return;
    }

    for (const nodeData of nodes) {
      nodeData.isSelected = false;
      this.deselectNodes(nodeData.childNodes);
    }
  };

  deselectAllNodes = () => {
    this.deselectNodes(this.props.contents);
  };

  handleNodeClick = async (nodeData, _, event) => {
    switch (nodeData.nodeType) {
      case NodeType.TAG:
        await this.handleNodeExpand(nodeData);
        break;
      case NodeType.REPLAY_FOLDER:
      case NodeType.REPLAY:
        if (!event.shiftKey) {
          const wasSelected = nodeData.isSelected;
          this.deselectAllNodes();
          nodeData.isSelected =
            nodeData.nodeType === NodeType.REPLAY || !wasSelected;
        } else {
          nodeData.isSelected = !nodeData.isSelected;
        }

        if (nodeData.childNodes) {
          for (let childNode of nodeData.childNodes) {
            childNode.isSelected = nodeData.isSelected;
          }
        }

        if (nodeData.isSelected && !nodeData.isExpanded) {
          await this.handleNodeExpand(nodeData);
        }
        break;
      default:
        break;
    }

    this.props.updateTagTree();
  };

  handleNodeCollapse = (nodeData) => {
    if (nodeData.nodeType === NodeType.ROOT) {
      return;
    }

    if (nodeData.nodeType === NodeType.TAG) {
      this.deselectNodes(nodeData.childNodes);
    }

    nodeData.isExpanded = false;
    this.props.updateTagTree();
  };

  handleNodeExpand = async (nodeData) => {
    nodeData.isExpanded = true;

    switch (nodeData.nodeType) {
      case NodeType.TAG:
        await this.handleTagNodeExpand(nodeData);
        break;
      default:
        break;
    }

    this.props.updateTagTree();
  };

  handleTagNodeExpand = async (nodeData) => {
    const { includeTags, excludeTags } = this.props;

    const { replays, tagFrequencyTable } = await Guy.findReplays({
      includeTags: includeTags.concat(nodeData.filterTags),
      excludeTags: excludeTags,
    });

    nodeData.childNodes = generateTagOrRootChildNodes(
      nodeData.filterTags,
      replays,
      tagFrequencyTable
    );
  };

  render() {
    return (
      <Tree
        {...this.props}
        onNodeClick={this.handleNodeClick}
        onNodeExpand={this.handleNodeExpand}
        onNodeCollapse={this.handleNodeCollapse}
      />
    );
  }
}

const generateReplayFolderChildNodes = (replays) => {
  return replays.map((replay, index) => ({
    id: index + 1,
    nodeType: NodeType.REPLAY,
    replay: replay,
    icon: <Icon icon={IconNames.DOCUMENT} className={Classes.TREE_NODE_ICON} />,
    className: "ReplayTagTree-tree-node",
    label: (
      <div className={"ReplayTagTree-tree-node-label-replay"}>
        <div className={"ReplayTagTree-tree-node-label-replay-id"}>
          {replay.replayId.substring(0, 8)}
        </div>
        &nbsp;
        <div className={"ReplayTagTree-tree-node-label-replay-teams"}>
          {replay.teams.join(" vs ")}
        </div>
        {replay.notes ? (
          <div className={"ReplayTagTree-tree-node-label-replay-notes"}>
            <em>{replay.notes}</em>
          </div>
        ) : null}
      </div>
    ),
    secondaryLabel: (
      <div className={"ReplayTagTree-tree-node-secondary-label"}>
        <em>{DateUtils.formatDate(replay.replayTimestamp)}</em>
      </div>
    ),
  }));
};

const generateTagOrRootChildNodes = (
  filterTags,
  replays,
  tagFrequencyTable
) => {
  return [
    {
      id: 0,
      nodeType: NodeType.REPLAY_FOLDER,
      filterTags: filterTags,
      icon: (
        <Icon icon={IconNames.FOLDER_OPEN} className={Classes.TREE_NODE_ICON} />
      ),
      label: "Replays",
      childNodes: generateReplayFolderChildNodes(replays),
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

export const generateTagTreeContents = (replays, tagFrequencyTable) => [
  {
    id: 0,
    nodeType: NodeType.ROOT,
    filterTags: [],
    icon: (
      <Icon icon={IconNames.LIST_COLUMNS} className={Classes.TREE_NODE_ICON} />
    ),
    label: (
      <div className={"ReplayTagTree-tree-node-label-root"}>
        <strong>Replay results</strong>
      </div>
    ),
    isExpanded: true,
    childNodes: generateTagOrRootChildNodes([], replays, tagFrequencyTable),
  },
];

export const getSelectedReplays = (nodes) => {
  if (!nodes) {
    return [];
  }

  return nodes
    .filter(
      (nodeData) => nodeData.isSelected && nodeData.nodeType === NodeType.REPLAY
    )
    .map((nodeData) => nodeData.replay)
    .concat(
      nodes.map((nodeData) => getSelectedReplays(nodeData.childNodes)).flat()
    );
};
