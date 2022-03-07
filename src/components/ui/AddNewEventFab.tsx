import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";
import { eventClearActiveEvent } from '../../redux/actions/events';

export const AddNewEventFab = () => {
  const dispatch = useDispatch();

    const handleClickNew = () => {
      dispatch(eventClearActiveEvent())
        dispatch( uiOpenModal() );
    }
  return (
    <button onClick={handleClickNew} className="fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
