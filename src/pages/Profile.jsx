import React from 'react';

const Profile = ({user}) => {
  const { email, name } = user || {};
  return (
    <>
      <h1>Profile</h1>
      <p>Email: {email}</p>
      <p>Name: {name}</p>
    </>
  );
};

export default Profile;