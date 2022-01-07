import React, { useEffect } from 'react';
import './Comment.scss';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { UserShortResponseType } from '../types/api/serverApiResponses';
import Hint from '../wrappers/hint/Hint';
import '../locale/i18next';

interface Props {
  id: string;
  text: string;
  publishDate: { date: string, time: string };
  owner: UserShortResponseType;
}

const Comment = function ({
  id, text, publishDate, owner,
}: Props) {
  const { t } = useTranslation('registrationform');
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
            <span className="comment__date-span">
              { moment(publishDate.date).format(t('birthday_format')) }
&nbsp;
              {publishDate.time}
            </span>
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
