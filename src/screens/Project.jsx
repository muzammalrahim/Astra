import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'antd';
import AppContext from '../context/AppContext';
import firebase from 'firebase/app';
import { List, Button, notification } from 'antd';
import { Form, Input } from 'antd';


const Project = () => {
    const db = firebase.firestore();
    const { currentCompany, companies, uid, user, setCompanies, setCurrentCompany } = useContext(AppContext);
    const [projectModel, setProjectModel] = useState(false);
    const [projects, setProjects] = useState([])
    const onFinish = async (values) => {
        const index = currentCompany?.projects?.findIndex((pro) => pro.projectName === values?.projectName);
        if (!index || index === -1) {
            const companyIndex = companies.findIndex((comp) => comp.companyName === currentCompany?.companyName);
            const allCompanies = companies;
            allCompanies[companyIndex] = { ...allCompanies?.[companyIndex], projects: [...allCompanies?.[companyIndex]?.projects || [], values] };
            await db.collection('users').doc(uid).set({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                profileComplete: true,
                companies: [...allCompanies] || []
            }).then(() => {
                setCompanies([...allCompanies || []])
                setProjects([...allCompanies?.[companyIndex]?.projects] || [])
                setCurrentCompany({ ...allCompanies?.[companyIndex] } || {})
                setProjectModel(false)
            });
        } else {
            notification.info({ message: `${values?.projectName} is already exist` })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        setProjects(currentCompany?.projects || [])
    }, [currentCompany?.projects]);

    return (
        <div className="site-card-wrapper">
            <h2 className="someText">Projects for {currentCompany?.companyName}</h2>
            <Button onClick={() => { setProjectModel(true) }}>Add Project</Button>
            <List
                itemLayout="horizontal"
                dataSource={[...projects] || []}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={item?.projectName}
                            description={item?.description}
                        />
                    </List.Item>
                )}
            />
            <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                visible={projectModel}
                style={{ zIndex: 0 }}
                centered
                className='custom'
                onCancel={() => {
                    setProjectModel(false);
                }}>
                <h2>Add Project</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Project Name"
                        name="projectName"
                        rules={[{ required: true, message: 'Please input Company Name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input Company Email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Project;