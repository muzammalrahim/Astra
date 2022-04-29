import React, { Component } from 'react';
import AppContext from './AppContext';
import { withRouter } from 'react-router';

class MyProvider extends Component {
    constructor(props) {
        super(props);
        this.user = {
            firstName: '',
            lastName: '',
            email: '',
        }
        this.state = {
            loading: false,
            user: this.user,
            currentCompany: [],
            companies: [],
            // projects: [],
            uid: ""
        };
        this.setUser = this.setUser.bind(this);
        this.setUID = this.setUID.bind(this);
        this.setCurrentCompany = this.setCurrentCompany.bind(this);
        this.setCompanies = this.setCompanies.bind(this);
        // this.setProjects = this.setProjects.bind(this);
        this.setLoading = this.setLoading.bind(this);

    }
    async setUser(values) {
        this.setState({
            ...this.state,
            user: values
        })
    }
    async setUID(value) {
        this.setState({
            ...this.state,
            uid: value
        })
    }
    async setCurrentCompany(value) {
        this.setState({
            ...this.state,
            currentCompany: value
        })
    }
    async setCompanies(values) {
        this.setState({
            ...this.state,
            companies: values
        })
    }
    // async setProjects(values) {
    //     this.setState({
    //         ...this.state,
    //         projects: values
    //     })
    // }
    setLoading(value) {
        this.setState({
            ...this.state,
            loading: value
        })
    }


    render() {
        const { user, loading, currentCompany, companies, uid } = this.state;

        return (
            <AppContext.Provider
                value={{
                    user,
                    uid,
                    currentCompany,
                    companies,
                    // projects,
                    loading,
                    setLoading: this.setLoading,
                    setUser: this.setUser,
                    setCurrentCompany: this.setCurrentCompany,
                    setCompanies: this.setCompanies,
                    // setProjects: this.setProjects,
                    setUID: this.setUID,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default withRouter(MyProvider)