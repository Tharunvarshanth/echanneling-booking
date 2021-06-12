import {Switch,Redirect,Route} from 'react-router-dom'
import {DASHBOARD, LOGIN, ROOT, SIGNUP, PROFILE, DETAILVIEWDASHBOARD, TIMETABLEDETAIL, BOOK} from "./CONSTANTS";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SignUp";
import DashBoard from "../pages/DashBoard/DashBoardContainer"
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import {getIsLoggedIn, checktokenexpired, remove_user} from "../apiService/sharedService";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Profile from "../pages/Profile/ProfileContainer";
import Book from "../pages/Book/BookContainer";
import DetailViewContainer from "../pages/detail/DetailViewContainer";



export const RouterConfig = () =>{

    const requireLogin = (to, from, next) => {
        if (to.meta.auth) {
            if (getIsLoggedIn()) {
                if (!checktokenexpired()) {
                    next();
                }
            }else{
                remove_user()
                next.redirect(LOGIN);
            }
            next.redirect(LOGIN);
        } else {

            next();
        }


    };


    return(
        <GuardProvider guards={[requireLogin]} loading={Loading} error={Error}>
          <Switch>

            <GuardedRoute exact path={ROOT} component={Home} />
            <GuardedRoute path={LOGIN}    component={Login}  />
            <GuardedRoute path={SIGNUP}  component={Signup}  />
            <GuardedRoute path={DASHBOARD} component={DashBoard}  meta={{ auth: true }} />
            <GuardedRoute path={DETAILVIEWDASHBOARD} component={DetailViewContainer} meta={{ auth: true }} />
            <GuardedRoute path={BOOK} component={Book} meta={{ auth: true }} />
            <GuardedRoute path={PROFILE} component={Profile}  meta={{ auth: true }} />
            <Redirect to="/" />
            <Redirect from="/" to="/" />

          </Switch>
        </GuardProvider>
    )

}
