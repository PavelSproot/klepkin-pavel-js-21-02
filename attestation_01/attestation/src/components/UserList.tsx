import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../types/state';
import { UserShortResponseType } from '../types/api/dumMyApiResponses';
import loadUserList from '../actions/userListActions';

interface Props {
  userList: Array<UserShortResponseType>
  loading: boolean;
  error: any;
  loadUsers: (pageNum: number, pageSize: number) => void;
}

const UserList = function ({
  userList, loading, error, loadUsers,
}: Props) {
  useEffect(() => {
    loadUsers && loadUsers(0, 10);
  }, []);
  return (
    <div className="userList">
      {error ? <div>{error}</div> : loading ? 'загрузка' : userList?.map((elem, index) => <div key={index}>{elem.id}</div>)}
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      userList: state.users.userList,
      loading: state.users.loading,
      error: state.users.error,
    }),
  (dispatch) => bindActionCreators({ loadUsers: loadUserList }, dispatch),
)(UserList);
