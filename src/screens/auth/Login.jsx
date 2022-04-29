import React, { useState, useContext } from "react";
import { Row, Col, Button} from "antd";
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

const Login = () => {
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
                .signInWithEmailAndPassword(data?.email, data?.password);
            const doc = (await db.collection('users').doc(userCredential?.user?.uid).get())
            var userData = doc?.data();
            userData.id = doc?.id;
            await setUID(userCredential?.user?.uid)
            sessionStorage.setItem("uid", userCredential?.user?.uid)
            await setUser({ firstName: userData?.firstName, lastName: userData?.lastName, email: userData?.email, profileComplete: userData?.profileComplete });
            await setCurrentCompany(userData?.companies?.[0] || []);
            await setCompanies(userData?.companies || []);
            // const profileComplete = userData?.profileComplete;
            window.location.assign('/#/dashboard')
            // history.push(profileComplete ? '/dashboard' : '/profile-wizard');
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Layout className="kp-form-container">
            <Content className="kp-form-container-body center-elements-container">
                <Content>
                <Row className="adjust-width-100" 
                style={{
                    height: '100vh',
                    verticalAlign: 'middle',
                  }}
                  >
                    <Col span={9}></Col>
                    <Col span={6}>
                        <div className="form-custom-style white-bg" 
                        style={{
                            background: 'white',
                            padding: '20px',
                            margin: '50px 0'
                            }}>
                            {/* <Col span={12}>
                <img src={ahilLogo} className="Ahli-Logo" alt="broken" />
              </Col> */}
                            <Col span={12}>
                                <p className="login-text">LOGIN</p>
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
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="adjust-width-100 custom-button-style"
                                        >
                                            LOGIN
                                        </Button>
                                        <Button
                                            type="secondary"
                                            htmlType="button"
                                            className="adjust-width-100 custom-button-style"
                                            style={{ marginLeft: '2em' }}
                                            onClick={() => { history.push("/signup") }}
                                        >
                                            SIGNUP
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </div>
                    </Col>
                    <Col span={9}></Col>
                </Row>
                </Content>
               
            </Content>
        </Layout>
    );
};

export default Login;
