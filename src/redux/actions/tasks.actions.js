  
export const getTasks = (tasks) => {
  console.log(tasks);
  return {
    type: "GETTASKS",
    payload: tasks,
  };
};
export const addTask = (task) => {
  return {
    type: "ADDTASK",
    payload: task,
  };
};
export const updateStatus = (task) => {
  return {
    type: "UPDATESTATUS",
    payload: task,
  };
};
export const editTask = (payload) => {
  return {
    type: "EDITTASK",
    payload,
  };
};
export const deleteTask = (id) => {
  return {
    type: "DELETETASK",
    payload: id,
  };
};
