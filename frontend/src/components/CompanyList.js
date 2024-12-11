import Company from "./Company.js";
import NewCompany from "./NewCompany.js";
import { useState, useEffect } from 'react';

function CompanyList(props) {
    const { contact, companies, setCompanies } = props;
    useEffect(() => {
        // Fetch companies for the contact when the component mounts
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies`);
                if (response.ok) {
                    const data = await response.json();
                    setCompanies(data);
                } else {
                    console.error("Failed to fetch companies");
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, [contact.id]);

	return (
        <div
            className="company-list-container"
            onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to parent container
        >
            <h2 className="company-list-title">Company Management</h2>
            <NewCompany
                companies={companies}
                setCompanies={setCompanies}
                contact={contact}
            />
    
            <table className="company-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length > 0 ? (
                        companies.map((company) => (
                            <Company
                                key={company.company_id}
                                company={company}
                                companies={companies}
                                setCompanies={setCompanies}
                                contact={contact}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center", fontStyle: "italic", color: "grey" }}>
                                No companies available. Add a new company above.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
    
}

export default CompanyList;
