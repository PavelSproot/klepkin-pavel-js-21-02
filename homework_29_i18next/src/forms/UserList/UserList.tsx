import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { State } from '../../redux/types/state';
import { ListResponseType, UserShortResponseType } from '../../types/api/dumMyApiResponses';
import loadUserList from '../../redux/actions/userListActions';
import UserShort from '../../components/UserShort';
import './UserList.scss';
import 'antd/dist/antd.css';
import { EMPTY_STRING } from '../../constants/common';
import Loader from '../../components/Loader';
import { USERPROFILE_URL } from '../../constants/api/dummyApi';

interface Props {
  userList: ListResponseType<UserShortResponseType>
  loading: boolean;
  loaded: boolean;
  error: any;
  loadUsers: (pageNum: number, pageSize: number) => void;
}

const UserList = function ({
  userList, loading, loaded, error, loadUsers,
}: Props) {
  useEffect(() => {
    loadUsers && loadUsers(userList.page, userList.limit);
  }, []);
  return (
    <div className="userList">
      <div className="userList__total-container">
        <div className="userList__header" />
        <div className="userList__main-container">
          {
          error
            ? <div>{error}</div>
            : loading
              ? (
                <div className="userList__loader-container">
                  <Loader />
                </div>
              )
              : !loaded ? <div /> : (
                <div className="userList__list-container">
                  {
                          (userList.total && (userList.total > 0)) ? (
                            userList && userList.data.map(
                              (elem) => (
                                <Link to={`/${USERPROFILE_URL}/${elem.id}`} key={elem.id} className="userList__show-button">
                                  <UserShort
                                    key={elem.id}
                                    id={elem.id || ''}
                                    title={elem.title || ''}
                                    firstName={elem.firstName || ''}
                                    lastName={elem.lastName || ''}
                                    picture={elem.picture || ''}
                                  />
                                </Link>
                              ),
                            )
                          ) : EMPTY_STRING
                      }
                  {
                        (userList.total && (userList.total > 0))
                          ? (
                            <div className="userList__pagination">
                              <Pagination
                                defaultCurrent={1}
                                total={userList.total}
                                pageSize={userList.limit}
                                current={userList.page + 1}
                                pageSizeOptions={['5', '10', '25', '50']}
                                onChange={(newPage, newPageSize) => {
                                  loadUsers && loadUsers(newPage - 1, newPageSize);
                                }}
                                showSizeChanger
                                size="small"
                              />
                            </div>
                          )
                          : EMPTY_STRING
                    }
                </div>
              )
      }
        </div>

      </div>
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      userList: state.users.userList,
      loading: state.users.loading,
      loaded: state.users.loaded,
      error: state.users.error,
    }),
  (dispatch) => bindActionCreators({ loadUsers: loadUserList }, dispatch),
)(UserList);
