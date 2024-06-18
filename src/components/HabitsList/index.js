import React from "react";
import ActionButton from "../ActionButton";

import { getSortedHabitList, areHabitsPresent } from "../../utils";
import { EMPTY_ERROR_MESSAGE } from "../../constants";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import "./style.css";

export default function HabitsList({
  habitsList = [],
  onEdit,
  onFinish = () => {},
  onDelete = () => {},
}) {
  const isEmptyHabitList = areHabitsPresent(habitsList);
  const sortedHabitList = getSortedHabitList(habitsList);
  const renderHabits = sortedHabitList.map((date, index) => {
    let currentHabitDate = Object.keys(date)[0];
    let tasks = date[currentHabitDate].map(({ title, id, completed }) => {
      return (
        <div key={`${id}-${currentHabitDate}`} className="list-wrapper">
          <div className="title">
            <span className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => onFinish(id, currentHabitDate)}
              />
              <span className="custom-checkbox"></span>
            </span>
            <p data-id={id} className={completed ? "completed" : ""}>
              {title}
            </p>
          </div>
          <div className="action-button-wrapper">
            <ActionButton
              onClick={() => onEdit(id, currentHabitDate)}
              title="Edit"
              icon={editIcon}
            />
            <ActionButton
              onClick={() => onDelete(id, currentHabitDate)}
              title="Delete"
              icon={deleteIcon}
            />
          </div>
        </div>
      );
    });

    if (!tasks.length) return null;

    return (
      <li key={index}>
        <h3>{currentHabitDate}</h3>
        {tasks}
      </li>
    );
  });
  return (
    <div className="habit-list-wrapper">
      <h2>All Habits</h2>
      {isEmptyHabitList ? (
        <p className="error-message">{EMPTY_ERROR_MESSAGE}</p>
      ) : (
        <ul>{renderHabits}</ul>
      )}
    </div>
  );
}
