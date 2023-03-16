import axios from 'axios';
import lodash from 'lodash';

import { LSWrapper } from '../../../services';
import { SignUpRequest } from '../types/SignUpRequest';
import { User } from "../types/User";
import {
  API,
  HEADERS as headers,
  HOST,
  DEFAULT_PORT
} from './config';

type Cache = {
  users: User[],
  user?: User
}

export class UserApi {

  constructor(
    public host: string = `http://${HOST}:${DEFAULT_PORT}`,

    public readonly cacheKey: string = '@user_',
    public cache: Cache = LSWrapper.getItem(cacheKey) ?? { users: [], user: null },
  ) { }

  setNewUser = async (data: SignUpRequest) => {
    const url = `${this.host}${API.USER.SIGN_UP}`;
    const method = 'POST';
    try {
      const response = await axios({ url, method, headers, data });
      const user = await response.data;
      this.setToCache(user);
      return user;
    } catch (error: any | unknown) {
      console.error(`error at setNewUser: ${url}`, error);
      throw new Error(JSON.stringify(error.response.data.message));
    }
  }

  private setToCache(newUser: User) {
    // checks if user already exists
    const { users } = this.cache;
    const index = users.findIndex((user: User) => lodash.isEqual({ ...user, id: "" }, { ...newUser, id: "" }));
    if (index > -1)// if user exists replace with the new one
      users[index] = newUser;
    else users.push(newUser);

    this.cache.user = newUser;

    LSWrapper.setItem('cache', this.cache);

    console.log({ ...this.cache });

  }

  private randoWait = () => {
    const ms = Math.ceil(Math.random() * 1000);
    console.log('waiting a', ms, 'ms');
    return ms;
  }

  private findById = (id: string) =>
    this.cache.users.find((user: User) => user.id === id);

  private findByEmailAndPassword = (email: string, password: string) =>
    this.cache.users.find((user: User) => user.email === email && user.password === password);

  fetchUserById = (id: string = '') => {
    return new Promise<{ data?: User }>((resolve) =>
      setTimeout(() => resolve({ data: this.findById(id) }), this.randoWait())
    );
  }

  fetchUserByEmailAndPassword = (email: string, password: string) => {
    return new Promise<{ data?: User }>((resolve) =>
      setTimeout(() => resolve({ data: this.findByEmailAndPassword(email, password) }), this.randoWait())
    );
  }
}

