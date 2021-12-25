import React, { useEffect } from 'react';
import './Comment.scss';
import { UserShortResponseType } from '../types/api/dumMyApiResponses';
import { makePostDateFromISO } from '../utills/stringFunctions';
import Hint from '../wrappers/hint/Hint';

interface Props {
  id: string;
  text: string;
  publishDate: string;
  owner: UserShortResponseType;
}

const Comment = function ({
  id, text, publishDate, owner,
}: Props) {
  useEffect(() => {

  }, []);
  return (
    <div className="comment" id={id}>
      <div className="comment__avatar-container">
        <div className="comment__avatar-div"><img src={owner.picture} alt="" /></div>
      </div>
      <div className="comment__main-container">
        <div className="comment__info-container">
          <div className="comment__username-container">
            <Hint element={<span className="comment__username-span">{`${owner.title} ${owner.firstName} ${owner.lastName}`}</span>} hintText={owner.id || ''} />
          </div>
          <div className="comment__date-container">
            <span className="comment__date-span">{makePostDateFromISO(publishDate)}</span>
          </div>
        </div>
        <div className="comment__text-container">
          <div className="comment__text-div">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
