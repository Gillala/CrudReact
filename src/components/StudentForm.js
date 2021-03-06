import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';

let StudentForm = ({ onSubmit, submitting, formStatus }) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-lg-4 col-sm-push-3 col-lg-push-4" >
                <form onSubmit={onSubmit} noValidate>
                    <Field name="firstname" component={renderField} type="text" id="first-name" label="First Name" />
                    <Field name='lastname' component={renderField} type="text" id="last-name" label='LastName' />
                    <Field name="avatarUrl" component={renderField} type="url"
                        id="avatar-url" label="Avatar Url" />
                    <Field name="email" component={renderField} type="email"
                        id="email-address" label="Email Address" />
                    <Field name="phone" component={renderField} type="tel"
                        id="phone-number" label="Phone Number" />
                    <Field name="has-premium" component={renderField} type="checkbox"
                        label="Has Premium"
                    />
                    <button type="submit" className="btn btn-primary merchant-submit" disabled={submitting}>Submit</button>
                </form>
                {
                    formStatus === 'success' &&
                    <p className="alert alert-sucess">
                        Student successfully saved
                        <NavLink to="/students/1"> Return to Student List</NavLink>
                    </p>
                }
                {formStatus === 'error' &&
                    <p className="alert alert-danger">Saving student failed. Please fill or correct in all the fields.</p>}
            </div>
        </div>
    )
};

const renderField = ({
    input,
    label,
    type,
    id,
    meta: { touched, error }
}) => (
        // Render schema for checkbox
        (type === 'checkbox')
            ?
            <div className="checkbox">
                <label>
                    <input {...input} type={type} />
                    {label}
                </label>
                {touched &&
                    (error &&
                        <span className="error-text">
                            {error}
                        </span>)}
            </div>
            :
            // Render schema for inputs
            <div className="form-group">
                <label htmlFor={id}>
                    {label}
                </label>
                <input {...input} id={id} type={type} className="form-control" />
                {touched &&
                    (error &&
                        <span className="error-text">
                            {error}
                        </span>)}
            </div>
    );

function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'please enter firstname';
    }
    if (!formProps.lastname) {
        errors.lastname = 'Please enter a last name';
    }

    if (!formProps.avatarUrl) {
        errors.avatarUrl = 'Please enter an avatar url';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formProps.phone) {
        errors.phone = 'Please enter a phone number';
    } // A more specific phone number validation can be added here

    return errors;
}

StudentForm = reduxForm({
    form: 'student',
    validate,
    enableReinitialize: true

})(StudentForm)
export default StudentForm;