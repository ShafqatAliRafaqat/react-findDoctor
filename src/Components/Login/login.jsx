import React, {Component} from "react";
import { Link,Redirect } from "react-router-dom";
import * as actions from "../../Store/Actions/AuthAction";
import PhoneModal from "./forget-password";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber,parsePhoneNumber } from 'react-phone-number-input'
alertify.set('notifier', 'position', 'top-center');

class Login extends Component{
	initState = {
        phone		: '',
        password	: '',
        processing	: false,
	};
	state = {
        ...this.initState,
	};
	onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
	};

	signIn = () => {

        this.setState({
            processing: true
        });
        const {signIn,dispatch,errorHandler ,histroy} = this.props;

        const { phone, password } 	=	this.state;
        let params = { phone, password};
        signIn(params).then(res => {

            this.setState({
                ...this.initState,
			});  
			this.props.history.push('/');
			alertify.success("Login Successfully");
			setTimeout(window.location.reload(),100000);
			dispatch({
                type: actions.SIGN_IN,
                payload: res.data
            });

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });

	};
	renderForgetPasswordModal = () => {
		return <PhoneModal {...this.props} doctor_data = {""} doctor_id={"19"} treatment_id={"123"} booking_date={"12"} center_id={"12"}/>;
    };
    render(){
		const {phone , processing} = this.state;
		if(this.props.user){
			return <Redirect to='/404_not_found' />;
		};
        return(
            <React.Fragment>
				<main>
					<div className="bg_color_2">
						<div className="container margin_60_35">
							<div id="login-2">
								<h1>Please login to Findoctor!</h1>
									<div className="box_form clearfix">
										<div className="row">
											<div className="col-2"></div>
											<div className="col-8">
											<div className="form-group">
												<label>Phone Number</label>									
													<PhoneInput
														country = "PK"
														className="form-control"
														name = "phone"
														placeholder = "Enter Phone Number"
														value={this.state.phone}
														onChange={ phone => this.setState({ phone }) }
														error={ phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required' }required/>								
											</div>
											<div className="form-group">
												<label>Password</label>
												<input type="password" className="form-control" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange}required/>
											</div>
											<div className="form-group">
												<div className="row">
													<div className="col-6 text-left">
														<button color="primary" className='btn_1' onClick={this.signIn}>{(processing) ? "Updating..." : " Continue"}</button>{' '}
													</div>
													<div className="col-6 text-right">
														{this.renderForgetPasswordModal()}
													</div>
												</div>
											</div>
										</div>
										<div className="col-2"></div>
									</div>						
								</div>
								<p className="text-center link_bright">Do not have an account yet? <Link to="/register"><strong>Register now!</strong></Link></p>
							</div>
						</div>
					</div>
				</main>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
      user: state.AuthReducers.user
    };
  };
const mapDispatchToProps = dispatch => {
	return {
		dispatch: dispatch,
        signIn: (params) => actions.signIn(params),

	};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);