const TaskForm = ({
  createTaskHandler,
  name,
  inputHandler,
  editingTask,
  updateTaskHandler,
}) => {
  return (
    <form
      className="task-form"
      onSubmit={editingTask ? updateTaskHandler : createTaskHandler}>
      <input
        type="text"
        placeholder="Add a task"
        name="name"
        value={name}
        onChange={inputHandler}
      />
      <button type="submit">{editingTask ? "Edit" : "Add"}</button>
    </form>
  );
};

export default TaskForm;
