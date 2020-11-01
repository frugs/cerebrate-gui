import { Card, FormGroup, H5, Icon, Switch } from "@blueprintjs/core";
import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";
import { IconNames } from "@blueprintjs/icons";
import React, { useState } from "react";

import "./ReplayDateFilter.css";
import { DateUtils } from "@blueprintjs/datetime";

export function ReplayDateFilter(props) {
  const {
    t,
    filterReplaysByDate,
    setFilterReplaysByDate,
    filterDateRange,
    setFilterDateRange,
    ...other
  } = props;

  const [selectedShortcutIndex, setSelectedShortcutIndex] = useState(0);

  const today = new Date();
  const makeDate = (action) => {
    const returnVal = DateUtils.clone(today);
    action(returnVal);
    returnVal.setDate(returnVal.getDate() + 1);
    return returnVal;
  };

  const yesterday = makeDate((d) => d.setDate(d.getDate() - 2));
  const threeDaysAgo = makeDate((d) => d.setDate(d.getDate() - 3));
  const oneWeekAgo = makeDate((d) => d.setDate(d.getDate() - 7));
  const oneMonthAgo = makeDate((d) => d.setMonth(d.getMonth() - 1));
  const twoMonthsAgo = makeDate((d) => d.setMonth(d.getMonth() - 2));
  const threeMonthsAgo = makeDate((d) => d.setMonth(d.getMonth() - 3));
  const sixMonthsAgo = makeDate((d) => d.setMonth(d.getMonth() - 6));
  const oneYearAgo = makeDate((d) => d.setFullYear(d.getFullYear() - 1));
  const twoYearsAgo = makeDate((d) => d.setFullYear(d.getFullYear() - 2));

  return (
    <div>
      <Card className={"ReplayFilterAndSort-container"}>
        <H5 className={"ReplayFilterAndSort-control-group-heading"}>
          <Icon icon={IconNames.CALENDAR} />{" "}
          {t("findReplaysReplayDateFilterHeading")}
        </H5>
        <FormGroup
          label={t("findReplaysReplayDateFilterLabel")}
          className={"ReplayDateFilter-replay-date-form-group"}
        >
          <Switch
            checked={filterReplaysByDate}
            innerLabel={t("findReplaysReplayDateFilterSwitchInnerLabel")}
            innerLabelChecked={t(
              "findReplaysReplayDateFilterSwitchInnerLabelChecked"
            )}
            onChange={(event) =>
              setFilterReplaysByDate(event.currentTarget.checked)
            }
          />
        </FormGroup>
        {filterReplaysByDate ? (
          <FormGroup
            label={t("findReplaysReplayDateFilterDateSelectorLabel")}
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
                shortcuts={[
                  { label: t("dateRangeToday"), dateRange: [today, today] },
                  {
                    label: t("dateRangePast2Days"),
                    dateRange: [yesterday, today],
                  },
                  {
                    label: t("dateRangePast3Days"),
                    dateRange: [threeDaysAgo, today],
                  },
                  {
                    label: t("dateRangePastWeek"),
                    dateRange: [oneWeekAgo, today],
                  },
                  {
                    label: t("dateRangePastMonth"),
                    dateRange: [oneMonthAgo, today],
                  },
                  {
                    label: t("dateRangePast2Months"),
                    dateRange: [twoMonthsAgo, today],
                  },
                  {
                    label: t("dateRangePast3Months"),
                    dateRange: [threeMonthsAgo, today],
                  },
                  {
                    label: t("dateRangePast6Months"),
                    dateRange: [sixMonthsAgo, today],
                  },
                  {
                    label: t("dateRangePastYear"),
                    dateRange: [oneYearAgo, today],
                  },
                  {
                    label: t("dateRangePast2Years"),
                    dateRange: [twoYearsAgo, today],
                  },
                ]}
                {...other}
              />
            </div>
          </FormGroup>
        ) : null}
      </Card>
    </div>
  );
}
