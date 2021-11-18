export interface Answer {
  aid: string;
  created_at: string;
  uid: string;
  question: {
    question: string;
    keyword: string;
    publish_date: string;
  };
  answer: string;
  rate?: {
    degree: number;
    comment: string;
  };
}

export interface Rate {
  comment: string;
  degree: number;
  rid: string;
  uid: string;
}
