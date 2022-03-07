import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducer/rootReducer";
import DateTimePicker from "react-datetime-picker";
import { uiCloseModal } from "../../redux/actions/ui";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../redux/actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours"); // 3:00:00
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state: State) => state.ui);
  const { activeEvent } = useSelector((state: State) => state.calendar);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState<any>(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
    setDateStart(now.toDate());
    setDateEnd(nowPlus1.toDate());
  };

  const handleStartDateChange = (e: Date) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e: Date) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd, "hour")) {
      return console.log(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      className="modal"
    >
      <h1>Nuevo Evento</h1>
      <hr />
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <div className="form-group">
          <label htmlFor="start">Start date and time</label>
          <DateTimePicker
            onChange={(e) => handleStartDateChange(e)}
            value={dateStart}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End date and time</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Event Title"
            onChange={(e) => handleInputChange(e)}
          />
          {!titleValid && <span> title is requiered</span>}
          <small>a short description</small>
        </div>
        <div className="form-group">
          <label htmlFor="title">Note</label>
          <textarea
            name="notes"
            id="notes"
            rows={5}
            value={notes}
            onChange={(e) => handleInputChange(e)}
            placeholder="Note..."
          />
          <small>Aditional information</small>
        </div>
        <button type="submit">
          <i className="far fa-save"></i>
          Save
        </button>
        <button onClick={closeModal}>cancel</button>
      </form>
    </Modal>
  );
};
