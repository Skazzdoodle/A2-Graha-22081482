import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, setPhone_number] = useState('');
    const [phone_type, setPhone_type] = useState('');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number,
                phone_type,
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setPhone_number('');
        setPhone_type('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select onChange={(e) => setPhone_type(e.target.value)} value={phone_type}>
            <option value="" disabled>Select a category</option>
            <option value="Personal Phone">Personal Phone</option>
            <option value="Work Phone">Work Phone</option>
            <option value="Office Phone">Office Phone</option>
            <option value="Other Phone">Other Phone</option>
        </select>

            <input type='text' placeholder='Phone Number' onChange={(e) => setPhone_number(e.target.value)} value={phone_number}/>
            <button className='button green' type='submit'>Add President phone</button>
        </form>
	);
}

export default NewPhone;