"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arraySwap,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";

import { GripVertical } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils";

export function SortableLayout({
  items,
  renderItem,
  editMode,
  getLatestList,
  className,
}: {
  items: Array<any>;
  getLatestList?: any;
  renderItem: (item: any) => JSX.Element;
  editMode: boolean;
  className?: string;
}) {
  return (
    <div className={cn("gap-4 grid grid-cols-3 w-full", className)}>
      <Sortable
        initalItems={items}
        getLatestList={getLatestList}
        handle
        editable={editMode}
        renderItem={renderItem}
      />
    </div>
  );
}

export function Sortable({
  initalItems,
  getLatestList,
  editable,
  handle,
  renderItem,
}: {
  initalItems: Array<any>;
  getLatestList?: any;
  editable: boolean;
  handle?: boolean;
  renderItem: (item: any) => JSX.Element;
}) {
  const [listItems, setItems] = useState(initalItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={listItems} strategy={rectSwappingStrategy}>
        {listItems.map((item: any) => (
          <SortableItem
            key={item.id}
            id={item.order}
            handle={handle}
            editable={editable}
            className={item.className}
          >
            {renderItem(item)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items: any) => {
        const oldIndex = items.findIndex(
          (item: any) => item.order == active.id
        );
        const newIndex = items.findIndex((item: any) => item.order == over.id);
        let newArray = arraySwap(items, oldIndex, newIndex);
        if (getLatestList) getLatestList(newArray);
        return newArray;
      });
    }
  }
}

export function SortableItem({
  id,
  children,
  handle,
  editable = true,
  className,
}: {
  id: number;
  children: JSX.Element | string;
  handle?: boolean;
  editable: boolean;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(handle ? {} : listeners)}
      tabIndex={handle ? -1 : undefined}
      className={cn(
        `relative ${editable ? "select-none cursor-default" : "select-all cursor-default"}`,
        className
      )}
    >
      {children}
      {handle && editable ? (
        <Button
          {...(handle ? listeners : {})}
          variant={"secondary"}
          className="w-4 px-0 absolute top-4 right-4 cursor-grab"
        >
          <GripVertical className="w-4 text-muted-foreground" />
        </Button>
      ) : null}
    </div>
  );
}
