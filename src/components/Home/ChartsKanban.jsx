import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Card } from "react-bootstrap";

import MostSellingCategories from "./MostSellingChart";
import Customerschart from "./Customerschart";
import Saleschart from "./Saleschart";
// Initial Data: representing three columns (e.g., To Do, In Progress, Done)
const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasks: [
        { id: "task-1", content: "Most Selling Categories" },
        { id: "task-2", content: "Customer Growth" },
        { id: "task-3", content: "Monthly Sales Data" },
      ],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      tasks: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      tasks: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside the board
    if (!destination) {
      return;
    }

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    // Remove task from the start column
    const newStartTasks = Array.from(startColumn.tasks);
    newStartTasks.splice(source.index, 1);

    // Add task to the end column
    const newEndTasks = Array.from(endColumn.tasks);
    newEndTasks.splice(destination.index, 0, { id: draggableId, content: draggableId });

    // Update columns with new tasks
    const newColumns = {
      ...data.columns,
      [startColumn.id]: { ...startColumn, tasks: newStartTasks },
      [endColumn.id]: { ...endColumn, tasks: newEndTasks },
    };

    // Set new data state
    setData({
      ...data,
      columns: newColumns,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row className="mb-3 d-flex justify-content-between">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          return (
            <Col xs={12} sm={6} lg={4} key={column.id}>
              <div className="shadow-sm border-0 custom-chart">
                <Droppable droppableId={column.id} direction="vertical">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        padding: "10px",
                        minHeight: "300px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                      }}
                    >
                      <h4>{column.title}</h4>
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                marginBottom: "10px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <Card.Body>
                                <Card.Title>{task.content}</Card.Title>
                                {task.content === "Most Selling Categories" && <MostSellingCategories />}  
                                {task.content === "Customer Growth" && <Customerschart/>}
                                {task.content === "Monthly Sales Data" && <Saleschart />}
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </Col>
          );
        })}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;
