import React from 'react';
import { Table, Button, Card, DatePicker, Space, Typography } from 'antd';
import { DownloadOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const ReviewReport = () => {
  const reports = [
    {
      key: '1',
      name: 'Dr. Asha Said',
      currentPosition: 'Lecturer',
      appliedPosition: 'Senior Lecturer',
      department: 'Computer Science',
      status: 'Approved',
      reviewedBy: 'Prof. Smith',
      reviewDate: '2023-05-20',
    },
    {
      key: '2',
      name: 'Prof. John Doe',
      currentPosition: 'Senior Lecturer',
      appliedPosition: 'Associate Professor',
      department: 'Mathematics',
      status: 'Approved',
      reviewedBy: 'Prof. Johnson',
      reviewDate: '2023-05-18',
    },
    {
      key: '3',
      name: 'Dr. Mariam Ali',
      currentPosition: 'Associate Professor',
      appliedPosition: 'Full Professor',
      department: 'Physics',
      status: 'Rejected',
      reviewedBy: 'Prof. Williams',
      reviewDate: '2023-05-15',
    },
    {
      key: '4',
      name: 'Mr. Joseph Kamau',
      currentPosition: 'Assistant Lecturer',
      requestType: 'Department Transfer',
      department: 'Education',
      status: 'Approved',
      reviewedBy: 'Prof. Brown',
      reviewDate: '2023-05-12',
    },
    {
      key: '5',
      name: 'Ms. Fatma Suleiman',
      currentPosition: 'Temporary Lecturer',
      requestType: 'Permanent Contract',
      department: 'Languages',
      status: 'Approved',
      reviewedBy: 'Prof. Davis',
      reviewDate: '2023-05-10',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current Position',
      dataIndex: 'currentPosition',
      key: 'currentPosition',
    },
    {
      title: 'Applied Position/Request',
      dataIndex: 'appliedPosition',
      key: 'appliedPosition',
      render: (text, record) => text || record.requestType,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded ${
          status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Reviewed By',
      dataIndex: 'reviewedBy',
      key: 'reviewedBy',
    },
    {
      title: 'Review Date',
      dataIndex: 'reviewDate',
      key: 'reviewDate',
    },
  ];

  const handleDownload = (format) => {
    console.log(`Downloading report in ${format} format`);
  };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <div className="flex justify-between items-center">
          <Title level={4} className="mb-0">Review Reports</Title>
          <Space>
            <RangePicker />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload('all')}
            >
              Download Report
            </Button>
          </Space>
        </div>
      </Card>

      <Card>
        <div className="flex justify-end mb-4 space-x-2">
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => handleDownload('pdf')}
          >
            PDF
          </Button>
          <Button
            icon={<FileExcelOutlined />}
            onClick={() => handleDownload('excel')}
          >
            Excel
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={reports}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ReviewReport;