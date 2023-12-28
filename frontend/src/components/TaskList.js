import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";

const REACT_APP_BACKEND_URI = "http://localhost:8000";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [complatedTasks, setComplatedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    complated: false,
  });
  const { name } = formData;
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${REACT_APP_BACKEND_URI}/api/tasks`);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  const createTaskHandler = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field connot be empty.");
    }
    try {
      await axios.post(`${REACT_APP_BACKEND_URI}/api/tasks`, formData);
      toast.success("Task created successfully.");
      getTasks();
      setFormData({ ...formData, name: "" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   delete a tasks
  const deleteTaskshandler = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URI}/api/tasks/${id}`);
      toast.success("Task deleted successfully.");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // completed tasks filter
  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.complated === true;
    });
    setComplatedTasks(cTask);
  }, [tasks]);

  //   get single task
  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      complated: false,
    });
    setTaskId(task._id);
    setEditingTask(true);
  };

  // update task
  const updateTaskHandler = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field connot be empty.");
    }
    try {
      await axios.patch(
        `${REACT_APP_BACKEND_URI}/api/tasks/${taskId}`,
        formData
      );
      setFormData({ ...formData, name: "" });
      setEditingTask(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      complated: true,
    };
    try {
      await axios.patch(
        `${REACT_APP_BACKEND_URI}/api/tasks/${task._id}`,
        newFormData
      );
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        inputHandler={inputHandler}
        createTaskHandler={createTaskHandler}
        editingTask={editingTask}
        updateTaskHandler={updateTaskHandler}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total tasks: </b>
            {tasks.length}
          </p>
          <p>
            <b>Complated tasks: </b> {complatedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {loading && (
        <div className="--flex-center">
          <ClockLoader color="royalblue" />
        </div>
      )}
      {!loading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks?.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTaskshandler={deleteTaskshandler}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
      <Task />
    </div>
  );
};

export default TaskList;
