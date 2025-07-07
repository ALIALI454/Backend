import React, { useState } from 'react';
import { Table, Button, Tag, Modal, Input } from 'antd';
import { SearchOutlined, EyeOutlined, ForwardOutlined } from '@ant-design/icons';

const ApprovalQueue = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [searchText, setSearchText] = useState('');

  const applications = [
    {
      key: '1',
      name: 'Dr. Asha Said',
      currentPosition: 'Lecturer',
      appliedPosition: 'Senior Lecturer',
      department: 'Computer Science',
      date: '2023-05-15',
      status: 'Pending',
    },
    {
      key: '2',
      name: 'Prof. John Doe',
      currentPosition: 'Senior Lecturer',
      appliedPosition: 'Associate Professor',
      department: 'Mathematics',
      date: '2023-05-18',
      status: 'Pending',
    },
    {
      key: '3',
      name: 'Dr. Mariam Ali',
      currentPosition: 'Associate Professor',
      appliedPosition: 'Full Professor',
      department: 'Physics',
      date: '2023-05-20',
      status: 'Pending',
    },
    {
      key: '4',
      name: 'Mr. Joseph Kamau',
      currentPosition: 'Assistant Lecturer',
      department: 'Education',
      date: '2023-05-22',
      status: 'Pending',
      requestType: 'Department Transfer',
    },
    {
      key: '5',
      name: 'Ms. Fatma Suleiman',
      currentPosition: 'Temporary Lecturer',
      department: 'Languages',
      date: '2023-05-25',
      status: 'Pending',
      requestType: 'Permanent Contract',
    },
  ];

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchText.toLowerCase()) ||
    app.department.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Pending' ? 'orange' : 'green'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentApplication(record);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
          <Button
            type="primary"
            icon={<ForwardOutlined />}
            onClick={() => handleForward(record.key)}
          >
            Forward
          </Button>
        </div>
      ),
    },
  ];

  const handleForward = (key) => {
    // Logic to forward application
    console.log('Forwarding application:', key);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Approval Queue</h2>
        <Input
          placeholder="Search applications..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredApplications}
        pagination={{ pageSize: 5 }}
      />

      <div className="mt-4 flex justify-end space-x-4">
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={() => handleForward(selectedRowKeys)}
        >
          Forward Selected to Council
        </Button>
      </div>

      <Modal
        title="Application Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="forward"
            type="primary"
            onClick={() => {
              handleForward(currentApplication?.key);
              setIsModalVisible(false);
            }}
          >
            Forward to Council
          </Button>,
        ]}
      >
        {currentApplication && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Applicant:</h3>
              <p>{currentApplication.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Current Position:</h3>
              <p>{currentApplication.currentPosition}</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {currentApplication.appliedPosition ? 'Applied Position:' : 'Request Type:'}
              </h3>
              <p>{currentApplication.appliedPosition || currentApplication.requestType}</p>
            </div>
            <div>
              <h3 className="font-semibold">Department:</h3>
              <p>{currentApplication.department}</p>
            </div>
            <div>
              <h3 className="font-semibold">Application Date:</h3>
              <p>{currentApplication.date}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status:</h3>
              <Tag color={currentApplication.status === 'Pending' ? 'orange' : 'green'}>
                {currentApplication.status}
              </Tag>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovalQueue;