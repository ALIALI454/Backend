import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Typography, 
  Button, 
  DatePicker, 
  Select, 
  Row, 
  Col,
  Statistic,
  Tag,
  message,
  Space,
  Alert
} from 'antd';
import { 
  DownloadOutlined, 
  FilePdfOutlined, 
  FileExcelOutlined,
  FilterOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ReviewSummary = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: null,
    decisionType: 'all',
    department: 'all'
  });
  const [exportLoading, setExportLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDecisions([
        {
          id: 'UC-2023-001',
          name: 'Dr. Asha Said',
          appliedPosition: 'Associate Professor',
          department: 'Computer Science',
          decision: 'approved',
          decisionBy: 'Prof. James Mwambene',
          date: '2023-05-20',
          comments: 'Excellent research portfolio and teaching evaluations'
        },
        {
          id: 'UC-2023-002',
          name: 'Prof. John Mwamba',
          appliedPosition: 'Professor',
          department: 'Mathematics',
          decision: 'approved',
          decisionBy: 'Prof. Sarah Johnson',
          date: '2023-05-18',
          comments: 'Outstanding contributions to the field'
        },
        {
          id: 'UC-2023-003',
          name: 'Dr. Fatma Rajab',
          appliedPosition: 'Senior Lecturer',
          department: 'Education',
          decision: 'rejected',
          decisionBy: 'Prof. James Mwambene',
          date: '2023-05-15',
          comments: 'Needs more publications for this level'
        },
        {
          id: 'UC-2023-004',
          name: 'Dr. Robert Kimambo',
          appliedPosition: 'Associate Professor',
          department: 'Physics',
          decision: 'approved',
          decisionBy: 'Prof. Sarah Johnson',
          date: '2023-06-02',
          comments: 'Strong international collaborations'
        },
        {
          id: 'UC-2023-005',
          name: 'Dr. Amina Juma',
          appliedPosition: 'Senior Lecturer',
          department: 'Biology',
          decision: 'rejected',
          decisionBy: 'Prof. Michael Kato',
          date: '2023-06-10',
          comments: 'Teaching portfolio needs improvement'
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleExport = (format) => {
    setExportLoading(true);
    message.loading({ content: `Preparing ${format} export...`, key: 'export', duration: 2 });
    
    // Simulate export generation
    setTimeout(() => {
      message.success({ 
        content: (
          <span>
            Successfully generated <strong>{format}</strong> report with {filteredDecisions.length} records
          </span>
        ), 
        key: 'export',
        duration: 3 
      });
      setExportLoading(false);
    }, 2000);
  };

  const filteredDecisions = decisions.filter(decision => {
    // Filter by date range
    if (filters.dateRange && filters.dateRange.length === 2) {
      const decisionDate = new Date(decision.date);
      const startDate = new Date(filters.dateRange[0]);
      const endDate = new Date(filters.dateRange[1]);
      
      if (decisionDate < startDate || decisionDate > endDate) {
        return false;
      }
    }
    
    // Filter by decision type
    if (filters.decisionType !== 'all' && decision.decision !== filters.decisionType) {
      return false;
    }
    
    // Filter by department
    if (filters.department !== 'all' && decision.department !== filters.department) {
      return false;
    }
    
    return true;
  });

  const columns = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      fixed: 'left',
      render: (id) => <Tag color="blue">{id}</Tag>,
    },
    {
      title: 'Applicant Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
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
        { text: 'Biology', value: 'Biology' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Decision',
      dataIndex: 'decision',
      key: 'decision',
      render: decision => (
        <Tag 
          color={decision === 'approved' ? 'green' : 'red'}
          icon={decision === 'approved' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          style={{ fontWeight: 500 }}
        >
          {decision.toUpperCase()}
        </Tag>
      ),
      width: 120,
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.decision === value,
    },
    {
      title: 'Decided By',
      dataIndex: 'decisionBy',
      key: 'decisionBy',
      width: 180,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Button 
          type="link"
          onClick={() => navigate(`/university-council/application/${record.id}`)}
          style={{ padding: 0 }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const stats = {
    total: decisions.length,
    approved: decisions.filter(d => d.decision === 'approved').length,
    rejected: decisions.filter(d => d.decision === 'rejected').length,
    thisMonth: decisions.filter(d => {
      const decisionDate = new Date(d.date);
      const currentDate = new Date();
      return decisionDate.getMonth() === currentDate.getMonth() && 
             decisionDate.getFullYear() === currentDate.getFullYear();
    }).length
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: null,
      decisionType: 'all',
      department: 'all'
    });
    message.success('All filters have been reset');
  };

  return (
    <div className="review-summary" style={{ padding: 24 }}>
      <div className="page-header" style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 0 }}>Promotion Decisions Review</Title>
        <Text type="secondary">Comprehensive summary of all promotion decisions</Text>
      </div>

      <Alert
        message="Review Summary Dashboard"
        description="View and analyze all promotion decisions made by the University Council"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Total Decisions" 
              value={stats.total} 
              prefix={<FilePdfOutlined />}
              valueStyle={{ fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Approved" 
              value={stats.approved} 
              valueStyle={{ color: '#52c41a', fontSize: 24 }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="Rejected" 
              value={stats.rejected} 
              valueStyle={{ color: '#f5222d', fontSize: 24 }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} hoverable>
            <Statistic 
              title="This Month" 
              value={stats.thisMonth} 
              prefix={<DownloadOutlined />}
              valueStyle={{ fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title={
          <Space>
            <FilterOutlined style={{ color: '#1890ff' }} />
            <Text strong>Filter Options</Text>
          </Space>
        }
        style={{ marginBottom: 24 }}
        extra={
          <Button 
            icon={<ReloadOutlined />}
            onClick={handleResetFilters}
            type="text"
          >
            Reset Filters
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Date Range</Text>
            <RangePicker 
              style={{ width: '100%' }}
              value={filters.dateRange}
              onChange={(dates) => setFilters({...filters, dateRange: dates})}
              allowClear
            />
          </Col>
          <Col xs={24} md={8}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Decision Type</Text>
            <Select
              style={{ width: '100%' }}
              value={filters.decisionType}
              onChange={(value) => setFilters({...filters, decisionType: value})}
              allowClear
            >
              <Option value="all">All Decisions</Option>
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Department</Text>
            <Select
              style={{ width: '100%' }}
              value={filters.department}
              onChange={(value) => setFilters({...filters, department: value})}
              allowClear
            >
              <Option value="all">All Departments</Option>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Education">Education</Option>
              <Option value="Physics">Physics</Option>
              <Option value="Biology">Biology</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <Space>
            <FilePdfOutlined />
            <Text strong>Decision Records</Text>
            <Tag color="blue">{filteredDecisions.length} records</Tag>
          </Space>
        }
        extra={
          <Space>
            <Button 
              type="primary" 
              icon={<FilePdfOutlined />}
              onClick={() => handleExport('PDF')}
              loading={exportLoading}
            >
              Export PDF
            </Button>
            <Button 
              type="primary" 
              icon={<FileExcelOutlined />}
              onClick={() => handleExport('Excel')}
              loading={exportLoading}
            >
              Export Excel
            </Button>
          </Space>
        }
        bodyStyle={{ padding: 0 }}
      >
        <Table 
          columns={columns} 
          dataSource={filteredDecisions} 
          loading={loading}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} decisions`,
          }}
          scroll={{ x: 1500 }}
          bordered
          size="middle"
          style={{ padding: 16 }}
        />
      </Card>
    </div>
  );
};

export default ReviewSummary;