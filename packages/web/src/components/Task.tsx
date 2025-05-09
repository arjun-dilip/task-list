import { Box, Button, Card, Checkbox, styled, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import UpdateTaskForm from "./UpdateTaskForm";
// import axios from "axios";
import { API_URL } from "../constants";
import type { TaskProps } from "../App";

const TaskCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  gap: "10px",
  width: "300px",
});

const TaskCardContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "10px",
});

// const StyledTaskText = styled(Typography)({
//   maxWidth: "100px",
// });

const TaskButtons = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Task = ({
  task,
  fetchTasks,
}: {
  task: TaskProps;
  fetchTasks: () => Promise<void>;
}) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      //   await axios.put(API_URL, {
      //     id,
      //     name,
      //     completed: !isComplete,
      //   });

      await fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify({
          id,
          name,
          completed: !isComplete,
        }),
      });

      setIsComplete((prev: boolean) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      //   await axios.delete(`${API_URL}/${task.id}`);

      await fetch(`${API_URL}/${task.id}`, {
        method: "DELETE",
      });

      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskCard className="task">
      {/* <div
        className={classnames("flex", {
          done: isComplete,
        })}
      > */}
      <TaskCardContent>
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h5">{name}</Typography>
      </TaskCardContent>
      <TaskButtons>
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </TaskButtons>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </TaskCard>
  );
};

export default Task;
