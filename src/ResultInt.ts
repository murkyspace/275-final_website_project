export interface ResultInterface {
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  apiResponse: string;
  completedQuiz: 'basic' | 'detailed';
}
