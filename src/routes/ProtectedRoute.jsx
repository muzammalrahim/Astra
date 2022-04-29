import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/header";
import SideBar from "../components/sideBar"
import { Layout } from 'antd';
import AppContext from '../context/AppContext';
import firebase from 'firebase/app';

const { Content, Footer, } = Layout;


const ProtectedRoute = (props) => {
    const db = firebase.firestore();
    const { setUser, user, setCurrentCompany, setCompanies, setUID } = useContext(AppContext);
    const { exact, path, component } = props;
    useEffect(async () => {
        if (!(!!user?.firstName) && !!sessionStorage?.getItem('uid')) {
            const doc = (await db.collection('users').doc(sessionStorage?.getItem('uid')).get())
            var userData = doc.data();
            userData.id = doc.id;
            await setUID(sessionStorage?.getItem('uid'))
            await setUser({ firstName: userData?.firstName, lastName: userData?.lastName, email: userData?.email });
            await setCurrentCompany(userData?.companies?.[0] || []);
            await setCompanies(userData?.companies || []);
        }
    }, [])
    return (
        <>
            <Layout>
                <SideBar />
                <Layout className="site-layout">
                    <Header />
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {
                            !!sessionStorage?.getItem('uid') ?
                                <Route
                                    path={path}
                                    component={component}
                                    exact={exact}
                                /> :
                                <Redirect to="/login" />
                        }
                    </Content>

                </Layout>
            </Layout>
            <Footer className="layoutWidth">
                <div>
                    <p className="blueColor all-rights">Copyright ©Astra Tech Pixal</p>
                </div>
            </Footer>
        </>)
}

export default ProtectedRoute;
