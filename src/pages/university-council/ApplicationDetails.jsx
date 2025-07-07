import React, { useState, useEffect } from 'react';
import {
  Card,
  Descriptions,
  Button,
  Divider,
  Table,
  Tag,
  Typography,
  Steps,
  message,
  Spin,
  Alert
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  FileTextOutlined,
  SolutionOutlined,
  BookOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Step } = Steps;

const ApplicationDetails = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch specific application details
    // Kuiga simu ya API kupata maelezo maalum ya maombi
    setTimeout(() => {
      // Sample data based on application ID
      // Data za mfano kulingana na kitambulisho cha maombi
      const sampleData = {
        'UC-2023-001': {
          id: 'UC-2023-001',
          name: 'Dr. Asha Said',
          email: 'asha.said@university.edu',
          phone: '+255 712 345 678',
          currentPosition: 'Senior Lecturer',
          appliedPosition: 'Associate Professor',
          department: 'Computer Science',
          faculty: 'Computing and IT',
          status: 'Pending Review',
          submissionDate: '2023-05-15',
          reviewDeadline: '2023-06-15',
          qualifications: [
            {
              id: 1,
              degree: 'PhD in Computer Science',
              institution: 'University of Dar es Salaam',
              year: '2015',
              specialization: 'Artificial Intelligence'
            },
            {
              id: 2,
              degree: 'MSc in Software Engineering',
              institution: 'University of Nairobi',
              year: '2010',
              specialization: 'Distributed Systems'
            },
            {
              id: 3,
              degree: 'BSc in Computer Science',
              institution: 'University of Dodoma',
              year: '2007',
              specialization: 'Information Systems'
            }
          ],
          experience: [
            {
              id: 1,
              position: 'Senior Lecturer',
              institution: 'University of Dodoma',
              duration: '2018 - Present',
              responsibilities: 'Teaching, Research, and Student Supervision'
            },
            {
              id: 2,
              position: 'Lecturer',
              institution: 'University of Dodoma',
              duration: '2015 - 2018',
              responsibilities: 'Teaching and Research'
            },
            {
              id: 3,
              position: 'Teaching Assistant',
              institution: 'University of Nairobi',
              duration: '2010 - 2012',
              responsibilities: 'Lab Instruction and Grading'
            }
          ],
          publications: [
            {
              id: 1,
              title: 'Machine Learning Applications in Healthcare',
              journal: 'African Journal of Computing',
              year: '2022',
              authors: 'Said, A., Mwamba, J., Ali, M.',
              impactFactor: 3.2
            },
            {
              id: 2,
              title: 'Blockchain Technology in Education',
              journal: 'Tanzania Journal of Technology',
              year: '2021',
              authors: 'Said, A., Kimambo, R.',
              impactFactor: 2.1
            }
          ],
          recommendations: [
            {
              id: 1,
              name: 'Prof. James Mwakasege',
              position: 'Head of Department',
              institution: 'University of Dodoma',
              email: 'j.mwakasege@udom.ac.tz',
              statement: 'Dr. Said has demonstrated exceptional research capabilities and teaching excellence. She has successfully supervised 5 postgraduate students and published in reputable journals.',
              date: '2023-05-10'
            }
          ]
        },
        'UC-2023-002': {
            id: 'UC-2023-002',
            name: 'Prof. Benjamin Kipande',
            email: 'ben.kipande@university.edu',
            phone: '+255 678 123 456',
            currentPosition: 'Associate Professor',
            appliedPosition: 'Professor',
            department: 'Mathematics', // Changed from Physics to match ApplicationsQueue
            faculty: 'Science', // Changed from Pure and Applied Sciences to match ApplicationsQueue
            status: 'Pending Review',
            submissionDate: '2024-01-20',
            reviewDeadline: '2024-02-20',
            qualifications: [
              { id: 1, degree: 'PhD in Theoretical Physics', institution: 'University of Cape Town', year: '2008', specialization: 'Quantum Mechanics' },
              { id: 2, degree: 'MSc in Physics', institution: 'Makerere University', year: '2004', specialization: 'Particle Physics' },
              { id: 3, degree: 'BSc in Physics', institution: 'University of Dar es Salaam', year: '2001', specialization: 'Nuclear Physics' }
            ],
            experience: [
              { id: 1, position: 'Associate Professor', institution: 'University of Dar es Salaam', duration: '2015 - Present', responsibilities: 'Advanced Physics courses, research leadership' },
              { id: 2, position: 'Senior Lecturer', institution: 'University of Dar es Salaam', duration: '2010 - 2015', responsibilities: 'Undergraduate teaching, research' }
            ],
            publications: [
              { id: 1, title: 'Advancements in Quantum Computing', journal: 'Journal of Theoretical Physics', year: '2023', authors: 'Kipande, B., Ndlovu, S.', impactFactor: 5.1 },
              { id: 2, title: 'Applications of Superconductivity', journal: 'African Physics Review', year: '2020', authors: 'Kipande, B.', impactFactor: 4.5 }
            ],
            recommendations: [
                { id: 1, name: 'Dr. Stella Mbise', position: 'Dean of Faculty', institution: 'University of Dar es Salaam', email: 's.mbise@udsm.ac.tz', statement: 'Prof. Kipande is a pillar in our faculty, known for his groundbreaking research and dedication to mentorship.', date: '2024-01-10' }
            ]
        },
        'UC-2023-003': {
            id: 'UC-2023-003',
            name: 'Dr. Fatma Rajab',
            email: 'fatma.rajab@university.edu',
            phone: '+255 789 012 345',
            currentPosition: 'Lecturer',
            appliedPosition: 'Senior Lecturer',
            department: 'Education',
            faculty: 'Humanities',
            status: 'Pending Review',
            submissionDate: '2023-05-20',
            reviewDeadline: '2023-06-20',
            qualifications: [
                { id: 1, degree: 'PhD in Education', institution: 'University of Dar es Salaam', year: '2017', specialization: 'Curriculum Development' },
                { id: 2, degree: 'MEd in Educational Psychology', institution: 'University of Nairobi', year: '2012', specialization: 'Child Development' }
            ],
            experience: [
                { id: 1, position: 'Lecturer', institution: 'University of Dodoma', duration: '2017 - Present', responsibilities: 'Teaching, research, student advising' }
            ],
            publications: [
                { id: 1, title: 'Innovative Teaching Methods in Primary Education', journal: 'East African Journal of Education', year: '2022', authors: 'Rajab, F.', impactFactor: 1.8 }
            ],
            recommendations: [] // Example: No recommendations yet
        },
        'UC-2023-004': {
            id: 'UC-2023-004',
            name: 'Dr. Robert Kimambo',
            email: 'robert.kimambo@university.edu',
            phone: '+255 754 987 654',
            currentPosition: 'Senior Lecturer',
            appliedPosition: 'Associate Professor',
            department: 'Physics',
            faculty: 'Science',
            status: 'Completed', // This one is completed
            submissionDate: '2023-05-10',
            reviewDeadline: '2023-06-10',
            qualifications: [
                { id: 1, degree: 'PhD in Nuclear Physics', institution: 'University of Pretoria', year: '2014', specialization: 'Particle Accelerators' }
            ],
            experience: [
                { id: 1, position: 'Senior Lecturer', institution: 'University of Dar es Salaam', duration: '2014 - Present', responsibilities: 'Advanced physics teaching, lab supervision' }
            ],
            publications: [
                { id: 1, title: 'New Frontiers in Quantum Entanglement', journal: 'International Journal of Physics', year: '2023', authors: 'Kimambo, R., Ndunguru, J.', impactFactor: 6.0 }
            ],
            recommendations: [
                { id: 1, name: 'Prof. Amina Said', position: 'Department Head', institution: 'University of Dar es Salaam', email: 'a.said@udsm.ac.tz', statement: 'Dr. Kimambo is an exceptional researcher and a dedicated educator. His contributions to the department are invaluable.', date: '2023-05-05' }
            ]
        },
        'UC-2023-005': { // New Application 1 Details
            id: 'UC-2023-005',
            name: 'Dr. Neema Charles',
            email: 'neema.charles@university.edu',
            phone: '+255 654 112 233',
            currentPosition: 'Assistant Lecturer',
            appliedPosition: 'Lecturer',
            department: 'Chemistry',
            faculty: 'Science',
            status: 'Pending Review',
            submissionDate: '2023-05-22',
            reviewDeadline: '2023-06-22',
            qualifications: [
                { id: 1, degree: 'PhD in Organic Chemistry', institution: 'Sokoine University of Agriculture', year: '2020', specialization: 'Natural Products' },
                { id: 2, degree: 'MSc in Chemistry', institution: 'University of Dar es Salaam', year: '2015', specialization: 'Analytical Chemistry' }
            ],
            experience: [
                { id: 1, position: 'Assistant Lecturer', institution: 'University of Dodoma', duration: '2020 - Present', responsibilities: 'Teaching general chemistry, lab supervision' }
            ],
            publications: [
                { id: 1, title: 'Extraction of Bioactive Compounds from Tanzanian Herbs', journal: 'Journal of Natural Sciences', year: '2022', authors: 'Charles, N., Mushi, P.', impactFactor: 2.5 }
            ],
            recommendations: [
                { id: 1, name: 'Prof. Baraka Mchunga', position: 'Head of Department', institution: 'University of Dodoma', email: 'b.mchunga@udom.ac.tz', statement: 'Dr. Charles is a promising young researcher with a strong commitment to teaching and community engagement.', date: '2023-05-18' }
            ]
        },
        'UC-2023-006': { // New Application 2 Details
            id: 'UC-2023-006',
            name: 'Mr. Daniel Juma',
            email: 'daniel.juma@university.edu',
            phone: '+255 765 432 109',
            currentPosition: 'Lecturer',
            appliedPosition: 'Senior Lecturer',
            department: 'Law',
            faculty: 'Law',
            status: 'Pending Review',
            submissionDate: '2023-05-19',
            reviewDeadline: '2023-06-19',
            qualifications: [
                { id: 1, degree: 'LLM in International Law', institution: 'University of London', year: '2016', specialization: 'Human Rights Law' },
                { id: 2, degree: 'LLB', institution: 'University of Dar es Salaam', year: '2012', specialization: 'Commercial Law' }
            ],
            experience: [
                { id: 1, position: 'Lecturer', institution: 'University of Dar es Salaam', duration: '2016 - Present', responsibilities: 'Teaching various law courses, legal research' },
                { id: 2, position: 'Legal Advisor', institution: 'Ministry of Justice', duration: '2012 - 2016', responsibilities: 'Providing legal advice to government departments' }
            ],
            publications: [
                { id: 1, title: 'The Impact of Digitalization on Contract Law in Tanzania', journal: 'Tanzania Law Review', year: '2023', authors: 'Juma, D.', impactFactor: 1.5 }
            ],
            recommendations: [
                { id: 1, name: 'Hon. Justice Zawadi Mrema', position: 'High Court Judge', institution: 'Judiciary of Tanzania', email: 'z.mrema@judiciary.go.tz', statement: 'Mr. Juma possesses a sharp legal mind and a deep understanding of complex legal principles. He is a valuable asset to any institution.', date: '2023-05-15' }
            ]
        },
      };

      // Set application data, defaulting to UC-2023-001 if ID not found
      // Weka data ya maombi, ikirejea UC-2023-001 ikiwa ID haipatikani
      setApplication(sampleData[id] || sampleData['UC-2023-001']);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleDecision = (decision) => {
    message.info(`Redirecting to ${decision} form...`);
    // Navigate to the decision form, passing the application ID and the decision type as a query parameter
    // Elekeza kwenye fomu ya uamuzi, ukipitisha kitambulisho cha maombi na aina ya uamuzi kama kigezo cha swali
    navigate(`/university-council/decision-form/${id}?decision=${decision}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <Spin size="large" tip="Loading application details..." />
      </div>
    );
  }

  // Fallback if application is null after loading (e.g., invalid ID)
  // Rejea ikiwa maombi ni batili baada ya kupakia (k.m., ID batili)
  if (!application) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <Alert
          message="Application Not Found"
          description="The application you are looking for does not exist."
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
    <div className="application-details" style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/university-council/applications')}
        style={{ marginBottom: 16 }}
      >
        Back to Applications
      </Button>

      <div className="header-section" style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          {application.name}
          <Tag
            color={application.status === 'Pending Review' ? 'orange' : 'blue'}
            style={{ marginLeft: 16, fontSize: 14 }}
          >
            {application.status.toUpperCase()}
          </Tag>
        </Title>
        <Text type="secondary">
          Application for {application.appliedPosition} position in {application.department}
        </Text>
      </div>

      <Steps current={1} style={{ marginBottom: 24 }}>
        <Step title="HR Review" description="Completed" />
        <Step title="Council Review" description="In Progress" />
        <Step title="Final Decision" description="Pending" />
      </Steps>

      <Alert
        message="Review Deadline"
        description={`Please complete your review by ${application.reviewDeadline}`}
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card
        title={
          <span>
            <UserOutlined style={{ marginRight: 8 }} />
            Basic Information
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Current Position">{application.currentPosition}</Descriptions.Item>
          <Descriptions.Item label="Applied Position">{application.appliedPosition}</Descriptions.Item>
          <Descriptions.Item label="Department">{application.department}</Descriptions.Item>
          <Descriptions.Item label="Faculty">{application.faculty}</Descriptions.Item>
          <Descriptions.Item label="Email">{application.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{application.phone}</Descriptions.Item>
          <Descriptions.Item label="Submission Date">{application.submissionDate}</Descriptions.Item>
          <Descriptions.Item label="Application ID">
            <Tag color="blue">{application.id}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title={
          <span>
            <FileTextOutlined style={{ marginRight: 8 }} />
            Academic Qualifications
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <Table
          dataSource={application.qualifications}
          columns={[
            {
              title: 'Degree',
              dataIndex: 'degree',
              key: 'degree',
              render: (text, record) => (
                <div>
                  <Text strong>{text}</Text>
                  {record.specialization && (
                    <div>
                      <Text type="secondary">{record.specialization}</Text>
                    </div>
                  )}
                </div>
              )
            },
            {
              title: 'Institution',
              dataIndex: 'institution',
              key: 'institution'
            },
            {
              title: 'Year',
              dataIndex: 'year',
              key: 'year',
              width: 100,
              align: 'center'
            }
          ]}
          pagination={false}
          rowKey="id"
        />
      </Card>

      <Card
        title={
          <span>
            <SolutionOutlined style={{ marginRight: 8 }} />
            Work Experience
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <Table
          dataSource={application.experience}
          columns={[
            {
              title: 'Position',
              dataIndex: 'position',
              key: 'position'
            },
            {
              title: 'Institution',
              dataIndex: 'institution',
              key: 'institution'
            },
            {
              title: 'Duration',
              dataIndex: 'duration',
              key: 'duration',
              width: 150
            },
            {
              title: 'Responsibilities',
              dataIndex: 'responsibilities',
              key: 'responsibilities',
              ellipsis: true
            }
          ]}
          pagination={false}
          rowKey="id"
        />
      </Card>

      <Card
        title={
          <span>
            <BookOutlined style={{ marginRight: 8 }} />
            Publications
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <Table
          dataSource={application.publications}
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              width: 250
            },
            {
              title: 'Journal',
              dataIndex: 'journal',
              key: 'journal'
            },
            {
              title: 'Year',
              dataIndex: 'year',
              key: 'year',
              width: 100,
              align: 'center'
            },
            {
              title: 'Authors',
              dataIndex: 'authors',
              key: 'authors',
              ellipsis: true
            },
            {
              title: 'Impact Factor',
              dataIndex: 'impactFactor',
              key: 'impactFactor',
              width: 120,
              align: 'center'
            }
          ]}
          pagination={false}
          rowKey="id"
        />
      </Card>

      <Card
        title={
          <span>
            <UserOutlined style={{ marginRight: 8 }} />
            Recommendations
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <Table
          dataSource={application.recommendations}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text, record) => (
                <div>
                  <Text strong>{text}</Text>
                  <div>
                    <Text type="secondary">{record.position}</Text>
                  </div>
                </div>
              )
            },
            {
              title: 'Institution',
              dataIndex: 'institution',
              key: 'institution'
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email'
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              width: 120
            },
            {
              title: 'Statement',
              dataIndex: 'statement',
              key: 'statement',
              ellipsis: true
            }
          ]}
          pagination={false}
          rowKey="id"
        />
      </Card>

      <Divider />

      <div className="decision-actions" style={{ marginTop: 32, textAlign: 'center' }}>
        <Title level={4} style={{ marginBottom: 24 }}>
          Make Your Decision
        </Title>
        <div style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          flexWrap: 'wrap' // Allow buttons to wrap on smaller screens
        }}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            size="large"
            onClick={() => handleDecision('approve')}
            style={{ width: 200 }}
          >
            Approve Application
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            size="large"
            onClick={() => handleDecision('reject')}
            style={{ width: 200 }}
          >
            Reject Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
