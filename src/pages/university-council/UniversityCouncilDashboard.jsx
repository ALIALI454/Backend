import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Avatar, Button } from 'antd';
import { 
  FileSearchOutlined, 
  CheckCircleOutlined, 
  FileDoneOutlined,
  UserOutlined,
  ClockCircleOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const UniversityCouncilDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    completedThisWeek: 0,
    pendingReview: 0,
    overdueReviews: 2,
    recentActivity: 3
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalApplications: 24,
        completedThisWeek: 5,
        pendingReview: 3,
        overdueReviews: 2,
        recentActivity: 3
      });
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="council-dashboard" style={{ padding: 24 }}>
      <div className="welcome-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: 24,
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={64} 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: '#1890ff',
              marginRight: 16
            }} 
          />
          <div>
            <Title level={3} style={{ marginBottom: 0 }}>Welcome, Council Chairperson</Title>
            <Text type="secondary">University Promotion Review Portal</Text>
          </div>
        </div>
        <Button 
          type="primary" 
          icon={<FileSearchOutlined />}
          onClick={() => navigate('/university-council/applications')}
        >
          Go to Applications
        </Button>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Card 
          bordered={false}
          style={{ 
            backgroundColor: stats.overdueReviews > 0 ? '#fff1f0' : '#fffbe6',
            borderLeft: `4px solid ${stats.overdueReviews > 0 ? '#ff4d4f' : '#faad14'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AlertOutlined style={{ 
              fontSize: 24, 
              color: stats.overdueReviews > 0 ? '#ff4d4f' : '#faad14',
              marginRight: 16
            }} />
            <div>
              <Text strong style={{ fontSize: 16 }}>
                {stats.overdueReviews > 0 ? (
                  <>You have {stats.overdueReviews} overdue and {stats.pendingReview} pending reviews</>
                ) : stats.pendingReview > 0 ? (
                  <>You have {stats.pendingReview} applications pending review</>
                ) : (
                  <>All applications have been reviewed</>
                )}
              </Text>
              {stats.overdueReviews > 0 && (
                <div style={{ marginTop: 8 }}>
                  <Button 
                    type="primary" 
                    danger
                    onClick={() => navigate('/university-council/applications')}
                  >
                    Review Overdue Applications
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable loading={loading} onClick={() => navigate('/university-council/applications')}>
            <Statistic
              title="Total Applications"
              value={stats.totalApplications}
              prefix={<FileSearchOutlined />}
              valueStyle={{ fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable loading={loading} onClick={() => navigate('/university-council/review-summary')}>
            <Statistic
              title="Completed This Week"
              value={stats.completedThisWeek}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a', fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable loading={loading} onClick={() => navigate('/university-council/applications?status=Pending')}>
            <Statistic
              title="Pending Review"
              value={stats.pendingReview}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14', fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable loading={loading} onClick={() => navigate('/university-council/applications?status=Overdue')}>
            <Statistic
              title="Overdue Reviews"
              value={stats.overdueReviews}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#ff4d4f', fontSize: 28 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            onClick={() => navigate('/university-council/applications')}
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <FileSearchOutlined style={{ 
              fontSize: 48, 
              color: '#1890ff',
              marginBottom: 16
            }} />
            <Title level={4} style={{ marginBottom: 8 }}>Applications Queue</Title>
            <Text type="secondary" style={{ marginBottom: 16 }}>
              Review all submitted applications for promotion
            </Text>
            <Button type="primary" ghost>
              View Applications
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            onClick={() => navigate('/university-council/submit-decision')}
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <CheckCircleOutlined style={{ 
              fontSize: 48, 
              color: '#52c41a',
              marginBottom: 16
            }} />
            <Title level={4} style={{ marginBottom: 8 }}>Submit Decision</Title>
            <Text type="secondary" style={{ marginBottom: 16 }}>
              Finalize and submit your review decisions
            </Text>
            <Button type="primary" ghost>
              Submit Decision
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            onClick={() => navigate('/university-council/review-summary')}
            style={{ textAlign: 'center', height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <FileDoneOutlined style={{ 
              fontSize: 48, 
              color: '#722ed1',
              marginBottom: 16
            }} />
            <Title level={4} style={{ marginBottom: 8 }}>Review Summary</Title>
            <Text type="secondary" style={{ marginBottom: 16 }}>
              View all decisions made by the council
            </Text>
            <Button type="primary" ghost>
              View Summary
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityCouncilDashboard;