import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Edit2, EllipsisVertical, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import {
  destroyTask,
  fetchTasks,
  storeTask,
  updateTask,
} from "@/api-call/endpoints/tasks";

export default function AnalyticsTasks() {
  const [items, setItems] = useState<Task[]>([]);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const form = useSimpleForm({
    defaultValues: {
      id: "",
      title: "",
    },
    schema: z.object({
      title: z.string().min(1, "Title is required"),
    }),
  });

  useEffect(() => {
    fetchTasks().then((items) => setItems(items));
  }, []);

  const updateItem = (item: Task, updates: Partial<Task>) => {
    setItems((prev: Task[]) =>
      prev.map((el) => {
        if (el.id == item.id) {
          return { ...el, ...updates };
        } else return el;
      })
    );
  };

  const deleteItem = (item: Task) => {
    destroyTask(item)
      .then(() => {
        setItems((prev) => prev.filter((el) => item.id != el.id));
      })
      .catch(() => {});
  };

  const submit = () => {
    if (form.values.id == "") {
      // create mode
      form
        .validate()
        .then((data) => {
          // write the code to add task here.
          storeTask(data)
            .then((created) => {
              setItems((prev) => [...prev, created]);
              setOpenForm(false);
            })
            .catch(() => {});
        })
        .catch(() => {});
    } else {
      //edit mode.
      form
        .validate()
        .then((data) => {
          // write the code
          // write the code to add task here.
          updateTask(form.values.id, data)
            .then((updated) => {
              setItems((prev) =>
                prev.map((el) => {
                  if (el.id == form.values.id) {
                    return {
                      ...el,
                      ...updated,
                    };
                  } else return el;
                })
              );
              setOpenForm(false);
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          label="Analytics Tasks"
          action={
            <>
              <Dialog
                open={openForm}
                onOpenChange={(value) => {
                  if (value == false) form.resetValues();
                  setOpenForm(value);
                }}
              >
                <DialogTrigger className="inline-flex items-center border-gray-300 border-2 px-4 py-2 rounded-md text-gray-700 gap-1">
                  <Plus className="w-5 h-5" />
                  <span> Add task</span>
                </DialogTrigger>
                <DialogContent className="min-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                  </DialogHeader>
                  {form.renderErrors()}
                  <div className="grid gap-4 space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={form.values.title}
                        onChange={form.handleChange}
                        placeholder="Title"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={submit}> Save </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          }
        />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {items.map((item, index: number) => (
          <div
            key={`analyticstasks${index}`}
            className="flex items-center justify-between border-b border-dashed py-4"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={item.completed}
                onCheckedChange={(value: boolean) => {
                  updateItem(item, { completed: value });
                }}
              />
              <p
                className={clsx("text-gray-800", {
                  "line-through": item.completed,
                })}
              >
                {item.title}
              </p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="w-4 h-4 text-gray-800" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      updateItem(item, { completed: true });
                    }}
                  >
                    <CheckIcon />
                    <span>Mark completed</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      console.log(item.id);
                      form.setValue("id", item.id);
                      form.setValue("title", item.title);
                      setTimeout(() => {
                        setOpenForm(true);
                      }, 100);
                    }}
                  >
                    <Edit2 />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      deleteItem(item);
                    }}
                    className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100"
                  >
                    <Trash className="text-red-500" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
