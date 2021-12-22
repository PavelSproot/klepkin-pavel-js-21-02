import {
  CommentResponsType,
  ListResponseType, PostFullResponseType, PostShortResponseType, UserResponseType, UserShortResponseType,
} from '../../types/api/dumMyApiResponses';

export interface State {
  userProfile: UserState;
  post: PostFullState;
  users: ListUserShortState;
  posts: ListPostShortState;
  comments: ListCommentState;
  registerUser: UserState;
  authUser: UserState;
}

interface CommonState {
  loading: boolean;
  loaded: boolean;
  error?: string;
}

export interface ListUserShortState extends CommonState {
  userList: ListResponseType<UserShortResponseType>;
}

export interface UserState extends CommonState {
  user: UserResponseType;
}

export interface ListPostShortState extends CommonState {
  postID: string;
  postList: ListResponseType<PostShortResponseType>;
}

export interface PostFullState extends CommonState {
  postFull: PostFullResponseType;
}

export interface ListCommentState extends CommonState {
  postID: string;
  commentList: ListResponseType<CommentResponsType>;
}
