import React, {useState} from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
  const saving = () => {
    if(interviewer === null){
      setError("Interviewer must be chosen")
      return;
    }
    if(student === "") {
      setError("Please enter a student name");
      return;
    }
    setError("")
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
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={saving}>Save</Button>
    </section>
  </section>
</main>
  )
}