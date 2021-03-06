import React, { Component } from "react";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import * as actions from "../Store/Actions/TreatmentAction";

class Footer extends Component {
    state = {
        isLoading       :   true,
        specializations :   '',
    }
    componentDidMount(){
        this.getSpecializations();
    }
    getSpecializations = () => {
        this.setState({
            isLoading   :   false,
        });
        let {getSpecializations,errorHandler}   =   this.props;
        getSpecializations().then(res => {
            this.setState({
                specializations: res.data.top_Specializations_names,
            })
        }).catch(errorHandler).finally(()=>{
            this.setState({
                isLoading: false
            });
        });
    };
    render() {
        const {specializations} = this.state;
        return (
            <footer className="bg-dark">
            {/* <footer className="bg-light"> */}
                <div className="container footer-container">
                    <div className="row py-4">
                        <div className="col-12 col-sm-6">
                            {/* <h1><a title="Findoctor" href="/">HospitALL</a></h1> */}
                            <img src="img/logo.png" className="footer-logo img-responsive" alt=""/>
                            <p className="app-p-footer">Book appointments with the best 
                            Doctors and Specialists such as Gynecologists, Skin Specialists, Child Specialists, 
                            Surgeons, etc. in Pakistan conveniently.</p>
                            <h4 className="app-h4-footer"> Download Now! </h4>
                            <div className="app_buttons wow  pb-4" data-wow-offset="100">
                            <a href="https://play.google.com/store/apps/details?id=com.hospitall.drathospitall" className="fadeIn "><img src="img/apple_app.png" className="app-link-img" alt="" width="150" height="50" data-retina="true"  /></a>
                            <a href="https://play.google.com/store/apps/details?id=com.hospitall.drathospitall" className="fadeIn"><img src="img/google_play_app.png" alt="" width="150" height="50" data-retina="true" /></a>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 pt-md-3">
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="h6-footer">Specializations</h6>
                                    <ul className="links">
                                        {(specializations) ?
                                            specializations.map(m => <li ><Link className="link-footer" to={{ pathname: `/treatment_detail/${m.id}` }}>{m.name}</Link></li>)
                                            :
                                            ''}
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <h6 className="h6-footer">Pages</h6>
                                    <ul className="links">
                                        <li><Link className="link-footer" to="/about_us">About us</Link></li>
                                        <li><Link className="link-footer" to="/blog">Blog</Link></li>
                                        <li><Link className="link-footer" to="/faq">FAQ</Link></li>
                                        <li><Link className="link-footer" to="/login">Login</Link></li>
                                        <li><Link className="link-footer" to="/register">Register</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className=" my-1 hr-border"></hr>
                <div className="container footer-container">
                    <div className="row py-4">
                        <div className="col-lg-6 col-sm-12 col-lg-auto text-side-left">
                            <p className="p-btm-footer m-0">
                                &copy; 2018 - 2020 
                                <a href="https://hospitallcare.com" className="pl-1 hospitall-color">HospitALL-Care to Cure</a> 
                                <a href="https://hospitallcare.com/privacy-policy-2/" className=" pl-1 a-btm-footer text-sm">Privacy policy</a> | 
                                <a href="https://hospitallcare.com/contacts/" className=" pl-1 a-btm-footer text-sm">Contact us</a>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-lg-auto text-side-right">
                            <span className="p-btm-footer">Connect with us Through</span>
                            <a className="link-footer" href="https://www.facebook.com/HospitALLOfficial/" target="_blank"><i class="icon-facebook-squared-1 footer-icon"></i></a>
                            <a className="link-footer" href="https://www.instagram.com/hospitallofficial/"><i class=" icon-instagram-filled footer-icon footer-icon-insta"></i></a>
                            <a className="link-footer" href="mailto:hello@hospitall.com"><i class="icon-email footer-icon"></i></a>
                        </div>                        
                    </div>
                </div>
            </footer>

        );
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch : dispatch,
        getSpecializations: () => actions.getSpecialization(),
    };
};
export default connect(mapDispatchToProps)(Footer);