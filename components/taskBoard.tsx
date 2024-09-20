"use client";
import { useTaskStore, TaskState } from "@/lib/stores/task";
import TaskColumn from "./taskColumn";

export default function TaskBoard() {
  const { todoTasks, ongoingTasks, completedTasks, updateTask } = useTaskStore(
    (state) => ({
      todoTasks: state.todoTasks(),
      ongoingTasks: state.ongoingTasks(),
      completedTasks: state.completedTasks(),
      updateTask: state.updateTask,
    })
  );

  function handleOnDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleOnDrag(e: React.DragEvent, taskId: string) {
    e.dataTransfer.setData("taskId", taskId);
  }

  function handleOnDrop(e: React.DragEvent, targetState: TaskState) {
    const taskId = e.dataTransfer.getData("taskId");
    const allTasks = [...todoTasks, ...ongoingTasks, ...completedTasks];
    const task = allTasks.find((task) => task.id === taskId);

    if (task && task.state !== targetState) {
      const updatedFields = {
        state: targetState,
        updatedAt: Date.now().toString(),
      };
      updateTask(task.id, updatedFields);
    }
  }

  return (
    <div className="flex flex-col text-white">
      <div className="flex-grow w-full grid grid-cols-3 mx-auto text-white">
        <TaskColumn
          title="TODO"
          tasks={todoTasks}
          targetState={TaskState.TODO}
          onDrop={(e) => handleOnDrop(e, TaskState.TODO)}
          onDragOver={handleOnDragOver}
          onDragStart={handleOnDrag}
          titleColor="red"
        />
        <TaskColumn
          title="IN PROGRESS"
          tasks={ongoingTasks}
          targetState={TaskState.INPROGRESS}
          onDrop={(e) => handleOnDrop(e, TaskState.INPROGRESS)}
          onDragOver={handleOnDragOver}
          onDragStart={handleOnDrag}
          titleColor="yellow"
        />
        <TaskColumn
          title="DONE"
          tasks={completedTasks}
          targetState={TaskState.DONE}
          onDrop={(e) => handleOnDrop(e, TaskState.DONE)}
          onDragOver={handleOnDragOver}
          onDragStart={handleOnDrag}
          titleColor="green"
        />
      </div>
    </div>
  );
}
