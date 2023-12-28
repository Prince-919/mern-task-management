import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Task = ({
  index,
  task,
  deleteTaskshandler,
  getSingleTask,
  setToComplete,
}) => {
  return (
    <div className={task?.complated ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task?.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble
          color={task?.complated ? "#16db65" : "#e5383b"}
          onClick={() => setToComplete(task)}
        />
        <FaEdit
          color="#6e44ff"
          onClick={() => {
            getSingleTask(task);
          }}
        />
        <FaRegTrashAlt
          color="#e5383b"
          onClick={() => {
            deleteTaskshandler(task._id);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
