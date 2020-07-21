import React from "react";
import {
  InputField,
  BPSelect,
  TextareaField
} from "teselagen-react-components";
import { reduxForm } from "redux-form";
import withEditorProps from "../../withEditorProps";
import { compose } from "recompose";

class GeneralProperties extends React.Component {
  updateSeqDesc = val => {
    return this.props.sequenceDescriptionUpdate(val);
  };
  render() {
    const {
      readOnly,
      showReadOnly = true,
      updateCircular,
      isProtein,
      disableSetReadOnly,
      updateAvailability,
      sequenceData,
      updateReadOnlyMode,
      onSave,
      showAvailability,
      sequenceNameUpdate
    } = this.props;
    const {
      description,
      name,
      sequence = "",
      proteinSequence = "",
      circular,
      materiallyAvailable
    } = sequenceData || {};
    return (
      <React.Fragment>
        <div className="ve-flex-row">
          <div className="ve-column-left">Name:</div>{" "}
          <div className="ve-column-right">
            <input
              className = "ve_Select"
              disabled={readOnly}
              onFieldSubmit={val => {
                sequenceNameUpdate(val);
              }}
              name="name"
              enableReinitialize
              defaultValue={name}
            />{" "}
          </div>
        </div>
        {!isProtein && (
          <div className="ve-flex-row circularLinearSelect">
            <div className="ve-column-left">Circular/Linear:</div>{" "}
            <div className="ve-column-right">
              {" "}
              <select
                className = "ve_Select"
                disabled={readOnly}
                onChange={val => {
                  updateCircular(val === "circular");
                }}
                value={circular ? "circular" : "linear"}
              >
                <option label = "Circular" value = "circular"></option>
                <option label = "Linear" value = "linear"></option>
              </select>
            </div>
          </div>
        )}

        {showAvailability && (
          <div className="ve-flex-row">
            <div className="ve-column-left">Material Availability:</div>{" "}
            <div className="ve-column-right">
              {" "}
              <select
                className = "ve_Select"
                disabled={readOnly}
                onChange={val => {
                  updateAvailability(val === "available");
                }}
                value={materiallyAvailable ? "available" : "unavailable"}
              >
                <option label = "Available" value = "available"></option>
                <option label = "Unavailable" value = "unavailable"></option>               
              </select>
            </div>
          </div>
        )}
        <div className="ve-flex-row">
          <div className="ve-column-left">Length:</div>{" "}
          <div className="ve-column-right">
            {" "}
            {isProtein ? proteinSequence.length : sequence.length}
          </div>
        </div>
        {showReadOnly && (
          <div className="ve-flex-row">
            <div className="ve-column-left">Is Editable:</div>{" "}
            <div className="ve-column-right">
              {" "}
              <select
                className = "ve_Select"
                disabled={!onSave || disableSetReadOnly}
                onChange={val => {
                  updateReadOnlyMode(val === "readOnly");
                }}
                value={readOnly ? "readOnly" : "editable"}
              >
                <option label = "Read Only" value = "readOnly"></option>
                <option label = "Editable" value = "editable"></option>             
              </select>  
            </div>
          </div>
        )}
        <div className="ve-flex-row">
          <div className="ve-column-left">
            <div>Description:</div>
          </div>
          <div className="ve-column-right">
            <textarea
              clickToEdit
              style = {{
                width: "250px",
                backgroundColor : "#f5f6fc"
              }}
              className = "description"
              name="description"
              onFieldSubmit={this.updateSeqDesc}
              defaultValue={description}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
  withEditorProps,
  reduxForm({
    form: "GeneralProperties"
  })
)(GeneralProperties);
