import { useState, useEffect } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AddTaskForm from "./components/AddTaskForm";
import Task from "./components/Task";
// import axios from "axios";
import { API_URL } from "./constants";
import { Box, Typography } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export type TaskProps = { id: string; name: string; completed: boolean };

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
});

export default function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([
    { id: "1", name: "Clean the house", completed: false },
    { id: "2", name: "Buy milk", completed: false },
    { id: "3", name: "Fix creaking door", completed: true },
    { id: "4", name: "Take the car to mechanic", completed: false },
  ]);

  const fetchTasks = async () => {
    try {
      // const { data } = await axios.get(API_URL);

      const response = await fetch(API_URL, {
        method: "GET",
      });

      const data = await response.json();

      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Typography
          align="center"
          variant="h2"
          paddingTop={2}
          paddingBottom={2}
        >
          My Task List
        </Typography>
        <AddTaskForm fetchTasks={fetchTasks} />
        {tasks.map((task) => (
          <Task task={task} key={task.id} fetchTasks={fetchTasks} />
        ))}
      </Container>
    </ThemeProvider>
  );
}
