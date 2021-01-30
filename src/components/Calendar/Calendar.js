import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    addMonths, 
    subMonths, 
    format,
    startOfWeek,
    startOfMonth, 
    endOfWeek,
    endOfMonth,
    addDays,
    isSameDay,
    isSameMonth,
    toDate
 } from "date-fns"
import "./Calendar.css"

const Calendar = (props) => {
    
    
    //Tells Calendar current date so it can render proper month
    const [currentDate, setCurrentDate] = useState(new Date())
    //Tells Calendar which date is selected by user to provide styling
    const [selectedDate, setSelectedDate] = useState(new Date())

    const nextMonth = () => {
        //takes current date, adds 1 month. date is stored as default in our hook currentDate
        setCurrentDate(addMonths(currentDate, 1));
     }
     //takes current date, subtracts 1 month. date is stored as default in our hook currentDate
     const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
     }

    const header = () => {
        const dateFormat = "MMMM yyyy"

        return (
            <div className="header row flex-middle">
                <div className="column col-start">
                    <div className="icon" onClick={prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="column col-center">
                    <span>{format(currentDate, dateFormat)}</span>
                </div>
                <div className="column col-end">
                    <div className="icon" onClick={nextMonth}>
                        chevron_right
                    </div>
                </div>
            </div>
        )
    }

    const daysOfWeek = () => {
        //formats our days of the week
        const dateFormat = "E";
        //empty array to push our days into
        const days = [];

        //startOfWeek from date-fns gives us current week start date
        let startDate = startOfWeek(currentDate);
        //Looping through our empty array 7 times, push our names of days
        //addDays starts at our current date, incrementing by i (1), adding our days
        //format by dateFormat (E) is our name of each day
        for (let i = 0; i < 7; i++) {
              days.push(
                 <div className="column col-center" key={i}>
                
                 {format(addDays(startDate, i), dateFormat)}
                 </div>
              );
           }
           return <div className="days row">{days}</div>;
        };

    const cells = () => {

        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);

        //gets value of current month start date
        const startDate = startOfWeek(monthStart);
        

        //gets value of current month end date
        //used to end our while loop
        const endDate = endOfWeek(monthEnd);

        //renders correct date in each cell, formatted
        const dateFormat = "d";
        //formats and renders each date as a unique URL param
        const linkFormatting = "MM-dd-yyyy"
        //used to render all weeks of a given month
        //this is the one actually rendered when function runs
        const rows = [];

        //used to render each calendat week
        //at end of each week, this array is pushed into rows array and emptied for the next week
        let days = [];
        //points to start date of given month
        let day = startDate;
        let formattedDate = "";

        //provides our unique URL param
        //empty string gets filled during while loop
        let linkId = "";
        
        
        
        

        //this loop continues as long as day is less than/equal to enddate
        //gurantees loop runs entire month and stops at the end
        while (day <= endDate) {
            //7 iteration loop covers full week
            for (let i = 0; i < 7; i++) {
                //takes each day and formats it
                formattedDate = format(day, dateFormat)
                //clones day which is = to startdate = to start of given month
                const cloneDay = day;


                //LinkId is provided and formatted
                linkId = format(day, linkFormatting)
                
                //at end of 7 iterations, days array gets pushed into rows array as a 
                //SINGLE div.
                //array is then cleared and the next week begins 
                //once the loops condition is met, we return the full rows array as a single div
                //the rows array is ultimately the one rendered
                days.push(
                    <Link
                        to={`/dailyworkout/${linkId}`}
                        //ternary operator for our class name
                        //if our days not in same month, add disable class
                        className={`column cell ${!isSameMonth(day, monthStart)
                            ? "disabled" : isSameDay(day, selectedDate)
                            //if the date is the same as today's date, add selected class
                            ? "selected": ""}`}
                        key={day}
                        onClick = {() => onDateClick(toDate(cloneDay))}
                        
                    >
                        <div
                                
                        >
                            <span className="number">{formattedDate}</span>
                            <span className="bg">{formattedDate}</span>
                            
                        </div>
                    </Link>
                );
                day = addDays(day, 1)
            }

            rows.push(
                <div className="row" key={day}>{days}</div>
            );
            days = []
        }
        return (
            <div className="body">{rows}</div>
        )
    }

    const onDateClick = day => {
        setSelectedDate(day)
        }

    return (
        <div className="calendar">
            <div>{header()}</div>
            <div>{daysOfWeek()}</div>
            <div>{cells()}</div>
        </div>
    )
}

export default Calendar