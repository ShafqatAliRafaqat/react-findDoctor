import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/TreatmentAction";
import SimplePagination from "../Common/SimplePagination";
import { getSearchUrlFromState } from '../../util/functions'
import * as qs from 'query-string';
import alertify from 'alertifyjs';
import List from './list';
import SearchPages from '../Search/search_pages';

import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
class SpecializatoinList extends Component{
    state = {
		isLoading	: true,
		current_page: 0,
		last_page	: 0,
		per_page	: 0,
		treatments	:'',
		treatment_data:'',
		activePage	:0,
		
    };
    componentDidMount() {
		let search	 = this.props.location.search;
        const params = qs.parse(search);
        for (let key in params) {
            this.setState({
                [key]: params[key]
            });
        }
        this.getTreatments(search);
	  }
	  
      getTreatments = (search) => {

        this.setState({
            isLoading: true
        });

        let { getTreatments, dispatch, errorHandler, alertify } = this.props;
            getTreatments(search).then(res => {
            this.setState({
				current_page: res.data.meta.current_page,
                last_page	: res.data.meta.last_page,
                to			: res.data.meta.to,
                per_page	: res.data.meta.per_page,
                total		: res.data.meta.total,
                treatment_data: res.data.data
			});
			if(res.data.meta.total == 0){
				alertify.error("There is no Specialization");
			}
			window.scrollTo(0, 0);
            dispatch({
                type: actions.GET_ALL_TREATMENTS,
                payload: res.data.data
            }); 
        }).catch(errorHandler).finally(() => {
            this.setState({
                isLoading: false
            });
        });
	};
	
	ListOftreatments = () => {
		if (this.state.isLoading) {
            return (<div data-loader="circle-side"></div>);
        }
		const { treatment_data } = this.state;
		return	<List {...this.props} treatment_data={treatment_data} />		
	};

	SearchPages = () => {
		return	<SearchPages {...this.props} />		
	};

	handlePageChange = (pageNumber) => {
		this.setState({activePage: pageNumber});
		let search = getSearchUrlFromState(this.state);
		this.getTreatments(search + "page=" + 	pageNumber , actions.GET_ALL_TREATMENTS);
	}

    render(){

		let { page, totalPages,to,total } = this.state;
		if (this.state.isLoading) {
            return (<div data-loader="circle-side"></div>);
        }
        return(
            <React.Fragment>
				<main>
					
					<div id="results">
						<div className="container">
							<div className="row">
							<div className="col-md-6">
												<div id="breadcrumb">
													<div className="container">
														<ul>
															<li><Link to="/">Home</Link></li>
															<li>Find a Doctor</li>
															<li>Specializations</li>
														</ul>
													</div>
												</div>
											</div>
								{this.SearchPages()}
							</div>
						</div>
					</div>

					<div className="filters_listing">
						<div className="container">
							<ul className="clearfix">
								<li>
									<h6>Type</h6>
									<div className="switch-field">
										<Link to="specialization_list">
											<input type="radio" id="clinics" name="type_patient" value="clinics" checked/>
											<label >Specialization</label>
										</Link>
										<Link to="doctor_list">
										<input type="radio" id="doctors" name="type_patient" value="doctors" />
										<label >Doctors</label>
										</Link>
										<Link to="clinic_list">
										<input type="radio" id="clinics" name="type_patient" value="clinics" />
										<label >Clinics</label>
										</Link>
										
									</div>
								</li>
							
								<li className="pt-3">
									<span><strong>Showing {to}</strong> of {total} results</span>
								</li>
							</ul>
						</div>
					</div>
					
					<div className="container margin_60_35">
						<div className="row">

							{this.ListOftreatments()}
						</div>
						<div className="row">
							<div className="text-center col-12">
								{(total != 0)?	<Pagination
									prevPageText='prev'
									nextPageText='next'
									firstPageText='first'
									lastPageText='last'
									activePage={this.state.current_page}
									itemsCountPerPage={this.state.per_page}
									totalItemsCount={this.state.total}
									onChange={this.handlePageChange}
									/>
									:<div className="text-center  col-12">There is no data</div>
								}
							</div>
						</div>
					</div>
				</main>
	
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        getTreatments: (search) => actions.getAllTreatments(search),
    };
};

export default connect(mapDispatchToProps)(SpecializatoinList);