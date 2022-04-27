import React from 'react'

const SignUpForm = () => {
    return (
        <div className='signup-form-container'>

            <div className='signup-form'>
                <div className='signup-form-name'>
                    <div className='signup-form-name-inner'>
                        <input type="text" placeholder="First Name"></input>
                        <input type="text" placeholder="Last Name"></input>
                    </div>
                </div>

                <div className='signup-form-details'>
                    <div className='details'>
                        <input type="text" placeholder="Username"></input>
                    </div>
                    <div className='details'>
                        <input type="text" placeholder="E-mail"></input>
                    </div>
                    <div className='details'>
                        <input type="text" placeholder="Password"></input>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUpForm