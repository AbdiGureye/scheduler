import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETING = "DELETING";
const SAVING = "SAVING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const removing = function() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
  }
  const save = function(name, interviewer) {
    const int = {
      student: name,
      interviewer: interviewer
    };
    console.log('INT', int)
    transition(SAVING);
    props.bookInterview(props.id, int)
    .then(() => transition(SHOW))
  }

  const edit = function() {
    transition(EDIT);
  }
  const confirm = function() {
    transition(CONFIRM);
  }
    return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onDelete={() => confirm()}
      onEdit={edit}
      />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={() => removing()} />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

    </article>
  )}