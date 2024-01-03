import React from "react";

const Form = ({ htmlFor, id, name, text, successMsg, errorMsg, reg }) => {
    return (
        <div className="form-el">
            <label htmlFor={htmlFor}>{text}</label> <br />
            <input id={id} name={name} />

            {reg === "0" && <p className="message">{errorMsg}</p>}
            {reg === "1" && <p className="message">{successMsg}</p>}
            {reg === "2" && <p className="message">{errorMsg}</p>}
        </div>
    );
};

export default Form;
