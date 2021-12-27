import React, { useEffect } from 'react';
import './PostShort.scss';
import { UserShortResponseType } from '../types/api/dumMyApiResponses';
import { makePostDateFromISO } from '../utills/stringFunctions';
import Hint from '../wrappers/hint/Hint';

interface Props {
  id: string;
  text: string;
  image: string;
  publishDate: string;
  owner: UserShortResponseType;
  formatType: string;
}

const PostShort = function ({
  id, text, image, publishDate, owner, formatType = 'full',
}: Props) {
  useEffect(() => {

  }, []);
  return (
    <div className={`postShort${(formatType && (formatType === 'small')) ? '_small' : ''}`} id={id}>
      {formatType && (formatType === 'full') && (
      <div className="postShort__owner-container">
        <div className="postShort__avatar-container">
          <div className="postShort__avatar-div"><img src={owner.picture} alt="" /></div>
        </div>
        <div className="postShort__info-container">
          <div className="postShort__username-container">
            <div className="postShort__name">
              <Hint element={<span className="postShort__username-span">{`${owner.title} ${owner.firstName} ${owner.lastName}`}</span>} hintText={owner.id || ''} />
            </div>
          </div>
          <div className="postShort__date-container">
            <span>{makePostDateFromISO(publishDate, true)}</span>
          </div>
        </div>
      </div>
      )}
      <div className="postShort__picture-container">
        <div className={`postShort__image-div${(formatType && (formatType === 'small')) ? '_small' : ''}`}><img src={image} alt="" /></div>
      </div>
      <div className={`postShort__text-container${(formatType && (formatType === 'small')) ? '_small' : ''}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PostShort;
