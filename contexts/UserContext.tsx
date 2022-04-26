import { SectionListData } from 'react-native';
import create from 'zustand';
import { Contact } from '../screens/ContactsScreen';
import { Transaction, User } from "../types";

interface UserState {
  loggedIn: boolean;
  user?: User;
  transactions?: Transaction[];
  contacts?: SectionListData<Contact>[];
  filteredContacts?: SectionListData<Contact>[];
  setUser: (user: User) => void;
  clearUser: () => void;
  setTransactions: (transactions: Transaction[]) => void;
  setContacts: (contacts: Contact[]) => void;
  dispatch: (action: (state: UserState) => UserState) => void;
  setContactsFilter: (filter: string) => void;
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
      transactions: undefined,
      contacts: undefined,
    }))
  },

  setTransactions: (transactions) => {
    set((state) => ({
      ...state,
      transactions,
    }));
  },

  setContacts: (contacts) => {
    set((state) => ({
      ...state,
      contacts: [
        {
          title: 'Recientes',
          data: contacts.slice(0, 2),
        },
        {
          title: 'Todos',
          data: contacts.sort((a, b) => a.name.localeCompare(b.name)),
        },
      ],
    }));
  },

  setContactsFilter: (filter: string) => {
    set((state) => {
      if (!state.contacts)
        return state;

      if (filter.trim().length === 0 && state.filteredContacts)
        return {
          ...state,
          filteredContacts: undefined,
        };

      const [_, { data: allContacts }] = state.contacts;

      const data = allContacts.filter(({ name, lastName }) => (
        `${name} ${lastName}`.toLowerCase().includes(filter.trim().toLowerCase())
      ));

      return {
        ...state,
        filteredContacts: [
          {
            title: 'Resultados',
            data,
          }
        ],
      }
    });
  },

  dispatch: (action) => {
    set((state) => {
      return action(state);
    });
  },
}));