import React, { useCallback, useState, useEffect } from 'react';
import { GET_ALL_USERS } from './query/user';
import { ErrorBoundary } from 'react-error-boundary';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER } from './mutation/user';

export const StartPage = () => {
  const [request, { data, loading, error }] = useLazyQuery(GET_ALL_USERS);
  const [createRequest, createResult] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [errorPage, setErrorPage] = useState(null);
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (loading || !data) return;
    setUsers(data?.getAllUsers);
  }, [data]);

  useEffect(() => {
    setErrorPage(error);
  }, [error]);

  useEffect(() => {
    setErrorPage(createResult?.error);
  }, [createResult?.error]);

  const createUser = useCallback(
    (event) => {
      event.preventDefault();
      createRequest({
        variables: {
          input: {
            userName,
            age,
          },
        },
      }).then((result) => {
        console.log(result);
        setUserName('');
        setAge(0);
      });
    },
    [userName, age]
  );

  const getAllUsers = useCallback(() => {
    request();
  }, []);

  return (
    <ErrorBoundary
      fallbackRender={() => <>Error!!! Alarm: {errorPage.message}</>}
      onReset={() => {
        setErrorPage(null);
      }}
    >
      <form id='user'>
        <legend>User form</legend>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Age'
          name='age'
          value={age}
          onChange={(event) => {
            setAge(+event.target.value);
          }}
        />
        <button onClick={createUser}>Create user</button>
      </form>
      <br />
      <button onClick={getAllUsers}>Get all users</button>
      {loading ? (
        <div>Users loading...</div>
      ) : (
        users?.map((user) => {
          return (
            <div key={user.id}>
              <div style={{ display: 'inline' }}>{user.id}</div>
              <div style={{ display: 'inline' }}>{user.userName}</div>
              <div style={{ display: 'inline' }}>{user.age}</div>
            </div>
          );
        })
      )}
    </ErrorBoundary>
  );
};
