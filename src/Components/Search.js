import React, { useState } from 'react';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

import { STUDENTS } from '../studentsList';

function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}

function Search({ addResidentStudent }) {

	const [name, setName] = useState('');
	const [date, setDate] = useState('');

	const inputChangeHandler = (e) => {
		switch (e.target.id) {
			case 'joiningDate':
				setDate(e.target.value);
				break;
			default:
				setName(e.target.value)
		}
	}
	const handleAddStudent = () => {
		const studentIndex = STUDENTS.findIndex((student) => student.name.toLocaleLowerCase() === name.toLocaleLowerCase());
		if (studentIndex === -1) {
			addResidentStudent({ error: `Sorry, ${name} is not a verified student!` })
		} else {
			const validity = checkValidity(date, STUDENTS[studentIndex].validityDate);
			console.log('validtity', validity);
			if (!validity) {
				addResidentStudent({ error: `Sorry, ${name}'s validity has Expired!` })
			} else {
				addResidentStudent({ student: STUDENTS[studentIndex].name })
			}
		}
		setDate('');
		setName('')
	}
	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input value={name} onChange={inputChangeHandler} id="studentName" data-testid="studentName" type="text" className="mr-30 mt-10" />
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input value={date} onChange={inputChangeHandler} id="joiningDate" data-testid="joiningDate" type="date" className="mr-30 mt-10" />
				</div>
			</label>
			<button onClick={handleAddStudent} type="button" data-testid="addBtn" className="small mb-0">Add</button>
		</div>
	);
}

export default Search;
