import React, {useState} from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
  const saving = () => {
    console.log(student)
    console.log(interviewer)
    props.onSave(student, interviewer)
  }

  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={e => setStudent(e.target.value)}
      />
    </form>
    <InterviewerList
      interviewers={props.interviewers}
      value={interviewer} 
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={saving}>Save</Button>
    </section>
  </section>
</main>
  )
}