import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  message,
  Descriptions,
  Divider,
  List
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submittedFeedback, setSubmittedFeedback] = useState([]);

  const onFinish = (values) => {
    console.log('Feedback submitted:', values);
    setSubmittedFeedback([...submittedFeedback, values.feedback]);
    message.success('Feedback submitted successfully!');
    form.resetFields();
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title={`Feedback for Application ${id}`}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Applicant">Dr. Asha Said</Descriptions.Item>
          <Descriptions.Item label="Application Status">
            <span style={{ color: '#52c41a' }}>Approved</span>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <h3>Provide Feedback</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="feedback"
            label="Feedback Comments"
            rules={[{ required: true, message: 'Please provide feedback' }]}
          >
            <TextArea rows={4} placeholder="Enter detailed feedback for the applicant" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Submit Feedback
            </Button>
            <Button onClick={() => navigate(-1)}>
              Back to Application
            </Button>
          </Form.Item>
        </Form>

        {submittedFeedback.length > 0 && (
          <>
            <Divider />
            <h3>Previous Feedback</h3>
            <List
              dataSource={submittedFeedback}
              renderItem={(item, index) => (
                <List.Item>
                  <p><strong>Feedback #{index + 1}:</strong> {item}</p>
                </List.Item>
              )}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default Feedback;