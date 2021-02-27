import { IStateClients, IClientsList, TypeAction } from "./interfaces";
import * as types from "./actionTypes";


const usersList: IClientsList = {
  "a0a47734-4a9a-11eb-a680-0050560b2820": {
    id: "a0a47734-4a9a-11eb-a680-0050560b2820",
    last_name: "Титова",
    first_name: "Изольда",
    middle_name: "Дмитриевна",
    company_name: "Изольда Inc",
    note: "Богами вам ещё даны Златые дни, златые ночи, И томных дев устремлены На вас внимательные очи.",
    meta: {
      tel: [{ value: 999 }, { value: 888 }],
      email: [
        { value: "izoldava@gmail.com" },
        { value: "izoldava@yandex.ru" },
        { value: "izoldava@mail.ru" },
      ],
    },
  },
  "c99cfd65-4a9a-11eb-a680-0050560b2820": {
    id: "c99cfd65-4a9a-11eb-a680-0050560b2820",
    last_name: "Авдеев",
    first_name: "Тарас",
    middle_name: "Сергеевич",
    company_name: "Пчелка",
    note: "Играйте, пойте, о друзья! Утратьте вечер скоротечный; И вашей радости беспечной Сквозь слёзы улыбнуся я.",
    meta: {
      tel: [{ value: "(812) 396-91-19" }, { value: "8-800-096-2315" }],
      email: [{ value: "avdech@mail.ru" }, { value: "avdech@mail.com" }],
    },
  },
  "161e93a2-1453-407b-b290-74f33337e9ae": {
    id: "161e93a2-1453-407b-b290-74f33337e9ae",
    first_name: "Раиса",
    last_name: "Медведева",
    middle_name: "Дмитриевна",
    company_name: "Раиса Груп",
    note: "Играйте",
    meta: {
      tel: [{ value: "537-92-24" }, { value: "537-92-24" }],
      email: [{ value: "medvevna@mail.ru" }, { value: "medvevna@mail.com" }],
    },
  },
};

const clientsIds = [
  "a0a47734-4a9a-11eb-a680-0050560b2820",
  "c99cfd65-4a9a-11eb-a680-0050560b2820",
  "161e93a2-1453-407b-b290-74f33337e9ae",
];

const initialState: IStateClients = {
  search: "",
  clientsIds,
  clientsList: usersList,
};

export default function reduce(state = initialState, action: TypeAction) {
  switch (action.type) {
    case types.CLIENT_SET_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case types.CLIENT_ADD: {
      const  newClientId = action.payload.id;
      return {
        ...state,
        clientsIds: [...state.clientsIds, newClientId],
        clientsList: Object.assign({}, state.clientsList, {
          [newClientId]: action.payload,
        }),
      };
    }

    case types.CLIENT_DELETE: {
      const delClientId = action.payload;
      const clientsList = { ...state.clientsList };
      const clientsIds = state.clientsIds.filter((id) => id !== delClientId);
      delete clientsList[delClientId];

      return {
        ...state,
        clientsIds,
        clientsList,
      };
    }

    case types.CLIENT_EDIT: {
      const clinet = action.payload;
      const clientID = clinet.id;

      return {
        ...state,
        clientsList: Object.assign({}, state.clientsList, {
          [clientID]: clinet,
        }),
      };
    }

    default:
      return state;
  }
}
