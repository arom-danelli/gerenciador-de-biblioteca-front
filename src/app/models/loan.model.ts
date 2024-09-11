export interface Loan {
  id?: number;             
  user: {
    id: number;            
  };
  book: {
    id: number;            
  };
  userName: string;      
  bookTitle: string;       
  loanDate: string;      
  return_date?: string;    
  status: string;         
}
