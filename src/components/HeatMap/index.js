import { useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";

import {
  getOneYearPreviousDate,
  getCurrentDateISO,
  getTaskWithCompletedDates,
} from "../../utils";

import "react-calendar-heatmap/dist/styles.css";
import "./style.css";

export default function HeatMap({ habitsList = [] }) {
  const tasks = useMemo(() => {
    return getTaskWithCompletedDates(habitsList);
  }, [habitsList]);
  let renderHeatMap = tasks?.map((item, index) => {
    return (
      <div key={index}>
        <h4>{item.title}</h4>
        <CalendarHeatmap
          startDate={getOneYearPreviousDate()}
          endDate={getCurrentDateISO()}
          values={[...item.completedDates]}
        />
      </div>
    );
  });
  return (
    <div className="heatmap-wrapper">
      <h2>Progress</h2>
      {renderHeatMap}
    </div>
  );
}
