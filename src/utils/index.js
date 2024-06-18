export const getOneYearPreviousDate = () => {
  let date = new Date();
  let previousYear = date.getFullYear() - 1;
  date.setFullYear(previousYear);
  return date;
};

export const getCurrentDateISO = () => {
  return new Date().toISOString().slice(0, 10);
};

export const getSortedHabitList = (habitsList) =>
  habitsList.sort((a, b) => {
    const dateA = new Date(Object.keys(a)[0]);
    const dateB = new Date(Object.keys(b)[0]);
    return dateB - dateA;
  });

export const getTaskWithCompletedDates = (tasksList) => {
  const taskMap = {};
  tasksList.forEach((entry) => {
    const date = Object.keys(entry)[0];
    const tasks = entry[date];

    tasks.forEach((task) => {
      if (!taskMap[task.title]) {
        taskMap[task.title] = {
          title: task.title,
          completedDates: [],
        };
      }
      if (task.completed) {
        taskMap[task.title].completedDates.push({ date: date, count: 1 });
      }
    });
  });
  return Object.values(taskMap);
};

export const areHabitsPresent = (habitsList) => {
  for (const habit of habitsList) {
    const dateKey = Object.keys(habit)[0];
    if (habit[dateKey].length > 0) {
      return false;
    }
  }
  return true;
};

export const validateHabit = (habit) => {
  if (habit?.title.trim() === "") {
    return "Task can't be blank";
  }
  if (!habit?.habitStartDate) {
    return "Start date is required";
  }
  return "";
};
