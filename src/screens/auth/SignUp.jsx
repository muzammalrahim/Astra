import React, { useState, useContext } from "react";
import { Row, Col, Button, notification } from "antd";
import { useHistory } from "react-router";
// import ahilLogo from "images/epayy.png";
import { Layout } from "antd";
import { Form, Input } from "antd";
import firebase from '../../services/firebase';
import AppContext from "../../context/AppContext";
const { Content } = Layout;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const SignUp = () => {
    const db = firebase.firestore();
    const history = useHistory();
    const { setUID, setUser, setCurrentCompany, setCompanies } = useContext(AppContext);
    const [form] = Form.useForm();
    const [formLayout] = useState("vertical");
    const formItemLayout =
        formLayout === "vertical"
            ? {
                labelCol: {
                    span: 24,
                },
                wrapperCol: {
                    span: 24,
                },
            }
            : null;
    const onFinish = async (data) => {
        try {
            const userCredential = await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password);
            await db.collection('users').doc(userCredential.user?.uid).set({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                profileComplete: false,
            });
            await setUser({ firstName: data?.firstName, lastName: data?.lastName, email: data?.email });
            await setUID(userCredential.user?.uid)
            history.push('/dashboard');
        } catch (error) {
            notification.error(error?.message || 'Something went wrong');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Layout className="kp-form-container">
            <Content className="kp-form-container-body center-elements-container">
                <Row className="adjust-width-100">
                    <Col span={9}></Col>
                    <Col span={6}
                    style={{
                        background: 'white',
                        padding: '20px',
                        margin: '50px 0'
                        }}
                    >
                        <div className="form-custom-style white-bg">
                            <Col>
                                <p className="login-text"
                                style={{fontWeight: '500'}}
                                >Sign up to your account</p>
                            </Col>
                            <Col span={24}>
                                <Form
                                    requiredMark={"optional"}
                                    {...layout}
                                    {...formItemLayout}
                                    layout={formLayout}
                                    form={form}
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                        layout: formLayout,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="First Name"
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your First Name!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter your First Name"
                                            size="large"
                                            className="userinputFields"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Last Name!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter your Last Name"
                                            size="large"
                                            className="userinputFields"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Email!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter Email"
                                            size="large"
                                            className="userinputFields"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Enter Password"
                                            size="large"
                                            className="userinputFields"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Enter Password"
                                            size="large"
                                            className="userinputFields"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="adjust-width-100 custom-button-style"
                                        >
                                            Sign Up
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </div>
                    </Col>
                    <Col span={9}></Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default SignUp;
