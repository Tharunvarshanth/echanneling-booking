import React from 'react'

import ehannellogo from '../assets/echannelinglogo.jpg'
import './styles/NavBar.scss'


import {

        Collapse,
        NavbarBrand,
        Navbar,
        NavItem,
        NavLink,
        Nav,
        Container,

} from "reactstrap";
import {DASHBOARD, LOGIN, PROFILE, SIGNUP} from "../navigation/CONSTANTS";
import {useDispatch, useSelector} from "react-redux";
import { getlocalsotrage, remove_user} from "../apiService/sharedService";
import {updatestates} from "../../features/authUser/userSlice";

export const NavMenu =()=> {
        const auth = useSelector(state => state.user.auth)
        let dispatch = useDispatch()
        console.log("auth")
        console.log(auth)
        const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
        const [collapseOpen, setCollapseOpen] = React.useState(false);

        React.useEffect(() => {
                const uservalue = getlocalsotrage();
                if(uservalue!=null) {
                        dispatch(updatestates(uservalue))
                }

                const updateNavbarColor = () => {
                        const pathname = window.location.pathname
                        if(pathname=="/") {
                                if (
                                    document.documentElement.scrollTop > 50 ||
                                    document.body.scrollTop > 50
                                ) {
                                       console.log(pathname)
                                        setNavbarColor("#1E90FF");
                                } else if (
                                    document.documentElement.scrollTop < 51 ||
                                    document.body.scrollTop < 51
                                ) {
                                        setNavbarColor("navbar-transparent");
                                }
                        }else{
                                setNavbarColor("#1E90FF");
                        }
                };
                window.addEventListener("load", updateNavbarColor);
                window.addEventListener("scroll", updateNavbarColor);
                return function cleanup() {
                        window.removeEventListener("scroll", updateNavbarColor);
                };



        });




        const logout = ()=>{
             remove_user();
        }

        return (
            <>
                    {collapseOpen ? (
                        <div
                            id="bodyClick"
                            onClick={() => {
                                    document.documentElement.classList.toggle("nav-open");
                                    setCollapseOpen(false);
                            }}
                        />
                    ) : null}
                    <Navbar className={"fixed-top " + navbarColor} expand="lg" color="primary">
                            <Container>
                                    <div className="navbar-translate">
                                            <NavbarBrand
                                                href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
                                                target="_blank"
                                                id="navbar-brand"
                                            >
                                                    <a className="navbar-brand" href="/">
                                                            <img width="100" src={ehannellogo}  />
                                                    </a>
                                            </NavbarBrand>

                                    </div>
                                    <Collapse
                                        className="justify-content-end"
                                        isOpen={collapseOpen}
                                        navbar
                                    >
                                            <Nav>
                                                    <NavItem>
                                                            <NavLink className="navbartext" href={DASHBOARD}>
                                                                    DashBoard
                                                            </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                            <NavLink hidden={!auth} className="navbartext" href={PROFILE}>
                                                                    Profile
                                                            </NavLink>
                                                    </NavItem>
                                                    <NavItem hidden={auth} id="login">
                                                            <NavLink className="navbartext" href={LOGIN}>
                                                                     Login
                                                            </NavLink>
                                                    </NavItem>
                                                    <NavItem hidden={auth} id="signup">
                                                            <NavLink className="navbartext" href={SIGNUP}>
                                                                    SignUp
                                                            </NavLink>
                                                    </NavItem>
                                                    <NavItem hidden={!auth} id="logout" >
                                                            <NavLink className="navbartext" href="" onKeyPress={logout} onClick={logout} >
                                                                    Logout
                                                            </NavLink>
                                                    </NavItem>

                                            </Nav>
                                    </Collapse>
                            </Container>
                    </Navbar>
            </>
        );
}

export default NavMenu;
