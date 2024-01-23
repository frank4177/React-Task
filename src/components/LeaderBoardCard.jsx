import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ArrowUpIcon } from "../assets/Icons";

const LeaderBoardCard = ({ id, data, index, moveCard,}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move",
        padding: "16px",
        marginBottom: "8px",
      }}
      className="flex flex-row justify-between items-center mt-4 border-[1px] border-gray-600 px-3 py-3 rounded-[10px]"
    >
      <div className="flex flex-row gap-5 max-w-[500px] w-full items-center">
        <div className="w-3 text-gray-500">
          {data.id}
        </div>

        <div className="flex flex-row items-center max-w-[500px] w-full gap-3">
          
          {data.photo ? <img
            src={data.photo}
            alt="photo"
            className="w-[150px] h-[50px] object-fill rounded-[7px] "
           
          /> : null}
         
          
          <div className="text-white  text-start">{data.title}</div>
        </div>
      </div>

      {/* Author */}
      <div className="flex flex-row gap-4 max-w-[200px] w-full">
        <img
          src={data.photo}
          alt="photo"
          className="w-[30px] h-[30px] rounded-full object-fill "
        />
        <span className="text-lime-500">{data.username}</span>
      </div>

      {/* Most Liked */}
      <div className="max-w-[200px]  flex flex-row w-full justify-end space-x-1">
        <span className="text-white">{data.like}</span>
        <img src={ArrowUpIcon} alt="" />
      </div>
    </div>
  );
};

export default LeaderBoardCard;
