import React, { useEffect } from 'react';
import './UserShort.scss';
import Hint from '../wrappers/hint/Hint';

interface Props {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

const UserShort = function ({
  id, title, firstName, lastName, picture,
}: Props) {
  useEffect(() => {

  }, []);
  return (
    <div className="userShort" id={id}>
      <div className="userShort__avatar"><img src={picture} alt="" /></div>
      <div className="userShort__name"><Hint element={<span className="userShort__username-span"><b>{`${title} ${firstName} ${lastName}`}</b></span>} hintText={id || ''} /></div>
    </div>
  );
};

export default UserShort;
