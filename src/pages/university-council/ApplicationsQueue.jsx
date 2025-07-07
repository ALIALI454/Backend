import React, { useState, useEffect } from 'react';
import { Table, Tag, Card, Statistic, Button, Input } from 'antd';
import {
  SearchOutlined,
  FileSearchOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ApplicationsQueue = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch applications data
    // Kuiga simu ya API kupata data za maombi
    setTimeout(() => {
      setApplications([
        {
          id: 'UC-2023-001',
          name: 'Dr. Asha Said',
          currentPosition: 'Senior Lecturer',
          appliedPosition: 'Associate Professor',
          department: 'Computer Science',
          faculty: 'Computing and IT',
          status: 'Pending',
          date: '2023-05-15',
          daysInQueue: 5
        },
        {
          id: 'UC-2023-002',
          name: 'Prof. John Mwamba',
          currentPosition: 'Associate Professor',
          appliedPosition: 'Professor',
          department: 'Mathematics',
          faculty: 'Science',
          status: 'Under Review',
          date: '2023-05-18',
          daysInQueue: 2,
          reviewer: 'Prof. Sarah Johnson'
        },
        {
          id: 'UC-2023-003',
          name: 'Dr. Fatma Rajab',
          currentPosition: 'Lecturer',
          appliedPosition: 'Senior Lecturer',
          department: 'Education',
          faculty: 'Humanities',
          status: 'Pending',
          date: '2023-05-20',
          daysInQueue: 3
        },
        {
          id: 'UC-2023-004',
          name: 'Dr. Robert Kimambo',
          currentPosition: 'Senior Lecturer',
          appliedPosition: 'Associate Professor',
          department: 'Physics',
          faculty: 'Science',
          status: 'Completed',
          date: '2023-05-10',
          decision: 'Approved' // Example of a completed application
        },
        { // New Application 1
          id: 'UC-2023-005',
          name: 'Dr. Neema Charles',
          currentPosition: 'Assistant Lecturer',
          appliedPosition: 'Lecturer',
          department: 'Chemistry',
          faculty: 'Science',
          status: 'Pending',
          date: '2023-05-22',
          daysInQueue: 1
        },
        { // New Application 2
          id: 'UC-2023-006',
          name: 'Mr. Daniel Juma',
          currentPosition: 'Lecturer',
          appliedPosition: 'Senior Lecturer',
          department: 'Law',
          faculty: 'Law',
          status: 'Under Review',
          date: '2023-05-19',
          daysInQueue: 4,
          reviewer: 'Dr. Emily Mcharo'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchText.toLowerCase()) ||
    app.department.toLowerCase().includes(searchText.toLowerCase()) ||
    app.faculty.toLowerCase().includes(searchText.toLowerCase()) ||
    app.id.toLowerCase().includes(searchText.toLowerCase()) // Allow searching by ID
  );

  const columns = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (id) => <Tag color="blue">{id}</Tag>,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Applicant Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Current Position',
      dataIndex: 'currentPosition',
      key: 'currentPosition',
      width: 180,
      sorter: (a, b) => a.currentPosition.localeCompare(b.currentPosition),
    },
    {
      title: 'Applied Position',
      dataIndex: 'appliedPosition',
      key: 'appliedPosition',
      width: 180,
      sorter: (a, b) => a.appliedPosition.localeCompare(b.appliedPosition),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 150,
      filters: [
        { text: 'Computer Science', value: 'Computer Science' },
        { text: 'Mathematics', value: 'Mathematics' },
        { text: 'Education', value: 'Education' },
        { text: 'Physics', value: 'Physics' },
        { text: 'Chemistry', value: 'Chemistry' }, // Added new filter
        { text: 'Law', value: 'Law' },           // Added new filter
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
      width: 150,
      filters: [
        { text: 'Computing and IT', value: 'Computing and IT' },
        { text: 'Science', value: 'Science' },
        { text: 'Humanities', value: 'Humanities' },
        { text: 'Law', value: 'Law' }, // Added new filter
        { text: 'Pure and Applied Sciences', value: 'Pure and Applied Sciences' }, // From ApplicationDetails
      ],
      onFilter: (value, record) => record.faculty === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status, record) => (
        <Tag
          color={status === 'Pending' ? 'orange' : status === 'Under Review' ? 'blue' : 'green'}
          icon={status === 'Pending' ? <ClockCircleOutlined /> : null}
        >
          {status}
          {status === 'Under Review' && record.reviewer && (
            <div style={{ fontSize: '0.8em', marginTop: 4 }}>
              ({record.reviewer})
            </div>
          )}
          {status === 'Completed' && record.decision && (
            <div style={{ fontSize: '0.8em', marginTop: 4 }}>
              ({record.decision})
            </div>
          )}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Under Review', value: 'Under Review' },
        { text: 'Completed', value: 'Completed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Days in Queue',
      dataIndex: 'daysInQueue',
      key: 'daysInQueue',
      width: 120,
      render: (days) => days ? `${days} days` : '-',
      sorter: (a, b) => (a.daysInQueue || 0) - (b.daysInQueue || 0),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<FileSearchOutlined />}
          onClick={() => navigate(`/university-council/application-details/${record.id}`)}
          size="small"
        >
          Review
        </Button>
      ),
    },
  ];

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Pending').length,
    underReview: applications.filter(a => a.status === 'Under Review').length,
    completed: applications.filter(a => a.status === 'Completed').length
  };

  return (
    <div className="applications-queue" style={{ padding: 24 }}>
      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Promotion Applications Queue</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: '#666', margin: 0 }}>Review and process faculty promotion applications</p>
          <Input
            placeholder="Search applications..."
            prefix={<SearchOutlined />}
            style={{ width: 300, minWidth: 200 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            allowClear
          />
        </div>
      </div>

      <div className="stats-row" style={{ marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <Card hoverable>
            <Statistic
              title="Total Applications"
              value={stats.total}
              prefix={<FileSearchOutlined />}
            />
          </Card>
          <Card hoverable>
            <Statistic
              title="Pending Review"
              value={stats.pending}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
          <Card hoverable>
            <Statistic
              title="Under Review"
              value={stats.underReview}
              valueStyle={{ color: '#1890ff' }}
              prefix={<EyeOutlined />}
            />
          </Card>
          <Card hoverable>
            <Statistic
              title="Completed"
              value={stats.completed}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </div>
      </div>

      <Card
        title="Applications List"
        bodyStyle={{ padding: 0 }}
        extra={
          // This button currently navigates to the same page.
          // You might want to change its purpose, e.g., to filter all applications,
          // or remove it if it's redundant. For now, it remains as per your original code.
          <Button
            type="link"
            icon={<FileSearchOutlined />}
            onClick={() => navigate('/university-council/applications')}
          >
            View All Applications
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredApplications}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} applications`
          }}
          scroll={{ x: 1300 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default ApplicationsQueue;
