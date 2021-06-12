import React, {useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Form,
    CardHeader,
    Col,
    Container,
    FormGroup,
    Input,
    Row,
    InputGroup
} from "reactstrap";
import {useFormik} from "formik";
import './styles/dashboardstyles.scss'
import {useHistory } from 'react-router-dom'
import {updateDoctorId,updateHospitalId,updateSpecializationId} from '../../../features/timeschedule/timescheduleSlice'
import {useSelector,useDispatch} from "react-redux";
import {DETAILVIEWDASHBOARD} from "../../navigation/CONSTANTS";



const initialValues = {
    hospitalsList:'',
    doctorsList:'',
    specializationList:''
}

function DashBoardView(){
    const dispatch = useDispatch();
    const history = useHistory()
    const [hos,setHos] = useState(useSelector(state => state.hospitals.hospitalsArray))
    const [doc,setDoc] = useState(useSelector(state => state.doctors.doctorsArray))
    const [spe,setSpe] = useState(useSelector(state => state.specialization.specializationArray))

    const formik = useFormik({
          initialValues,
          onSubmit,

    })
 let content = ''

   function onSubmit(values){
        if(formik.values.hospitalsList===''&& formik.values.specializationList==='' && formik.values.doctorsList===''){
         alert('Atleast choose one field')

        }else{
            let key=0
            if(formik.values.hospitalsList!=="" && formik.values.doctorsList===""&&formik.values.specializationList===""){
                dispatch(updateHospitalId(formik.values.hospitalsList))
                key=1
                history.push(DETAILVIEWDASHBOARD)
            }
            if(formik.values.doctorsList!=="" && formik.values.specializationList==="" && formik.values.hospitalsList===""){
                dispatch(updateDoctorId(formik.values.doctorsList))
                key =1
                history.push(DETAILVIEWDASHBOARD)
            }
            if(formik.values.specializationList!==""&&formik.values.doctorsList===""&&formik.values.hospitalsList===""){
                dispatch(updateSpecializationId(formik.values.specializationList))
                key=1
                history.push(DETAILVIEWDASHBOARD)
            }
            if(key===0){
                alert('Choose only Field')
            }
            console.log("onsubmit",formik.values.hospitalsList,formik.values.specializationList,formik.values.doctorsList)

        }

 }


    return(
        <>
            <div
                className="section section-signup"
                style={{
                    backgroundImage: "url(" + require("../../assets/img/bg11.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    minHeight: "700px",
                }}
            >
                <Container className="container">

                    <Row>
                        <Col   md="12" xl="8">
                            <Card className="card-signup" data-background-color="blue">
                                <Form action="" method="" className="form" onSubmit={formik.handleSubmit}>
                                <CardHeader>
                                    Searching Form
                                </CardHeader>

                                <CardBody>

                                    <Row>
                                        <Col className="mb-6" lg="8" sm="8">

                                            <FormGroup>
                                                <label htmlFor="exampleFormControlSelect1">Search Hospital</label>
                                                <br/>
                                                <select id="exampleFormControlSelect1"  type="select"
                                                    name="hospitalsList"
                                                    value={formik.values.hospitalsList}
                                                       onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                >
                                                    <option></option>

                                                    {hos.map((key)=>key.map((index) => <option className="option" value={index.Id}>{index.Name}</option>))}
                                                </select>

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mb-6" lg="8" sm="8">
                                            <FormGroup>
                                                <label htmlFor="exampleFormControlSelect1">Search Doctors</label>
                                                <select id="exampleFormControlSelect1" type="select"
                                                   name="doctorsList"
                                                   value={formik.values.doctorsList}
                                                       onBlur={formik.handleBlur}
                                                   onChange={formik.handleChange}

                                                >
                                                    <option></option>
                                                    {doc.map((key)=>key.map((index)=><option value={index.Id}>{index.Name} </option>))}
                                                </select>

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mb-6" lg="8" sm="8">

                                            <FormGroup>
                                                <label htmlFor="exampleFormControlSelect1">Search Specialization</label>
                                                <select id="exampleFormControlSelect1" type="select"
                                                   name="specializationList"
                                                   value={formik.values.specializationList}
                                                       onBlur={formik.handleBlur}
                                                   onChange={formik.handleChange}
                                                >
                                                    <option></option>
                                                    {spe.map((key)=> key.map((index)=><option value={index.Id}> {index.Type} </option>))}
                                                </select>

                                            </FormGroup>
                                        </Col>
                                    </Row>

                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button
                                        className="btn-neutral btn-round"
                                        color="info"
                                        size="md"
                                        type="submit"
                                    >
                                        Search
                                    </Button>
                                </CardFooter>
                            </Form>
                            </Card>
                        </Col>

                    </Row>
                </Container>

            </div>

        </>
    )
}

export  default DashBoardView
