import React from 'react';
import { Menu, Layout, Row, Col } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Dashboard', 'dashboard', <DesktopOutlined />),
  getItem('Projects', 'projects', <PieChartOutlined />),
];

const SideBar = () => {
  const history = useHistory()
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);
  const onClick = e => {
    history.push(e.key)
  };
  return (
    <Sider className="adjust-sidebar-width"
      breakpoint="lg"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <Row>
          <Col className="dashboard-etn"
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h3 className="etn">
              Astra Tech Pixal
            </h3>
          </Col>
        </Row>
      </div>
      <div className="sidebar-theme">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          onClick={onClick}
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </Sider>
  );
};

export default SideBar;