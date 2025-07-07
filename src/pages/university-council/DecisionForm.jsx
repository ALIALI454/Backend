import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Typography,
  message,
  Descriptions,
  Divider,
  Spin,
  Alert,
  Tag // <--- Tag component is imported here
} from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  CheckOutlined // <--- CheckOutlined icon is imported here
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const DecisionForm = () => {
  const [form] = Form.useForm();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the 'decision' query parameter from the URL
  const initialDecision = new URLSearchParams(location.search).get('decision');

  useEffect(() => {
    // Simulate API call to fetch specific application details for the form
    setTimeout(() => {
      const sampleData = {
        'UC-2023-001': {
          id: 'UC-2023-001',
          name: 'Dr. Asha Said',
          appliedPosition: 'Associate Professor',
          department: 'Computer Science'
        },
        'UC-2023-002': {
          id: 'UC-2023-002',
          name: 'Prof. Benjamin Kipande', // Updated name to match ApplicationDetails for consistency
          appliedPosition: 'Professor',
          department: 'Mathematics' // Updated department to match ApplicationDetails for consistency
        },
        'UC-2023-003': {
          id: 'UC-2023-003',
          name: 'Dr. Fatma Rajab',
          appliedPosition: 'Senior Lecturer',
          department: 'Education'
        },
        'UC-2023-004': {
          id: 'UC-2023-004',
          name: 'Dr. Robert Kimambo',
          appliedPosition: 'Associate Professor',
          department: 'Physics'
        },
        'UC-2023-005': { // New Application 1
          id: 'UC-2023-005',
          name: 'Dr. Neema Charles',
          appliedPosition: 'Lecturer',
          department: 'Chemistry'
        },
        'UC-2023-006': { // New Application 2
          id: 'UC-2023-006',
          name: 'Mr. Daniel Juma',
          appliedPosition: 'Senior Lecturer',
          department: 'Law'
        }
      };

      const found = sampleData[id];
      setApplication(found);
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    // Set the initial form value for 'decision' based on the URL query parameter
    if (initialDecision) {
      form.setFieldsValue({
        decision: initialDecision === 'approve' ? 'approved' : 'rejected'
      });
    }
  }, [initialDecision, form]); // form is a dependency because setFieldsValue depends on it

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      // Simulate API call for submission
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      message.success('Decision submitted successfully!');
      // Navigate to the feedback page, passing decision and comments via state
      navigate(`/university-council/feedback/${id}`, {
        state: { decision: values.decision, comments: values.comments }
      });
    } catch (error) {
      message.error('Failed to submit decision. Please try again.');
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <Spin size="large" tip="Loading application details..." />
      </div>
    );
  }

  if (!application) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <Alert
          message="Application Not Found"
          description="Could not load details for this application ID."
          type="error"
          showIcon
        />
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/university-council/applications')}
          style={{ marginTop: 20 }}
        >
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(`/university-council/application-details/${id}`)}
        style={{ marginBottom: 16 }}
      >
        Back to Application Details
      </Button>

      <Card
        title={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <CheckOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            Finalize Decision for Application ID: <Tag color="blue" style={{ marginLeft: 8, fontSize: 16 }}>{application.id}</Tag>
          </span>
        }
        hoverable
        bordered
      >
        <div style={{ padding: '16px 0' }}>
          <Title level={4} style={{ marginBottom: 16, textAlign: 'center' }}>
            Applicant: {application.name}
          </Title>
          <Descriptions bordered column={1} style={{ marginBottom: 24 }} size="middle">
            <Descriptions.Item label="Applied Position">
              <Text strong>{application.appliedPosition}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              <Text>{application.department}</Text>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <Divider orientation="left">Your Decision</Divider>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            // This is just a fallback, initialDecision in useEffect will override this if present
            decision: initialDecision === 'approve' ? 'approved' : (initialDecision === 'reject' ? 'rejected' : undefined)
          }}
        >
          <Form.Item
            name="decision"
            label={<Text strong>Decision</Text>}
            rules={[{ required: true, message: 'Please select a decision' }]}
          >
            <Select placeholder="Select decision" size="large">
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="comments"
            label={<Text strong>Decision Comments</Text>}
            rules={[{ required: true, message: 'Please provide comments regarding your decision.' }]}
          >
            <TextArea rows={6} placeholder="Provide detailed comments, reasons for approval/rejection, or any conditions..." />
          </Form.Item>

          <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
            <Button
              style={{ marginRight: 12 }}
              onClick={() => navigate(`/university-council/application-details/${id}`)}
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              icon={<CheckOutlined />}
              size="large"
            >
              {submitting ? 'Submitting...' : 'Submit Decision'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DecisionForm;
