import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { TailSpin } from 'react-loader-spinner';
import "../App.css";
import UserCard from './UserCard';
import { FaUser } from 'react-icons/fa';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarError, setAvatarError] = useState(false);
  const [userDetailsLoading, setUserDetailsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isPhoneView, setIsPhoneView] = useState(false);

  useEffect(() => {
    fetchUsers();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://userapi-backend.vercel.app/api/users/userinfo');
      const data = response.data;
      console.log("Fetched Users:", data);
      setUsers(data);
      setLoading(false);
      if (data.length === 0) setErrorText("No data to show");
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      setErrorText("No data to show");
    }
  };

  const handleResize = () => {
    setIsPhoneView(window.innerWidth <= 768);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUserDetailsLoading(true);
    setAvatarError(false);
    setTimeout(() => {
      setUserDetailsLoading(false);
    }, 1000);
  };

  const handleAvatarLoad = () => {
    setUserDetailsLoading(false);
  };

  const handleAvatarError = () => {
    setAvatarError(true);
    setUserDetailsLoading(false);
  };

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <Row style={{ height: '100%' }}>
        {isPhoneView ? (
          <Col xs={12} style={{ borderBottom: '1px solid #ccc' }}>
            <Tab.Container defaultActiveKey="users">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="user-details">User Details</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="users">
                  <div style={{ maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
                        <TailSpin
                          color="#007bff"
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : (
                      users.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>{errorText}</p>
                      ) : (
                        users.map(user => (
                          <div key={user.id} onClick={() => handleUserClick(user)}>
                            <UserCard user={user} />
                          </div>
                        ))
                      )
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="user-details">
                  <div style={{ padding: '20px' }}>
                    {userDetailsLoading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                        <TailSpin
                          color="#007bff"
                          width={50}
                          height={50}
                        />
                      </div>
                    ) : (
                      selectedUser ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', height: '100vh' }}>
                          <div style={{ marginBottom: '20px' }}>
                            {selectedUser.avatar && !avatarError ? (
                              <img
                                src={selectedUser.avatar}
                                alt="User Avatar"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                onLoad={handleAvatarLoad}
                                onError={handleAvatarError}
                              />
                            ) : (
                              <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', borderRadius: '50%' }}>
                                <FaUser style={{ fontSize: '70px', color: '#fff' }} />
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <p style={{ fontWeight: 'bold', fontSize: '40px', margin: '0' }}>{selectedUser.profile.firstName} {selectedUser.profile.lastName}</p>
                            <p>{selectedUser.profile.email}</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-3">
                            <div className="px-6 text-center">
                              <div className="row">
                                <div className="col-md-12 text-start">
                                  <div>
                                    <strong>Job Title:</strong>
                                    <p className="text-sm mb-3"> {selectedUser.jobTitle}</p>
                                  </div>
                                  <div>
                                    <strong>Bio:</strong>
                                    <p className="text-sm mb-3"> {selectedUser.Bio}</p>
                                  </div>
                                  <div>
                                    <strong>User Name:</strong>
                                    <p className="text-sm"> {selectedUser.profile.username}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>No user selected</p>
                        </div>
                      )
                    )}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        ) : (
          <React.Fragment>
            <Col md={3} style={{ width: '35%', maxHeight: '100%', overflowY: 'auto' }}>
              <div>
                <p style={{ borderBottom: '1px solid #ccc', paddingBottom: '15px', paddingLeft: '15px', paddingTop: '15px', fontSize: '30px', fontWeight: 'bold', marginBottom: '0' }}>Users</p>
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
                    <TailSpin
                      color="#007bff"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  users.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>{errorText}</p>
                  ) : (
                    users.map(user => (
                      <div key={user.id} onClick={() => handleUserClick(user)}>
                        <UserCard user={user} />
                      </div>
                    ))
                  )
                )}
              </div>
            </Col>

            <Col md={9} xs={12} style={{ width: '65%', borderLeft: '1px solid #ccc', padding: '20px' }}>
              <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '15px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '1' }}>User Details</h2>
              </div>
              {userDetailsLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                  <TailSpin
                    color="#007bff"
                    width={50}
                    height={50}
                  />
                </div>
              ) : (
                selectedUser ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', height: '100vh' }}>
                    <div style={{ marginBottom: '20px' }}>
                      {selectedUser.avatar && !avatarError ? (
                        <img
                          src={selectedUser.avatar}
                          alt="User Avatar"
                          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                          onLoad={handleAvatarLoad}
                          onError={handleAvatarError}
                        />
                      ) : (
                        <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', borderRadius: '50%' }}>
                          <FaUser style={{ fontSize: '70px', color: '#fff' }} />
                        </div>
                      )}
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <p style={{ fontWeight: 'bold', fontSize: '40px', margin: '0' }}>{selectedUser.profile.firstName} {selectedUser.profile.lastName}</p>
                      <p>{selectedUser.profile.email}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-3">
                      <div className="px-6 text-center">
                        <div className="row">
                          <div className="col-md-12 text-start">
                            <div>
                              <strong>Job Title:</strong>
                              <p className="text-sm mb-3"> {selectedUser.jobTitle}</p>
                            </div>
                            <div>
                              <strong>Bio:</strong>
                              <p className="text-sm mb-3"> {selectedUser.Bio}</p>
                            </div>
                            <div>
                              <strong>User Name:</strong>
                              <p className="text-sm"> {selectedUser.profile.username}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>No user selected</p>
                  </div>
                )
              )}
            </Col>
          </React.Fragment>
        )}
      </Row>
    </div>
  );
}
