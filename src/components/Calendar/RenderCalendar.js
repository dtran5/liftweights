import React from "react";

import Calendar from "./Calendar";

const RenderCalendar = (props) => {
  //show the calendar that is created by the trainer matched by email
  return (
    <>
      <Calendar items={props} />
    </>
  );
};

export default RenderCalendar;
