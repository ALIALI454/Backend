import React, { useState } from 'react';
import { Table, Button, Modal, Tag, message, Badge, Divider } from 'antd';
import { MailOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const FinalizeAndNotify = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const applications = [
    {
      key: '1',
      id: 'APP-2023-001',
      name: 'Dr. Asha Said',
      position: 'Senior Lecturer',
      department: 'Computer Science',
      decision: 'Approved',
      notified: false,
      decisionDate: '2023-06-15',
    },
    {
      key: '2',
      id: 'APP-2023-002',
      name: 'Prof. John Doe',
      position: 'Associate Professor',
      department: 'Mathematics',
      decision: 'Approved',
      notified: false,
      decisionDate: '2023-06-16',
    },
    {
      key: '3',
      id: 'APP-2023-003',
      name: 'Dr. Mariam Ali',
      position: 'Full Professor',
      department: 'Education',
      decision: 'Rejected',
      notified: false,
      decisionDate: '2023-06-17',
    },
    {
      key: '4',
      id: 'APP-2023-004',
      name: 'Mr. Joseph Kamau',
      request: 'Department Transfer',
      department: 'Physics',
      decision: 'Approved',
      notified: true,
      decisionDate: '2023-06-10',
    },
    {
      key: '5',
      id: 'APP-2023-005',
      name: 'Ms. Fatma Suleiman',
      request: 'Permanent Contract',
      department: 'Biology',
      decision: 'Approved',
      notified: true,
      decisionDate: '2023-06-12',
    },
  ];

  const columns = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span className="font-medium">{text}</span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Position/Request',
      dataIndex: 'position',
      key: 'position',
      render: (text, record) => text || record.request,
    },
    {
      title: 'Decision',
      dataIndex: 'decision',
      key: 'decision',
      render: (decision) => (
        <Tag 
          color={decision === 'Approved' ? 'green' : 'red'} 
          icon={decision === 'Approved' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {decision}
        </Tag>
      ),
    },
    {
      title: 'Decision Date',
      dataIndex: 'decisionDate',
      key: 'decisionDate',
    },
    {
      title: 'Notification Status',
      dataIndex: 'notified',
      key: 'notified',
      render: (notified) => (
        <Badge 
          status={notified ? 'success' : 'warning'} 
          text={notified ? 'Sent' : 'Pending'} 
        />
      ),
    },
  ];

  const handleSendNotifications = () => {
    setIsModalVisible(true);
  };

  const handleConfirmNotifications = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success(`Notifications sent to ${selectedRows.length} applicants`);
      setIsModalVisible(false);
      setSelectedRows([]);
      setLoading(false);
    }, 1500);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(row => row.key),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows.filter(row => !row.notified));
    },
    getCheckboxProps: (record) => ({
      disabled: record.notified,
    }),
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Finalize & Notify Applicants</h2>
          <p className="text-gray-600">Send official notifications about promotion decisions</p>
        </div>
        <Button
          type="primary"
          icon={<MailOutlined />}
          disabled={selectedRows.length === 0}
          onClick={handleSendNotifications}
          loading={loading}
        >
          Send Notifications ({selectedRows.length})
        </Button>
      </div>

      <Divider />

      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={applications}
        pagination={{ pageSize: 10 }}
        rowClassName={(record) => record.notified ? 'opacity-75' : ''}
      />

      <Modal
        title={<span className="text-lg font-semibold">Confirm Notification Delivery</span>}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleConfirmNotifications}
            loading={loading}
            icon={<MailOutlined />}
          >
            Confirm & Send
          </Button>,
        ]}
        width={700}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            You are about to send official notifications to the following {selectedRows.length} applicants:
          </p>
          
          <div className="max-h-64 overflow-y-auto border rounded p-4">
            <ul className="divide-y">
              {selectedRows.map((row) => (
                <li key={row.key} className="py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{row.name}</span>
                    <Tag color={row.decision === 'Approved' ? 'green' : 'red'}>
                      {row.decision}
                    </Tag>
                  </div>
                  <div className="text-sm text-gray-600">
                    {row.position || row.request} • {row.department}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Divider />

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Notification Preview:</h4>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Subject: Decision on Your Application</p>
              <Divider className="my-2" />
              <p>Dear [Applicant's Name],</p>
              <p className="my-2">
                We are writing to inform you that after careful consideration, your application for 
                <span className="font-medium"> [Position/Request]</span> has been 
                <span className={selectedRows[0]?.decision === 'Approved' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {' '}{selectedRows[0]?.decision || 'processed'}.
                </span>
              </p>
              {selectedRows[0]?.decision === 'Approved' ? (
                <p className="my-2">Congratulations on this achievement! HR will contact you shortly regarding the next steps.</p>
              ) : (
                <p className="my-2">While we appreciate your application, we are unable to approve it at this time. You may reapply after 12 months.</p>
              )}
              <p className="my-2">Should you have any questions, please contact the HR department.</p>
              <p className="mt-4">Sincerely,</p>
              <p>The University Promotion Committee</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>Note: Each applicant will receive a personalized version of this notification.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinalizeAndNotify;