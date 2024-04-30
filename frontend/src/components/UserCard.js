import { Card } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

const UserCard = ({ user }) => {
  const [avatarError, setAvatarError] = useState(false);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <Card style={{ borderRadius: '0' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
        {user.avatar && !avatarError ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{ marginRight: '20px', width: '60px', height: '60px', borderRadius: '50%' }}
            onError={handleAvatarError}
          />
        ) : (
          <div style={{ marginRight: '20px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', borderRadius: '50%' }}>
            <FaUser style={{ fontSize: '30px', color: '#fff' }} />
          </div>
        )}
        <div>
          <p style={{ marginBottom: '5px', fontSize: '18px' }}><strong>{user.profile.firstName} {user.profile.lastName}</strong></p>
          <p style={{ marginBottom: '5px', fontSize: '14px' }}><strong>Email:</strong> {user.profile.email}</p>
          <p style={{ marginBottom: '5px', fontSize: '14px' }}><strong>Job Title:</strong> {user.jobTitle}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
