import { Card, FormGroup, H5, Switch } from "@blueprintjs/core";
import React, { useState } from "react";

import "./ReplayDateFilter.css";
import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";

export function ReplayDateFilter(props) {
  const {
    filterReplaysByDate,
    setFilterReplaysByDate,
    filterDateRange,
    setFilterDateRange,
    ...other
  } = props;

  const [selectedShortcutIndex, setSelectedShortcutIndex] = useState(0);

  return (
    <div>
      <Card className={"ReplayFilterAndSort-container"}>
        <H5 className={"ReplayFilterAndSort-control-group-heading"}>
          Replay date
        </H5>
        <FormGroup
          label="Filter by replay date"
          className={"ReplayDateFilter-replay-date-form-group"}
        >
          <Switch
            checked={filterReplaysByDate}
            innerLabel={"Show all replays"}
            innerLabelChecked={"Filter replays by date"}
            onChange={(event) =>
              setFilterReplaysByDate(event.currentTarget.checked)
            }
          />
        </FormGroup>
        {filterReplaysByDate ? (
          <FormGroup
            label="Choose dates"
            className={"ReplayDateFilter-replay-date-form-group"}
          >
            <div style={{ display: "inline-block" }}>
              <DateRangePicker
                className={"ReplayDateFilter-replay-date-range-picker"}
                maxDate={new Date()}
                singleMonthOnly={true}
                timePickerProps={{
                  autoFocus: true,
                  precision: TimePrecision.MINUTE,
                  defaultValue: new Date(),
                }}
                allowSingleDayRange={true}
                selectedShortcutIndex={selectedShortcutIndex}
                onShortcutChange={(shortcut, index) =>
                  setSelectedShortcutIndex(index)
                }
                value={filterDateRange}
                onChange={(selectedDates) => setFilterDateRange(selectedDates)}
                {...other}
              />
            </div>
          </FormGroup>
        ) : null}
      </Card>
    </div>
  );
}
