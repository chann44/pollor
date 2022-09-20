export type User = {
  id: number;
  username: string;
  profile_img: string;
  createdAt: Date;
  bio: string;
  updatedAt: string;
  comments: TComment[];
  Poll: TPoll[];
};

export type TComment = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  creator: User;
  pollId: number;
};

export type Tpoll = {
  id: number;
  title: string;
  Option: Option[];
  creator: User;
  createdAt: string;
  updated_at: string;
  Comment: TComment[];
  votes: number;
};

export type TOption = {
  id: number;
  pollId: number;
  text: string;
  vote: number;
};