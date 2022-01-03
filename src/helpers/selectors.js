export function getAppointmentsForDay(state, day) {
  const filter = state.days.filter(currentDay => currentDay.name === day)
  if(filter.length === 0) {
    return [];
  }
  const apptArray = filter[0].appointments.map((appointment) => {
    return state.appointments[appointment];
  })
  return apptArray;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null
  }
   const interviewForDay = {...interview, interviewer: {...state.interviewers[interview.interviewer]}}

   return interviewForDay
}

export function getInterviewers(state, day) {

  const find = state.days.find((currentDay) => currentDay.name === day)
  
  if(state.days.length === 0) {
    return [];
  }
  if(find === undefined){
    return [];
  }
  const intervrs = find.interviewers.map((intId) => {
    return state.interviewers[intId];
  })
  return intervrs;

}