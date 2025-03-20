import { Plus } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";

// src/types.ts
export interface Item {
  id: string;
  title: string;
  description?: string;
  status: string; // "todo" | "in-progress" | "done";
}

export interface Column {
  id: string;
  title: string;
  items: any[];
}

interface KanbanBoardProps {
  columns: Column[];
  setColumns: (newColumns: Column[]) => void | Dispatch<SetStateAction<any>>;
  addItem?: () => void;
  onMoveItem?: (item: any, from: Column, to: Column) => void;
}

export const KanbanBoard: FC<KanbanBoardProps> = ({
  columns,
  addItem,
  setColumns,
  onMoveItem = () => {},
}) => {
  const onDragStart = (event: React.DragEvent, itemId: string) => {
    event.dataTransfer.setData("itemId", itemId);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent, status: Column["id"]) => {
    const itemId = event.dataTransfer.getData("itemId");

    const updatedColumns = columns.map((column) => ({
      ...column,
      items: column.items.filter((item: any) => item.id !== itemId),
    }));

    const item = columns
      .flatMap((column) => column.items)
      .find((item) => item.id === itemId);

    // previous column
    const prevColumn = updatedColumns.find((e) => e.id == item.colId) as Column;

    if (item) {
      const targetColumn = updatedColumns.find((col) => col.id === status);
      if (targetColumn) {
        targetColumn.items.push({ ...item, colId: targetColumn.id, status });
        setColumns(updatedColumns);
        onMoveItem(item, prevColumn, targetColumn);
      }
    }
  };

  const [height, setHeight] = useState<number>(800);

  useEffect(() => {
    if (document != undefined) {
      const topbar = document.getElementById("topbar");
      const kanban = document.getElementById("kanban");
      if (kanban) {
        kanban.style.width = `${columns.length * 400}px`;
      }

      if (topbar) {
        setHeight(window.innerHeight - topbar.offsetHeight - 70);
      }
    }
  }, [columns.length]);

  return (
    <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200">
      <div id="kanban" className="flex w-full gap-4 pb-6">
        {columns.map((column) => (
          <div
            key={column.id}
            style={{ height: `${height}px` }}
            className={clsx(
              "w-[400px] flex-1 bg-gray-200 p-4 rounded-xl overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200"
            )}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex gap-2 items-center">
                <span>{column.title}</span>
                <span className="text-sm inline-flex items-center justify-center w-5 h-5 rounded-full bg-white">
                  {column.items.length}
                </span>
              </h2>
              {addItem != undefined && (
                <button onClick={addItem}>
                  <Plus />
                </button>
              )}
            </div>

            {column.items.map((item: any, index) => (
              <div
                key={`item${index}${column.title}`}
                draggable
                onDragStart={(e) => onDragStart(e, item.id)}
                className="cursor-move"
              >
                {item.component}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
