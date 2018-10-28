import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";
import Snackbar from "@material-ui/core/Snackbar";
import "./styles.css";

export default class FormDialog extends React.Component {
  state = {
    open: false,
    fName: "",
    lName: "",
    class: "",
    yearOfPassing: "",
    percentageOfMarks: "",
    isSubmitButtonDisabled: true,
    formSuccess: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    // Whatever we wish to do here after form submission, we can do here.
    // Resetting the form fields
    this.setState({
      fName: "",
      lName: "",
      class: "",
      percentageOfMarks: "",
      yearOfPassing: "",
      formSuccess: true,
      open: false
    });
  };

  handleChange = (name, event) => {
    event.persist();
    this.setState({
      [name]: event.target.value
    });

    // Field validations can be done here or before changing the state for particular field
    // Field validations can be done either using regexes or through supportive validation library for material-ui
    if (
      this.state.fName &&
      this.state.lName &&
      this.state.class &&
      this.state.yearOfPassing &&
      this.state.percentageOfMarks
    ) {
      this.setState({ isSubmitButtonDisabled: false });
    }
  };

  render() {
    return (
      <div>
        <Button
          variant="extendedFab"
          aria-label="Delete"
          color="primary"
          onClick={this.handleClickOpen}
          className="dialogform"
        >
          <AddIcon />
          Fill School Form
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Admission Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill all the fields correctly.
            </DialogContentText>
            <TextField
              autoFocus
              id="fname"
              label="First Name"
              type="text"
              fullWidth
              value={this.state.fName}
              onChange={this.handleChange.bind(this, "fName")}
            />
            <TextField
              autoFocus
              id="lname"
              label="Last Name"
              type="text"
              fullWidth
              value={this.state.lName}
              onChange={this.handleChange.bind(this, "lName")}
            />
            <TextField
              autoFocus
              id="class"
              label="Class"
              type="text"
              fullWidth
              value={this.state.class}
              onChange={this.handleChange.bind(this, "class")}
            />
            <TextField
              autoFocus
              id="passingYear"
              label="Year of Passing"
              type="number"
              fullWidth
              value={this.state.yearOfPassing}
              onChange={this.handleChange.bind(this, "yearOfPassing")}
            />
            <TextField
              autoFocus
              id="percentage"
              label="Marks (%)"
              type="number"
              fullWidth
              value={this.state.percentageOfMarks}
              onChange={this.handleChange.bind(this, "percentageOfMarks")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={this.state.isSubmitButtonDisabled}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          autoHideDuration="3"
          message="Success! Your Application Form has been submitted"
          open={this.state.formSuccess}
          className="toast"
        />
      </div>
    );
  }
}
