import React from 'react';
import $ from "jquery";

import {ENQUIRIES_API_URL} from "../site-constants";

export default class Registration extends React.Component
{
	constructor(props)
	{
		super(props);

		// This binding is necessary to make `this` work in the callback
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount()
	{
		this.setState(
			{
				$enquiryForm: $('#enquiry-form'),
				$formSuccess: $('#form-success'),
				$formErrors: $('#form-errors'),
				$confirmEmail: $('#confirm-email'),
				$submitButton: $("button[type=submit]")
			})
	}

	render()
	{
		return (
			<div className="row m-4 pt-4 pb-4 align-items-center">


				<div className="col-md-6 col-sm-12">
					<h4 className="text-center text-md-right">Get your first run for <span className="text-success font-italic">FREE!</span></h4>

					<p className="text-center text-md-right">Simply register your details and follow the instructions in the email to claim your free token</p>
					<p className="font-weight-light text-center text-md-right border-left border-right pl-2 pr-2 border-warning" style={{'fontSize': '.75em'}}>If you haven't got a mail in your <strong>Inbox</strong> in the next minute or two, it's probably sitting
						in your Junk/Spam folder. Open it and click <strong> Not Junk</strong> to avoid missing out!</p>
				</div>


				<div className="col-md-6 col-sm-12">
					<form id="enquiry-form">

						<div className="row form-group">
							<div className="col-12 col-md-6">
								<input type="text" className="form-control" name="firstName" autoComplete="home firstName" placeholder="First name" required/>
							</div>


							<div className="col-12 mt-3 col-md-6 mt-md-0">
								<input type="text" className="form-control" name="lastName" autoComplete="home lastName" placeholder="Last name" required/>
							</div>
						</div>


						<div className="row form-group">
							<div className="col">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-fw fa-phone"/></span>
									</div>
									<input type="tel" className="form-control" name="phone" autoComplete="home phone" placeholder="Phone number (optional)"/>
								</div>
							</div>
						</div>


						<div className="row form-group">
							<div className="col">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-fw fa-envelope"/></span>
									</div>
									<input type="email" id="email" name="email" autoComplete="home email" className="form-control" placeholder="me@home.com" required/>
										<div className="input-group-append">
											<button type="submit" onClick={this.onClick} className="btn btn-info"><i className="fa fa-fw fa-send" style={{'WebkitFilter': 'blur(0)'}}/></button>
										</div>
								</div>
							</div>
						</div>

					</form>
					<div className="row justify-content-center">
						<div className="col">
							<div id="form-errors" className="alert alert-danger d-none" role="alert">
								<ul className="list-unstyled mb-0"/>
							</div>

							<div id="form-success" className="card border-0 text-center d-none" role="alert">
								<div className="card-body">
									<h4><i className="text-success align-middle fa fa-fw fa-2x fa-check-circle"/> Thanks for Registering!</h4>
									<small className="text-muted">Confirmation has been sent to: <span id="confirm-email" className="text-info"/><br/>
										(Please note the information regarding Junk/Spam)
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}

	onClick(event)
	{
		event.preventDefault();

		this.startProgress();

		const email = this.state.$enquiryForm.find("input[name='email']").val();

		this.state.$enquiryForm.toggleClass('d-none', false);
		this.state.$formSuccess.toggleClass('d-none', true);
		this.state.$formErrors.toggleClass('d-none', true);
		this.state.$formErrors.find('ul').empty();

		$.post(ENQUIRIES_API_URL + email, this.state.$enquiryForm.serialize())
			.done( (response) => {
				console.log(response);

				this.setSuccessState(email);
			})
			.fail((jqxhr, textStatus, error) => {
				if (jqxhr.responseJSON === undefined) {
					console.error(textStatus);
					console.error(error);

					const list = this.state.$formErrors.find('ul');
					list.append('<li>Oops! Due to a technical issue we were unable to process your request at this time. Please try again later or contact us using the details at the top of the page while we work to resolve it.</li>');
					this.state.$formErrors.toggleClass('d-none', false);
				}
				else {
					this.setErrorState(jqxhr.responseJSON);
				}
			})
			.always(() => this.stopProgress());

	}

	startProgress()
	{
		this.state.$submitButton.toggleClass('disabled', true).prop('disabled', true);
		this.state.$submitButton.find('i').removeClass('fa-send').addClass('fa-circle-o-notch fa-spin');

		$('input').toggleClass('is-invalid', false);
	}

	stopProgress()
	{
		this.state.$submitButton.toggleClass('disabled', false).prop('disabled', false);

		this.state.$submitButton.find('i').addClass('fa-send').removeClass('fa-circle-o-notch fa-spin');
	}

	setSuccessState(email)
	{
		this.state.$enquiryForm.toggleClass('d-none', true);
		this.state.$formSuccess.toggleClass('d-none', false);
		this.state.$confirmEmail.text(email);
	}

	setErrorState(response)
	{
		console.error(response);

		this.state.$enquiryForm.toggleClass('d-none', false);
		this.state.$formSuccess.toggleClass('d-none', true);
		this.state.$formErrors.toggleClass('d-none', false);

		const list = this.state.$formErrors.find('ul');

		const items = response.map(function (element) {
			return '<li>' + element.errorMessage + '</li>';
		});

		list.append(items);

		response.forEach(function (element) {
			const input = $("input[name='" + element.fieldName + "']");
			input.toggleClass('is-invalid', true);
		})
	}

}