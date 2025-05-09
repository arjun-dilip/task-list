import { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
// import axios from "axios";
import { API_URL } from "../constants";
import type { TaskProps } from "../App";

const UpdateTaskForm = ({
  fetchTasks,
  isDialogOpen,
  setIsDialogOpen,
  task,
}: {
  fetchTasks: () => Promise<void>;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  task: TaskProps;
}) => {
  const { id, completed } = task;
  const [taskName, setTaskName] = useState("");

  const handleUpdateTaskName = async () => {
    try {
      //   await axios.put(API_URL, {
      //     id,
      //     name: taskName,
      //     completed,
      //   });

      await fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify({
          id,
          name: taskName,
          completed,
        }),
      });

      await fetchTasks();

      setTaskName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Task</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Task"
          variant="outlined"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateTaskName();
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};

export default UpdateTaskForm;
