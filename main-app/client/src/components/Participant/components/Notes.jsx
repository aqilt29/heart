import React from "react";
import { DynamicFormContainer } from "components/DynamicForm";
import NotesQA from "./Notes.data";
import getNotes from "api/getNotes.api";
import addNotes from "api/addNotes.api";
import "./Notes.scss";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      notes: [],
      userId: null,
      editModeVisible: false,
    };
  }

  componentDidMount = () => {
    this.setState({ userId: this.props.user.id}, () => {
      this.getUserNotes();
    });
  };

  componentDidUpdate = prevProps => {
    // fetch all of users notes as an array
    if (prevProps.user !== this.props.user) {
      if (this.props.user.id) {
        this.getUserNotes();
      }
    }
  };

  getUserNotes = () => {
    let userId = this.props.user.id;
    this.setState({ userId });
    return getNotes(userId, this.onSuccess, this.onError);
  }

  onSuccess = data => {
    this.setState({ loading: false, notes: data });
    console.log(data);
  };

  onError = errorMessage => {
    this.setState({ error: errorMessage, loading: false });
    console.log(errorMessage);
  };

  postFormData = ({ notes: note_text }) => {
    let { userId } = this.state;
    addNotes({ userId, note_text }, ({ id: noteId }) => {
      console.log('success post:', noteId)
      getNotes(userId, this.onSuccess, this.onError);
    }, (message) => {
      console.log('fail post', message)
    })
    this.setState({ loading: true, error: null });

    this.toggleEdit()
  };

  toggleEdit = () => {
    this.setState({ editModeVisible: !this.state.editModeVisible })
  }

  renderNote = () => {
    let { notes, editModeVisible } = this.state;
    let description = notes.description ? notes.description : "No notes yet.";
    
    if (editModeVisible) {
      return (
        <div className="notes-form">
            <DynamicFormContainer
                key={`${notes.participant_id}_${notes.id}`}
                initialData={""}
                questions={NotesQA}
                editableMode={true}
                editableModeOn={true}
                onCancel={this.toggleEdit}
                onSubmit={this.postFormData}
                onDelete={this.deleteCitation}
            />
        </div>
      );
    }
    
    return (
      <div className='notes-form'>
        <div className='notes-form--text'>{description}</div>
        <button className='user-card--edit-btn' onClick={(e) => this.toggleEdit(e)}>Edit</button>
      </div>
    )
  };
  render() {
    return (
      <section className="notes-container">
        <div className="notes-title">Notes</div>
        <div className="notes-form-container">{this.renderNote()}</div>
      </section>
    );
  }
}

export default Notes;
