import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../redux/actions/events";

export const DeleteEventfab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventStartDelete());
  };
  return (
    <button onClick={handleDelete} className="fab-delete">
      <i className="fas fa-trash"></i>
    </button>
  );
};
