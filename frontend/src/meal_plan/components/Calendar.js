import React, {useState} from "react";
import dateFns from "date-fns";
import "./Calendar.css";

const Calendar = props => {
  const[currentMonth, setCurrentMonth] = useState(new Date());
  const[currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <div>Header</div>
      <p>{currentDate.getDate()}</p>
      <p>{currentMonth.getMonth()}</p>
      <div>Days</div>
      <div>Cells</div>
    </div>
  );
};

export default Calendar;
