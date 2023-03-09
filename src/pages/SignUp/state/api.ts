import lodash from 'lodash';
import { LSWrapper } from '../../../services';
import { SignUpRequest } from '../types/SignUpRequest';
import { User } from "../types/User";

type Cache = {
  users: User[],
  user?: User
}

export class UserApi {
  // TEMP only for dev 
  cache: Cache;

  constructor(){
    this.cache = LSWrapper.getItem('cache') ?? { users: [], user: null };
  }

  private insertUser(newUser: User){
    // checks if user already exists
    const { users } = this.cache;
    const index = users.findIndex((user: User) => lodash.isEqual({...user, id: "" }, { ...newUser, id: "" }));
    if(index > -1)// if user exists replace with the new one
      users[index] = newUser;
    else users.push(newUser);
    
    this.cache.user = newUser;
    
    LSWrapper.setItem('cache', this.cache);

    console.log({ ...this.cache });
    
  }

  private randoWait = () => {
    const ms = Math.ceil(Math.random() * 1000);
    console.log('waiting a', ms , 'ms');
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
  
  setNewUser = ({
    fname,
    lname,
    email,
    phone,
    password
  }: SignUpRequest) => {
    return new Promise<{ data: User }>((resolve) =>
      setTimeout(() => {
        const user: User = {
          fname,
          lname,
          email,
          phone,
          id: crypto.randomUUID(),
          password
        };
        
        this.insertUser(user);

        resolve({ data: user });
      }, this.randoWait())
    );
  }
}

