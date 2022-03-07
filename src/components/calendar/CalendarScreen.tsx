import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import { Evento } from "../../helpers/events";
import { Navbar } from "../ui/Navbar";
import moment from "moment";
import { AddNewEventFab } from "../ui/AddNewEventFab";
import { DeleteEventfab } from "../ui/DeleteEventfab";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";
import {
  eventSetActive,
  eventStartLoading,
  eventClearActiveEvent,
} from "../../redux/actions/events";
import { useEffect } from "react";
import { State } from "../../redux/reducer/rootReducer";
import { CalendarEvent } from "./CalendarEvent";

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  //   const [lastView, setLastView] = useState(
  //     localStorage.getItem("lastView") || "month"
  //   );
  // console.log(lastView)

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state: State) => state.calendar);
  const { uid } = useSelector((state: State) => state.auth);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const eventStyleGetter = (e: Evento) => {
    const style = {
      backgroundColor: uid === e.user!._id ? "#04aa6d" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "black",
      fontWeight: "bold",
      
    };

    return {
      style,
    };
  };

  const onDobleClick = (e: Evento) => {
    dispatch(uiOpenModal());
  };

  const onSelect = (e: Evento) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e: string) => {
    localStorage.setItem("lastView", e);
  };
  const onSelectSlot = (e: SlotInfo) => {
    dispatch(eventClearActiveEvent());
  };
  return (
    <div>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={(e) => onDobleClick(e)}
        onSelectEvent={(e) => onSelect(e)}
        onView={(e) => onViewChange(e)}
        onSelectSlot={(e) => onSelectSlot(e)}
        selectable
        components={{event: (e)=>CalendarEvent(e)}}
        style={{ height: "90vh" }}
        // view={`${lastView}` || 'month'}
      />
      <AddNewEventFab />

      {activeEvent && activeEvent.user?._id === uid && <DeleteEventfab />}
      <CalendarModal />
    </div>
  );
};
