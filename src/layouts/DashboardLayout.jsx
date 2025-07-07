
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          marginLeft: '250px',
          padding: '20px',
          backgroundColor: '#f5f7fa',
          minHeight: 'calc(100vh - 120px)'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;