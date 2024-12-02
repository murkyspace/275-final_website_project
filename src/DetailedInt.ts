export interface DetailedInterface {
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  setApiResponse: React.Dispatch<React.SetStateAction<string>>;
  setCompletedQuiz: React.Dispatch<React.SetStateAction<'basic' | 'detailed' | null>>;
  apiKey: string;
}
