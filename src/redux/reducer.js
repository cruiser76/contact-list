import {AuthorizationStatus} from './../const.js';

const ActionType = {
  LOAD_CONTACTS: `LOAD_CONTACTS`,
  ISLOADING_CONTACTS: `ISLOADING_CONTACTS`,
  UPDATE_CONTACTS: `UPDATE_CONTACTS`,
  SET_EDIT_CONTACT: `SET_EDIT_CONTACT`,
  SWITCH_MODAL: `SWITCH_MODAL`,
  SET_SEARCH_STR: `SET_SEARCH_STR`,
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_AUTHORIZATION_ERROR: `SET_AUTHORIZATION_ERROR`
};

const initialState = {
  contacts: [],
  isLoadingContacts: true,
  editContact: {name: ``, id: ``},
  isEditFormShow: false,
  searchStr: ``,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationError: false
};

const ActionCreator = {
  loadContacts: (contacts) => {
    return {
      type: ActionType.LOAD_CONTACTS,
      payload: contacts
    };
  },
  isLoadingContacts: (status) => {
    return {
      type: ActionType.ISLOADING_CONTACTS,
      payload: status
    };
  },
  updateContacts: (contact, contacts) => {
    let updatedContacts = [];
    const index = contacts.findIndex((el) => el.id === contact.id);
    if (index >= 0) {
      updatedContacts = [
        ...contacts.slice(0, index),
        contact,
        ...contacts.slice(index + 1)
      ];
    } else {
      updatedContacts = [...contacts, contact];
    }

    return {
      type: ActionType.UPDATE_CONTACTS,
      payload: updatedContacts
    };
  },
  setEditContact: (contact) => {
    return {
      type: ActionType.SET_EDIT_CONTACT,
      payload: contact
    };
  },
  switchModal: () => {
    return {
      type: ActionType.SWITCH_MODAL,
    };
  },
  setSearchStr: (str) => {
    return {
      type: ActionType.SET_SEARCH_STR,
      payload: str
    };
  },
  setAuthorizationStatus: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status
    };
  },
  setAuthorizationError: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_ERROR,
      payload: status
    };
  }
};

const Operation = {
  loadContacts: () => (dispatch, getState, api) => {
    return api.get(`/contacts`)
      .then((response) => {
        dispatch(ActionCreator.loadContacts(response.data));
        dispatch(ActionCreator.isLoadingContacts(false));
      });
  },
  saveContact: (data, method) => (dispatch, getState, api) => {
    if (method === `post`) {
      return api.post(`/contacts`, data)
        .then((response) => {
          dispatch(ActionCreator.updateContacts(response.data, getState().contacts));
        });
    } else if (method === `patch`) {
      return api.patch(`/contacts/${data.id}`, data)
        .then((response) => {
          dispatch(ActionCreator.updateContacts(response.data, getState().contacts));
        });
    }
    return {};
  },
  delContact: (id) => (dispatch, getState, api) => {
    return api.delete(`/contacts/${id}`)
      .then(() => {
        dispatch(Operation.loadContacts());
        dispatch(ActionCreator.setEditContact({name: ``, id: ``}));
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.get(`/login/1000`)
      .then((response) => {
        if (response.data.email === authData.mail && response.data.password === authData.password) {
          dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
          dispatch(Operation.loadContacts());
        } else {
          dispatch(ActionCreator.setAuthorizationError(true));
        }
      })
      .then(setTimeout(() => {
        dispatch(ActionCreator.setAuthorizationError(false));
      }, 300));
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CONTACTS:
      return Object.assign({}, state, {contacts: action.payload});
    case ActionType.ISLOADING_CONTACTS:
      return Object.assign({}, state, {isLoadingContacts: action.payload});
    case ActionType.UPDATE_CONTACTS:
      return Object.assign({}, state, {contacts: action.payload});
    case ActionType.SET_EDIT_CONTACT:
      return Object.assign({}, state, {editContact: action.payload});
    case ActionType.SWITCH_MODAL:
      return Object.assign({}, state, {isEditFormShow: !state.isEditFormShow});
    case ActionType.SET_SEARCH_STR:
      return Object.assign({}, state, {searchStr: action.payload});
    case ActionType.SET_AUTHORIZATION_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});
    case ActionType.SET_AUTHORIZATION_ERROR:
      return Object.assign({}, state, {authorizationError: action.payload});
    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation};
