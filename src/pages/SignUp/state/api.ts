import axios from 'axios';
import { SignUpRequest } from '../types/SignUpRequest';
import {
  API,
  HEADERS as headers,
  HOST,
  DEFAULT_PORT,
  API_URL
} from './config';

export class UserApi {

  constructor(
    public host: string = `http://${HOST}:${DEFAULT_PORT}${API_URL}`
  ) { }

  setNewUser = async (data: SignUpRequest): Promise<string> => {
    try {
      const url = `${this.host}${API.USER.LOCAL_SIGNUP}`;
      console.log('url', url);
      const method = 'POST';
      const response = await axios({ url, method, headers, data, withCredentials: true });
      const { access_token } = await response.data;
      return access_token;
    } catch (error: any | unknown) {
      console.error(`error at setNewUser:`, error);
      throw new Error(JSON.stringify(error.response.data.message));
    }
  }
  // private findByEmailAndPassword = (email: string, password: string) => {}

  // fetchUserById = (id: string = '') => {}

  fetchUserByEmailAndPassword = async(email: string, password: string): Promise<string> => {
    // return new Promise<{ data?: User }>((resolve) =>
    //   setTimeout(() => resolve({ data: this.findByEmailAndPassword(email, password) }), this.randoWait())
    // );
    return '';
  }
}

