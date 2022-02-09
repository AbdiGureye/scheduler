import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewers } from "helpers/selectors";





export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
    },[])

    const setDay = (day) => setState(prev => ({ ...prev, day }));
    const interviewers = getInterviewers(state, state.day)

    const updateSpots = function (state, appointments, id) {
    
      const day = state.days.find(day => state.day === day.name)
      let spots = day.spots
      
    
      const oldInterview = state.appointments[id].interview
      const newInterview = appointments[id].interview
    
      if(newInterview && !oldInterview) {
        spots--;
      }
    
      if(oldInterview && !newInterview) {
        spots++;
      }
    
    
    const updatedDays = state.days.map(d => {
    return d.name === day.name? {...d,spots } :d 
    });
    
    return updatedDays
    };

    function cancelInterview(id) {

      const deletedInterview = {
       ...state.appointments[id],
       interview: null
     }
     const appointments = {
       ...state.appointments,
       [id]: deletedInterview
     };
     
   
     return axios.delete(`/api/appointments/${id}`)
     .then(() => {
       setState({
         ...state,
          id, 
          appointments,
          days: updateSpots(state, appointments, id)
         })
       
     })
   }

   function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    
    return axios.put(`/api/appointments/${id}`,  {interview} )
    .then(() => {
      const days =updateSpots(state, appointments, id)
      setState((state)=> { 
        return {...state, appointments, days }
      })
    })
  }

    const dailyAppointments = getAppointmentsForDay(state, state.day)
    const schedule = dailyAppointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
    
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          cancelInterview={cancelInterview}
          bookInterview={bookInterview}
        />
      );
    }); 

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>      </section>
      <section className="schedule">
        {schedule}
        <Appointment key={'last'} time={'5pm'} />
      </section>
    </main>
  );
}
