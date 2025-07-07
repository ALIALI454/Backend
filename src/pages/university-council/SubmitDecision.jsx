import React from 'react';
import { 
  Card, 
  Descriptions, 
  Button, 
  Result,
  Divider,
  Steps
} from 'antd';
import { 
  CheckCircleOutlined,
  ArrowLeftOutlined,
  FilePdfOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';

const { Step } = Steps;

const SubmitDecision = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/university-council');
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title="Decision Successfully Submitted!"
          subTitle={`Application ID: ${id} has been processed and the decision has been recorded.`}
          extra={[
            <Button 
              type="primary" 
              key="dashboard" 
              onClick={handleBackToDashboard}
              style={{ marginRight: 8 }}
            >
              Back to Dashboard
            </Button>,
            <Button 
              key="print" 
              icon={<FilePdfOutlined />}
            >
              Print Decision Letter
            </Button>,
          ]}
        />

        <Divider />

        <Steps current={2} style={{ marginBottom: 24 }}>
          <Step title="Application Reviewed" />
          <Step title="Decision Made" />
          <Step title="Submitted" />
        </Steps>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Applicant">Dr. Asha Said</Descriptions.Item>
          <Descriptions.Item label="Decision">
            <span style={{ color: '#52c41a', fontWeight: 'bold' }}>Approved</span>
          </Descriptions.Item>
          <Descriptions.Item label="Effective Date">2023-09-01</Descriptions.Item>
          <Descriptions.Item label="Reviewer">Prof. Sarah Johnson</Descriptions.Item>
          <Descriptions.Item label="Comments">
            The applicant has demonstrated exceptional qualifications and meets all criteria for promotion.
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/university-council/applications')}
          >
            Back to Applications Queue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SubmitDecision;