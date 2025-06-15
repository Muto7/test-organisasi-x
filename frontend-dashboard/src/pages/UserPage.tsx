import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';

const UserPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <UserForm />
      <hr />
      <UserTable />
    </div>
  );
};

export default UserPage;
