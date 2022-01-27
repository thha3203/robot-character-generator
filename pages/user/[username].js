import UserProfile from '../../components/UserProfile.js';

export default function UserProfilePage({ username }) {
  return (
    <main>
      <UserProfile user={username} />
    </main>
  );
};
