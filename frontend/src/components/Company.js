import { useState } from 'react';

function Company(props) {
    const { company, companies, setCompanies, contact } = props;

    async function deleteCompany() {
        const response = await fetch(
            'http://localhost/api/contacts/' + contact.id + '/companies/' + company.company_id,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            const updatedCompanies = companies.filter((c) => c.company_id !== company.company_id);
            setCompanies([...updatedCompanies]);
        }
    }

	return (
    <tr
        onClick={(e) => e.stopPropagation()} // Ensure row click doesn't propagate
    >
        <>
            <td>{company.company_name}</td>
            <td>{company.company_address}</td>
            <td>
                <button
                    className="button red"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteCompany();
                    }}
                    title="Delete company"
                >
                    Delete
                </button>
            </td>
        </>
    </tr>
);
}

export default Company;
