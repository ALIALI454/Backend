import React, { useState } from 'react';
import { Table, Button, Modal, message, Tag } from 'antd';
import { ForwardOutlined, CheckCircleOutlined } from '@ant-design/icons';

const ForwardToCouncil = () => {
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const applications = [
    {
      key: '1',
      name: 'Dr. Asha Said',
      currentPosition: 'Lecturer',
      appliedPosition: 'Senior Lecturer',
      department: 'Computer Science',
      status: 'Pending HR Approval',
    },
    {
      key: '2',
      name: 'Prof. John Doe',
      currentPosition: 'Senior Lecturer',
      appliedPosition: 'Associate Professor',
      department: 'Mathematics',
      status: 'Pending HR Approval',
    },
    {
      key: '3',
      name: 'Dr. Mariam Ali',
      currentPosition: 'Associate Professor',
      appliedPosition: 'Full Professor',
      department: 'Physics',
      status: 'Pending HR Approval',
    },
    {
      key: '4',
      name: 'Mr. Joseph Kamau',
      currentPosition: 'Assistant Lecturer',
      department: 'Education',
      requestType: 'Department Transfer',
      status: 'Pending HR Approval',
    },
    {
      key: '5',
      name: 'Ms. Fatma Suleiman',
      currentPosition: 'Temporary Lecturer',
      department: 'Languages',
      requestType: 'Permanent Contract',
      status: 'Pending HR Approval',
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
        <Tag color="orange">{status}</Tag>
      ),
    },
  ];

  const handleForward = () => {
    setIsModalVisible(true);
  };

  const confirmForward = () => {
    message.success(`${selectedApplications.length} applications forwarded to Council successfully!`);
    setIsModalVisible(false);
    setSelectedApplications([]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Forward to University Council</h2>
        <Button
          type="primary"
          icon={<ForwardOutlined />}
          disabled={selectedApplications.length === 0}
          onClick={handleForward}
        >
          Forward Selected
        </Button>
      </div>

      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedApplications(selectedRows);
          },
        }}
        columns={columns}
        dataSource={applications}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Confirm Forwarding to Council"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={confirmForward}
          >
            Confirm Forward
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p>You are about to forward the following {selectedApplications.length} applications to the University Council:</p>
          <ul className="list-disc pl-5">
            {selectedApplications.map(app => (
              <li key={app.key}>
                {app.name} - {app.appliedPosition || app.requestType}
              </li>
            ))}
          </ul>
          <p className="font-semibold">This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ForwardToCouncil;