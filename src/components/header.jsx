import React, { useState, useContext, useEffect } from 'react'
import { Layout, Menu, Modal, Button, Dropdown, Space, notification } from "antd";
import Logoutlogo from "../images/logout.png";
import {
  DownOutlined
} from '@ant-design/icons';
import AppContext from '../context/AppContext';
import { Form, Input } from 'antd';
import firebase from 'firebase';

const { Header } = Layout;

const Headerd = () => {
  const db = firebase.firestore();
  const [showLogout, setLogoutModal] = useState(false);
  const [companyModel, setCompanyModel] = useState(false);
  const { currentCompany, companies, setCurrentCompany, user, setUser, uid, setCompanies } = useContext(AppContext);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'
  }
  const handleCancel = () => {
    setLogoutModal(false);
  }
  const menu = (
    <>
      {
        companies?.map((company) => {
          return <Menu>
            <Menu.Item onClick={() => {
              setCurrentCompany(companies?.find(comp => comp.companyName === company?.companyName))
            }}>
              {company.companyName}
            </Menu.Item>
          </Menu>
        })
      }
      <Menu>
        <Menu.Item onClick={() => { setCompanyModel(true) }}>
          Add New
        </Menu.Item>
      </Menu>
    </>
  );
  const onFinish = async (values) => {
    const index = companies.findIndex((company) => company.companyName === values?.companyName);
    if (index === -1) {
      await db.collection('users').doc(uid).set({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        profileComplete: true,
        companies: [...companies, values] || []
      }).then(() => {
        setUser({ ...user, profileComplete: true });
        setCompanies([...companies, values])
        setCompanyModel(false)
      });
    } else {
      notification.info({ message: `${values?.companyName} is already exist` })
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (!(!!user?.profileComplete)) {
      setCompanyModel(true);
    }
  }, [user])
  return (
    <Header className="site-layout-background" style={{ padding: 0, }}>
      <Menu mode="horizontal" style={{ textAlign: "center", display: 'block', width: '100%' }} className="responsive-header">
        <Menu.Item key="5" style={{ pointerEvents: 'none' }}>
          <label style={{
            color: 'black',
            fontWeight: "bold",
            fontSize: "1vw"
          }}>Astra Tech Pixal</label>
        </Menu.Item>
        <Menu.Item key="4" style={{ float: 'right' }}>
          <img src={Logoutlogo} onClick={() => setLogoutModal(true)} className="user-Logo" alt="broken" />
        </Menu.Item>
        <Menu.Item key="3" style={{ float: 'right' }}>
          <Dropdown overlay={menu} placement="bottomLeft">
            <a onClick={e => e.preventDefault()}>
              <Space>
                {currentCompany?.companyName || "Add New Company"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="2" style={{ float: 'right' }}>
          <label style={{
            color: 'black',
            fontWeight: "bold",
            paddingLeft: "15px",
            fontSize: "15px"
          }}>
          </label>
        </Menu.Item>
      </Menu>
      <Modal
        title="Logout"
        visible={showLogout}
        onOk={handleLogout}
        onCancel={handleCancel}
        footer={[
          <Button key="1" onClick={() => handleCancel()} className="btn btn-default">Cancel</Button>,
          <Button key="2" onClick={() => handleLogout()} className="btn btn-primary">Yes</Button>,
        ]}
      >
        <p>{"Are you sure you want to logout"}</p>
      </Modal>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        visible={companyModel}
        style={{ zIndex: 0 }}
        centered
        className='custom'
        onCancel={() => {
          setCompanyModel(false);
        }}>
        <h2>Add Company</h2>
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
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: 'Please input Company Name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input Company Email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input Company Address!' }]}
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
    </Header>
  )
}
export default Headerd