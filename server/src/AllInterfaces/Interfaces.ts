export interface UserDetails {
  name: string;
  username: string;
  email: string;
  image: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  status: string;
  TransactionHistory: {}[];
  // companyGiftCards: {}[];
  PurchasedGiftCards: {}[];
}
