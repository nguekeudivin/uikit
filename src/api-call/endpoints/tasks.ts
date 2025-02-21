import { IdType } from "@/types/shared";
import { v4 as uuidv4 } from "uuid";

export const fetchTasks = () => {
  const inputs = [
    "Prepare Monthly Financial Report",
    "Design New Marketing Campaign",
    "Analyze Customer Feedback",
    "Update Website Content",
    "Conduct Market Research",
  ];

  return Promise.resolve(
    inputs.map((item, index: number) => ({
      id: index + 1,
      title: item,
      completed: false,
    }))
  );
};

export const storeTask = (task: Task) => {
  return Promise.resolve({
    id: uuidv4(),
    title: task.title,
    completed: false,
  });
};

export const updateTask = (id: IdType, task: Task) => {
  return Promise.resolve(task);
};

export const destroyTask = (task: Task) => {
  return Promise.resolve(task.id);
};
