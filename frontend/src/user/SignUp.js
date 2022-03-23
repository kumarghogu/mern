import React, {useState} from "react"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"
import { Base } from "../core/Base"

const SignUp = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, error, success} = values
 
    const handleChange = data => event => {
        setValues({...values, error: false, 
            [data]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(response => {
            if (response.error) {
                setValues({...values, error: response.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }
        })
        .catch(err => console.log(err))
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" 
                            onChange={handleChange("name")} type="text" 
                            value={name}/>
                        </div>
                            <br/>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" 
                            onChange={handleChange("email")} type="email" 
                            value={email}/>
                        </div><br/>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" 
                            onChange={handleChange("password")} type="password"
                            value={password} />
                        </div><br/>
                        <button onClick={onSubmit} className="form-control btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (

            <div class="alert alert-success"
            style={{display: success ? "" : "none"}}>
            
            New account was created successfully. Please 
            <Link to="/signin">SignIn</Link> here.

        </div>
                )
    }

    const errorMessage = () => {
        return (
            
            <div class="alert alert-danger"
            style={{display: error ? "" : "none"}}>
            
            {error}

        </div>
                )
    }

    return (
        <Base title="SignUp Page" description="A page for user to sign up">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default SignUp