import React,{useState,useEffect} from "react";
import { unwrapResult } from '@reduxjs/toolkit'
import './styles/signupstyles.scss'
import {useFormik} from "formik";
// reactstrap components

// plugin that creates slider

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    CardFooter,
    Row,
    Input,
    Button,
    InputGroupAddon,
    InputGroupText,
    InputGroup, Form, CardTitle
} from "reactstrap";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {registerUser} from "../../../features/authUser/userApi";
import {getIsLoggedIn} from "../../apiService/sharedService";
import {DASHBOARD} from "../../navigation/CONSTANTS";

const initialValues = {
    username:'',
    password:'',
    retypepassword:'',
    mobile:'',
    displayname:''
}


const validate =  values => {
    let errors ={}
    if(!values.username ){
        errors.username = 'Required'
    }
    if(!values.password){
        errors.password = 'Required'
    }
    if(!values.retypepassword){
        errors.retypepassword = 'Required'
    }
    if(values.retypepassword != values.password){
        errors.retypepassword = 'Password mismatch'
    }
    if(!values.mobile){
        errors.mobile = 'Required'
    }
    if(!values.displayname){
        errors.displayname = 'Required'
    }
    return errors;
}
function Signup(){
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    let history = useHistory()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    })

   async function onSubmit(values){
        console.log(values)
        try {
            setAddRequestStatus('pending')
            const resultAction = await dispatch(
                registerUser({ Username:formik.values.username, Password:formik.values.password,
                    Displayname:formik.values.displayname,Mobile:formik.values.mobile,Id:'',Role:'user'})
            )
            unwrapResult(resultAction)


        } catch (err) {
            console.error('Failed to save the post: ', err)
        } finally {
            setAddRequestStatus('idle')
            console.log('finally')
        }
    }

   console.log('error',formik.errors)

    React.useEffect(() => {
        if(getIsLoggedIn()){
            history.push(DASHBOARD)
        }

    });





    return(

        <Container className="signupbody col-10">
            <Row>
                <Card className="card-signup " data-background-color="blue">
                    <Form action="" className="form" onSubmit={formik.handleSubmit} method="">
                        <CardHeader className="text-center">
                            <CardTitle className="title-up" tag="h3">
                                Sign Up
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <InputGroup
                                className={
                                    "no-border" + (firstFocus ? " input-group-focus" : "")
                                }
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="now-ui-icons users_circle-08"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Username"
                                    name="username"
                                    type="email"
                                    onFocus={() => setFirstFocus(true)}
                                    onBlur={() => setFirstFocus(false)}
                                    onBlur ={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                {formik.touched.username&&formik.errors.username ?<div className="error">{formik.errors.username}</div>:null}

                            </InputGroup>
                            <InputGroup
                                className={
                                    "no-border" + (lastFocus ? " input-group-focus" : "")
                                }
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="now-ui-icons text_caps-small"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    onFocus={() => setLastFocus(true)}
                                    onBlur={() => setLastFocus(false)}
                                    onBlur ={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ?<div className="error">{formik.errors.password}</div>:null}
                            </InputGroup>
                            <InputGroup
                                className={
                                    "no-border" + (lastFocus ? " input-group-focus" : "")
                                }
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="now-ui-icons text_caps-small"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Retype-Password"
                                    name="retypepassword"
                                    type="password"
                                    onFocus={() => setLastFocus(true)}
                                    onBlur={() => setLastFocus(false)}
                                    onBlur ={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.retypepassword}
                                />
                                {formik.touched.retypepassword&&formik.errors.retypepassword ?<div className="error">{formik.errors.retypepassword}</div>:null}
                            </InputGroup>
                            <InputGroup
                                className={
                                    "no-border" + (lastFocus ? " input-group-focus" : "")
                                }
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="now-ui-icons text_caps-small"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Mobile"
                                    name="mobile"
                                    type="text"
                                    onFocus={() => setLastFocus(true)}
                                    onBlur={() => setLastFocus(false)}
                                    onBlur ={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.mobile}
                                />
                                {formik.errors.mobile && formik.touched.mobile?<div className="error">{formik.errors.mobile}</div>:null}
                            </InputGroup>
                            <InputGroup
                                className={
                                    "no-border" + (lastFocus ? " input-group-focus" : "")
                                }
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="now-ui-icons text_caps-small"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Name"
                                    name="displayname"
                                    type="text"
                                    onFocus={() => setLastFocus(true)}
                                    onBlur={() => setLastFocus(false)}
                                    onBlur ={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.displayname}
                                />
                                {formik.errors.displayname && formik.touched.displayname?<div className="error">{formik.errors.displayname}</div>:null}
                            </InputGroup>

                        </CardBody>
                        <CardFooter className="text-center">
                            <Button
                                className="btn-neutral btn-round"
                                color="info"
                                type="submit"
                                size="lg"
                            >
                                Register
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </Row>

        </Container>





    )

}


export default  Signup
