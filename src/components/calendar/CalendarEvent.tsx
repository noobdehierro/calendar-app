import React from "react";
import { EventProps } from "react-big-calendar";
import { Evento } from "../../helpers/events";

export const CalendarEvent = ({
  event,
}: React.PropsWithChildren<EventProps<Evento>>) => {
  const { title, user } = event;
  return (
    <div>
      <strong> {title} </strong>
      <span>- {user!.name} </span>
    </div>
  );
};
