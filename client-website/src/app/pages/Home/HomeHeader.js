import React from "react";
// reactstrap components
import { Container } from "reactstrap";
import pageheaderimg from '../../assets/Doctor-Appointment-Booking-App-blog-post.jpg';
import ehannellogo from '../../assets/echannelinglogo.jpg'
import category from '../../assets/img/invision-white-slim.png'
import '../Home/styles/HomeHeader.scss'

function HomeHeader(){
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }

    });

    return (
        <>
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url("+(pageheaderimg)+")",
                    }}
                    ref={pageHeader}
                />


                <div className="center">
                        <br/><br/><br/><br/>
                        <h1 className="h1">Welcome to Our Booking Center.</h1>
                        <h3>Book the appointments here <a href="#">click here</a></h3>
                </div>


            </div>
        </>
    );
}

export default HomeHeader
