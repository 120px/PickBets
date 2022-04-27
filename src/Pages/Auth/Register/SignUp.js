import React from "react"
import SignUpForm from "./SignUp_Form";
import "../../../CSS/Auth.css"

const Signup = () => {

    return (
        <div className="signup-container">
            <div className="text-center">
                <h2>PickBets</h2>
                <span>Ready to become a <span>winner</span>?</span>
            </div>

            <SignUpForm></SignUpForm>

        </div>
    );

}

export default Signup