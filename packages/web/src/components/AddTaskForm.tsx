import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "../constants";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

const AddTaskForm = ({ fetchTasks }: { fetchTasks: () => Promise<void> }) => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    try {
      //   await axios.post(API_URL, {
      //     name: newTask,
      //     completed: false,
      //   });

      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          name: newTask,
          completed: false,
        }),
      });

      await fetchTasks();

      setNewTask("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper className="addTaskForm">
      <TextField
        size="small"
        label="Task"
        variant="outlined"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button
        disabled={!newTask.length}
        variant="outlined"
        onClick={addNewTask}
      >
        <AddIcon />
      </Button>
    </Wrapper>
  );
};

export default AddTaskForm;
