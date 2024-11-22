import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled components
const UserListContainer = styled.div`
  width: 100%;
  margin: 10vh auto;
  padding: 20px;
  text-align: start;
`;

const UserItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
`;

const UserName = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5100/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <UserListContainer>
      <h2>User List</h2>
      {users.map((user) => (
        <UserItem key={user._id}>
            <p><strong>UserId: {user._id}</strong></p>
          <UserName>UserName: {user.username}</UserName>
          <UserEmail>Email: {user.email}</UserEmail>
          
        </UserItem>
      ))}
    </UserListContainer>
  );
};

export default Users;
