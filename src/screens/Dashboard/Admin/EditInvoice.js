// Imports
import React, { useState, useEffect } from "react";
import imgPlaceholder from "../image-placeholder.png";
import {
	confirmEdit,
	editName,
	editQuantity,
	editRate,
	// editDescription,
} from "../../../utils/invoiceFunctions";
import "./EditInvoice.css";
// End

const EditInvoice = (props) => {
	const { setEdit, setCancelEdit, editedInvoice, setEditedInvoice } = props;
	const textAlignCenter = { textAlign: "center" };
	const [selectedInput, setSelectedInput] = useState("");

	function setInputFilter(textbox, inputFilter) {
		[
			"input",
			"keydown",
			"keyup",
			"mousedown",
			"mouseup",
			"select",
			"contextmenu",
			"drop",
		].forEach(function (event) {
			textbox.addEventListener(event, function () {
				if (inputFilter(this.value)) {
					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;
				} else if (this.hasOwnProperty("oldValue")) {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				} else {
					this.value = "";
				}
			});
		});
	}

	useEffect(() => {
		if (editedInvoice && selectedInput) {
			setInputFilter(
				document.getElementById(`${selectedInput}`),
				function (value) {
					return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
				}
			);
		}
	}, [selectedInput, editedInvoice]);

	if (editedInvoice) {
		return (
			<div id="invoice-edit">
				<header>
					<h1>Invoice</h1>
					<address>
						<p> email@gmail.com (Company E-mail)</p>
						<p> 45189, Research Place, Suite 150A (Company Address)</p>
						<p> Business Number: 0-808-234-2380 (Company Number)</p>
					</address>
					<span>
						<img loading="lazy"alt="it" src={imgPlaceholder} id="company-img" />
					</span>
				</header>
				<article>
					<h1>Recipient</h1>
					<address className="norm">
						<h4>{editedInvoice.user.username || "Sample Name"}(Client Name)</h4>
						<p>{editedInvoice.user.email || "Sample E-mail"}(Client E-mail)</p>
						<br />
						<p>
							{editedInvoice.user.address || "Sample Address "}(Client Address)
						</p>
						<br />
						<p>
							{editedInvoice.user.contactNum || "Sample Number"}(Client Number)
						</p>
					</address>

					<table className="meta">
						<tbody>
							<tr>
								<th>
									<span>Invoice #</span>
								</th>
								<td>
									<span>{editedInvoice._id}</span>
								</td>
							</tr>
							<tr>
								<th>
									<span>Date Availed</span>
								</th>
								<td>
									<input
										type="text"
										placeholder={
											editedInvoice.manualDateAdded || editedInvoice.createdAt
										}
										onChange={(event) => {
											setEditedInvoice({
												...editedInvoice,
												manualDateAdded: event.target.value.toString(),
											});
										}}
									></input>
								</td>
							</tr>
							<tr>
								<th>
									<span>Amount Due</span>
								</th>
								<td>
									<span id="prefix">$</span>
									<span>{editedInvoice.cart.total_price}</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table className="inventory">
						<thead>
							<tr>
								<th>
									<span>S. No</span>
								</th>
								<th>
									<span>ID</span>
								</th>
								<th>
									{/* <span>Description</span> */}
									<span>Item Name</span>
								</th>
								<th>
									<span>Qty</span>
								</th>
								<th>
									<span>Rate Per Qty</span>
								</th>
								<th>
									<span>Amount</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{editedInvoice.cart.items
								.sort((a, b) => {
									const itemA = a._id.toUpperCase();
									const itemB = b._id.toUpperCase();
									if (itemA < itemB) {
										return -1;
									} else if (itemA > itemB) {
										return 1;
									}
									return 0;
								})
								.map((item, index) => {
									return (
										<tr key={item._id}>
											<td>
												<span>{index + 1}</span>
											</td>
											<td>
												<span>{item._id}</span>
											</td>
											<td>
												<input
													type="text"
													// placeholder={item.description || "Sample Description"}
													placeholder={item.name}
													// onChange={(event) => {
													// 	editDescription({ ...props, event, item });
													// }}
													onChange={(event) => {
														editName({ ...props, event, item });
													}}
												></input>
											</td>
											<td className="input-container">
												{item.type !== "course" ? (
													<input
														type="text"
														placeholder={parseInt(item.qty)}
														min="1"
														max="5"
														id={`${item._id}-qty`}
														onClick={() => {
															setSelectedInput(`${item._id}-qty`);
														}}
														onChange={(event) => {
															editQuantity({ ...props, event, item });
														}}
													></input>
												) : (
													<input
														type="text"
														id={`${item._id}-qty`}
														defaultValue={item.qty}
														placeholder={item.qty}
														disabled
													/>
												)}
											</td>
											<td className="input-container">
												<span data-prefix>
													<input
														type="text"
														placeholder={parseFloat(item.price)}
														style={{ width: "95%" }}
														min="1"
														max="5"
														id={`${item._id}-rate`}
														onClick={() => {
															setSelectedInput(`${item._id}-rate`);
														}}
														onChange={(event) => {
															editRate({ ...props, event, item });
														}}
													></input>
												</span>
											</td>
											<td>
												<span data-prefix>$</span>
												<span>
													{parseFloat(item.price * item.qty).toFixed(2)}
												</span>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					<table className="sign">
						<tbody>
							<tr>
								<td>
									Signature Here
									<br />
									<img loading="lazy" src={imgPlaceholder} alt="img" />
								</td>
							</tr>
						</tbody>
					</table>

					<table className="balance">
						<tbody>
							<tr>
								<th>
									<span>Total</span>
								</th>
								<td>
									<span data-prefix>$</span>
									<span>{editedInvoice.cart.total_price}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</article>
				<aside>
					<h1>
						<span>Additional Notes</span>
					</h1>
					<div>
						<p>
							We offer limited 10 days refund policy and 30 days workmanship
							warranty on all of our services. For more details, please read our
							refund policy below.
						</p>
					</div>
				</aside>
				<div style={textAlignCenter}>
					<button
						className="btn btn-danger"
						onClick={() => {
							setEdit(false);
							setCancelEdit(true);
						}}
					>
						Cancel
					</button>
				</div>
				<div style={textAlignCenter}>
					<button
						className="btn btn-primary"
						onClick={() => {
							confirmEdit({
								...props,
							});
						}}
					>
						Confirm Edit
					</button>
				</div>
			</div>
		);
	} else {
		return "";
	}
};

export default EditInvoice;
