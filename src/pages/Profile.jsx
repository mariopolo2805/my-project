import React from 'react';

const Profile = ({user}) => {
  const { email, password, name } = user || {};
  return (
    <>
      <h1>Profile</h1>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
      <p>Name: {name}</p>
    </>
  );
};

export default Profile;