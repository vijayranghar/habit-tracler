import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import HabitsList from "./components/HabitsList";
import HeatMap from "./components/HeatMap";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { getCurrentDateISO, validateHabit } from "./utils";
import { MAX_COUNT, MAX_COUNT_ERROR, DUPLICATE_ERROR_MESSAGE, defaultHabitList } from "./constants";
import "./style.css";

function App() {
  //TODO - all logic can be moved to a separate hook
  const [habit, setHabit] = useState({
    title: "",
    habitStartDate: getCurrentDateISO(),
    completed: false,
    id: "",
  });
  const [habitsList, setHabitsList] = useLocalStorage(
    "habit-list",
    defaultHabitList
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState({
    habitToEditDate: "",
    habitToEditID: "",
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isModalVisible);
  }, [isModalVisible]);

  const handleInputChange = (e, inputType) => {
    let value = e?.target?.value || "";
    setHabit((previousValue) => {
      return {
        ...previousValue,
        [inputType === "textbox" ? "title" : "habitStartDate"]: value,
      };
    });
  };
  const handleSubmit = useCallback(() => {
    const validationError = validateHabit(habit);
    if (validationError) {
      toast.error(validationError, { id: "validationError" });
      return;
    }
    let updatedHabitsList = [...habitsList];
    if (isEditMode) {
      updatedHabitsList.forEach((curentHabit) => {
        const date = habitToEdit.habitToEditDate;
        if (curentHabit[date]) {
          curentHabit[date] = curentHabit[date].map((item) => {
            if (item.id === habitToEdit.habitToEditID) {
              return { ...item, title: habit.title };
            } else return item;
          });
        }
      });
      toast.success("Task edited successfully");
      setHabitsList(updatedHabitsList);
      setIsEditMode(false);
      setModalVisibility(false);
      handleReset();
      return;
    }
    const currentDate = habit?.habitStartDate;
    const habitIndex = updatedHabitsList.findIndex((item) => item[currentDate]);
    if (habitIndex > -1) {
      const existingHabitIndex = updatedHabitsList[habitIndex][
        currentDate
      ].findIndex((item) => item.title === habit.title);
      if (existingHabitIndex > -1) {
        toast.error(DUPLICATE_ERROR_MESSAGE, {
          id: "duplicateHabitError",
        });
        return;
      }

      if (updatedHabitsList[habitIndex][currentDate].length === MAX_COUNT) {
        toast.error(MAX_COUNT_ERROR, { id: "maxCountError" });
        return;
      }
      updatedHabitsList[habitIndex][currentDate].push({
        ...habit,
        id: new Date().getTime(),
      });
    } else {
      updatedHabitsList.push({
        [currentDate]: [{ ...habit, id: new Date().getTime() }],
      });
    }
    setHabitsList(updatedHabitsList);
    toast.success("Successfully created!");
    handleReset();
    setModalVisibility(false);
  }, [habit, habitsList, isEditMode, habitToEdit, setHabitsList]);

  const handleEdit = useCallback(
    (habitToEditID, habitToEditDate) => {
      setIsEditMode(true);
      setModalVisibility(true);
      let habitToEditList = habitsList.find((item) => item[habitToEditDate]);
      let habitToEdit = habitToEditList[habitToEditDate].find(
        (item) => item.id === habitToEditID
      );
      setHabitToEdit({
        habitToEditDate,
        habitToEditID,
      });
      setHabit({
        title: habitToEdit?.title,
        completed: habitToEdit?.completed,
        id: habitToEdit?.id,
        habitStartDate: habitToEditDate,
      });
    },
    [habitsList]
  );
  const handleDelete = useCallback(
    (id, currentHabitDate) => {
      const updatedHabitsList = habitsList.map((item) => {
        if (item[currentHabitDate]) {
          return {
            [currentHabitDate]: item[currentHabitDate].filter(
              (item) => item.id !== id
            ),
          };
        }
        return item;
      });
      setHabitsList(updatedHabitsList);
      toast.success("Task deleted", {
        id: "deletedTaskErrorMessage",
        duration: 2000,
      });
    },
    [habitsList, setHabitsList]
  );

  const handleFinishTask = useCallback(
    (id, currentHabitDate) => {
      let updatedHabitsList = habitsList.map((item) => {
        if (item[currentHabitDate]) {
          item[Object.keys(item)[0]].forEach((item) => {
            if (item.id === id) {
              item.completed = !item.completed;
            }
          });
        }
        return item;
      });
      setHabitsList(updatedHabitsList);
    },
    [habitsList, setHabitsList]
  );

  const handleReset = () => {
    setHabit({
      title: "",
      habitStartDate: getCurrentDateISO(),
    });
  };

  const toggleModalVisibility = () => {
    setModalVisibility(!isModalVisible);
  };

  return (
    <>
      <Navbar title="Habit Tracker" />
      <div className="container">
        <div className="add-new-habit">
          <button
            className={`add-new-habit-button ${
              isModalVisible ? "rotate" : " "
            }`}
            onClick={toggleModalVisibility}
          >
            +
          </button>
          <Modal onClose={toggleModalVisibility} isVisible={isModalVisible}>
            <TextInput
              habit={habit}
              isEditMode={isEditMode}
              setHabit={setHabit}
              handleChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
              placeholder="Read a book daily."
            />
          </Modal>
        </div>
        <div className="habit-wrapper">
          <HabitsList
            habitsList={habitsList}
            onEdit={handleEdit}
            onFinish={handleFinishTask}
            onDelete={handleDelete}
          />
          <HeatMap habitsList={habitsList} />
        </div>
      </div>
    </>
  );
}

export default App;
