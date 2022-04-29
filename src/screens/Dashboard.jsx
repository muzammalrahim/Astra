import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import firebase from 'firebase/app';


const Dashboard = () => {
    const { currentCompany } = useContext(AppContext);
    return (
        <div className="site-card-wrapper">
            <h2 className="someText">{currentCompany?.companyName ? `Dashboard for ${currentCompany?.companyName}` : "Dasbhoard"}</h2>
        </div>
    )
}
export default Dashboard;