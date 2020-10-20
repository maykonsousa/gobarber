import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <>
      <h1>Dashboard </h1>
      <button onClick={() => signOut()} type="button">
        <FiXCircle size={30} />
      </button>
    </>
  );
};

export default Dashboard;
