export const MAX_COUNT = 4;
export const MAX_COUNT_ERROR = "Max habits that can be tracked are 4!";
export const EMPTY_ERROR_MESSAGE =
  "Nothing to show. Please add new habit to get started.";
export const DUPLICATE_ERROR_MESSAGE="Habit with the same title already exists for this date"
export const defaultHabitList = [
  {
    "2024-06-04": [
      {
        title: "Read book for 15 mins daily",
        completed: true,
        id: 1,
      },
      {
        title: "water plants daily",
        completed: true,
        id: 2,
      },
    ],
  },
  {
    "2024-06-02": [
      {
        title: "water plants daily",
        completed: true,
        id: 3,
      },
      {
        title: "Read book for 15 mins daily",
        completed: true,
        id: 4,
      },
      {
        title: "Go to dance class",
        completed: false,
        id: 5,
      },
    ],
  },
  {
    "2024-03-03": [
      {
        title: "water plants daily",
        completed: true,
        id: 6,
      },
      {
        title: "Go to dance class",
        completed: true,
        id: 7,
      },
      {
        title: "Read book for 15 mins daily",
        completed: false,
        id: 8,
      },
    ],
  },

  {
    "2024-05-01": [
      {
        title: "Go to dance class",
        completed: true,
        id: 9,
      },
      {
        title: "Go to dance class",
        completed: true,
        id: 10,
      },
      {
        title: "Read book for 15 mins daily",
        completed: false,
        id: 11,
      },
    ],
  },
];
