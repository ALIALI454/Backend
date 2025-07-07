import React from 'react';
import { Card, Row, Col, Statistic, Button, Space, Typography } from 'antd';
import {
  FileDoneOutlined,
  NotificationOutlined,
  FileSearchOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const HrBoardDashboard = () => {
  const stats = [
    { title: 'Applications Received', value: 24, icon: <FileDoneOutlined />, color: '#1890ff' },
    { title: 'Pending Review', value: 8, icon: <ClockCircleOutlined />, color: '#faad14' },
    { title: 'Forwarded to Council', value: 12, icon: <TeamOutlined />, color: '#52c41a' },
    { title: 'Finalized', value: 4, icon: <FileDoneOutlined />, color: '#722ed1' },
  ];

  const quickActions = [
    { name: 'Approval Queue', icon: <FileSearchOutlined />, link: '/hr/approval-queue' },
    { name: 'Finalize & Notify', icon: <NotificationOutlined />, link: '/hr/finalize' },
    { name: 'Review Report', icon: <FileSearchOutlined />, link: '/hr/reports' },
  ];

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">HR Board Dashboard</Title>
      
      <Row gutter={16} className="mb-6">
        {stats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Quick Actions" className="mb-6">
        <Space size="large">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              type="primary"
              icon={action.icon}
              size="large"
              onClick={() => console.log(`Navigating to ${action.link}`)}
            >
              {action.name}
            </Button>
          ))}
        </Space>
      </Card>

      <Card title="Reminders">
        <div className="space-y-2">
          <div className="flex items-center text-yellow-600">
            <ClockCircleOutlined className="mr-2" />
            <span>3 applications pending review</span>
          </div>
          <div className="flex items-center text-blue-600">
            <NotificationOutlined className="mr-2" />
            <span>5 decisions need to be finalized</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HrBoardDashboard;