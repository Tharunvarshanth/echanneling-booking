import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
} from "reactstrap";

import React, {useState} from "react";
import './styles/loginstyles.scss';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {useFormik} from "formik";
import {loginUser} from "../../../features/authUser/userApi";
import {unwrapResult} from "@reduxjs/toolkit";

import {DASHBOARD} from "../../navigation/CONSTANTS";
import {getIsLoggedIn} from "../../apiService/sharedService";



const initialValues = {
    username:'',
    password:'',
}


const validate =  values => {
    let errors ={}
    if(!values.username ){
        errors.username = 'Required'
    }
    if(!values.password){
        errors.password = 'Required'
    }

    return errors;
}

var styles ={
    warning:{
        display : "none"
    }
}

function Login(){
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

        try {
            setAddRequestStatus('pending')
            const resultAction = await dispatch(
                loginUser({ Username:formik.values.username, Password:formik.values.password})
            )
            console.log('resultAction',resultAction)

            unwrapResult(resultAction)
            history.push(DASHBOARD);
        } catch (err) {
            console.error('Failed to log: ', err)
            document.getElementById("warning").style.display="block"
        } finally {
            setAddRequestStatus('idle')
            console.log('finally')
        }
    }

    React.useEffect(()=>{
        if(getIsLoggedIn()){
            history.push(DASHBOARD)
        }
    })


    return (
        <>
                <Container className="loginbody col-6">

                    <Row>
                        <div style={styles.warning} className="bg-warning" id="warning">
                            <span>Password / Email is Incorrect</span>
                        </div>
                        <Card className="card-signup " data-background-color="blue">
                            <Form action="" className="form" method="" onSubmit={formik.handleSubmit}>
                                <CardHeader className="text-center">
                                    <CardTitle className="title-up" tag="h3">
                                        Sign In
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
                                            type="text"
                                            onFocus={() => setFirstFocus(true)}
                                            onBlur={() =>

                                                setFirstFocus(false)
                                            }
                                            onBlur ={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                        />
                                        {formik.errors.username &&formik.touched.username ?<div className="error">{formik.errors.username}</div>:null}
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (lastFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons text_caps-small"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="text"
                                            name="password"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}

                                            onBlur ={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                        {formik.errors.password && formik.touched.password ?<div className="error">{formik.errors.password}</div>:null}
                                    </InputGroup>

                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button
                                        className="btn-neutral btn-round"
                                        color="info"
                                        type="submit"
                                        size="lg"
                                    >
                                       Log In
                                    </Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Row>

                </Container>

        </>
    );
}

export default  Login
