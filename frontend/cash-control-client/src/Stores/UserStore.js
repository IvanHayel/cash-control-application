import {makeAutoObservable} from 'mobx';

export default class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return [
      ...this.users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(role => role.name.substring(5)).join(', '),
          }),
      )
    ];
  }

  clearStore() {
    this.users = [];
  }
}
