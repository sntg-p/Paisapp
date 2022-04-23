import create from 'zustand';
import { Transaction, User } from "../types";

interface UserState {
  loggedIn: boolean;
  user?: User;
  transactions?: Transaction[];
  setUser: (user: User) => void;
  clearUser: () => void;
  setTransactions: (transactions: Transaction[]) => void;
  dispatch: (action: (state: UserState) => UserState) => void;
};

export const useUser = create<UserState>()((set) => ({
  loggedIn: false,

  setUser: (user) => {
    set((state) => ({
      ...state,
      loggedIn: true,
      user,
    }));
  },

  clearUser: () => {
    set((state) => ({
      ...state,
      loggedIn: false,
      user: undefined,
    }))
  },

  setTransactions: (transactions) => {
    set((state) => ({
      ...state,
      transactions,
    }));
  },

  dispatch: (action) => {
    set((state) => {
      return action(state);
    });
  }
}));