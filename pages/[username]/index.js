import UserProfile from '../../components/UserProfile.js';

export default function UserProfilePage({ user }) {
  return (
    <main>
      <UserProfile user={user} />
    </main>
  );
};
