import { LSWrapper } from "../../../services";
import { User } from "../types/User";

export default class UserCache extends LSWrapper {
    constructor(
        public basicCacheKey: string = 'auth@',
        public userCacheKey: string = `${basicCacheKey}user`,
        public access_tokenCacheKey: string = `${basicCacheKey}access_token`,

        public access_token: string = LSWrapper.getItem(access_tokenCacheKey),
        public user: User = LSWrapper.getItem(userCacheKey),
    ) {
        super();
    }

    setUser = (user: User)=>LSWrapper.setItem(this.userCacheKey, user);
    
    setAccessToken = (access_token: string)=>LSWrapper.setItem(this.access_tokenCacheKey, access_token);

}