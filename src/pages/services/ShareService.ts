import { Injectable } from '@angular/core';
import {Profile} from '../../app/models/profile';

@Injectable()
export class ShareService {  
  
    private profile: Profile
    
    //Setters
    setUserName(username):void {
        this.profile.username = username;     
    }
    
    setUserId(user_id: number):void {
        this.profile.user_id = user_id;
    }
    
    setToken(token: string):void {
        this.profile.token = token;
    }
    
    setData(data: Profile):void {
        this.profile = {
            user_id: data.user_id,
            username: data.username,
            token: data.token
        }
    }
    
    setDataToNull():void {
        this.profile = new Profile;
    }
    //Getters
    getUserName():string {
        return this.profile.username;
    }
    
    getUserId(): number{
        //return 4216;
        return this.profile.user_id;
    }
    
    getToken(): string{
        return this.profile.token;
    }   
}