import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private loginId: number = 0;
    private loginName: string = '';
    private loginProfileImage: string = '';
    private loginRole: string = '';
    private userName: string = '';

    public getloginId(): number {
        if (this.loginId == 0) {
            this.loginId = Number(localStorage.getItem("loginid"));
        }
        return this.loginId;
    }

    public getloginName(): string {
        if (this.loginName == '') {
            this.loginName = localStorage.getItem("loginname");
        }
        return this.loginName;
    }

    public getloginProfImage(): string {
        if (this.loginProfileImage == '') {
            this.loginProfileImage = localStorage.getItem("loginprofimage");
        }
        return this.loginProfileImage;
    }
    public getloginRole(): string {
        if (this.loginRole == '') {
            this.loginRole = localStorage.getItem("loginrole");
        }
        return this.loginRole;
    }
    public getUserName(): string {
        if (this.userName == '') {
            this.userName = localStorage.getItem("username");
        }
        return this.userName;
    }
    public isLoggedin(): boolean {
        return Boolean(localStorage.getItem("isLoggedin"));
    }
    public getisspiner(): boolean {
        return Boolean(localStorage.getItem("isspiner"));
    }
    public setisspiner(isspiner:string) {
        localStorage.setItem("isspiner", isspiner);
    }

    public setLoginInfo(loginId: number, loginName: string, profImage: string, role: string, username: string) {
        this.loginId = loginId;
        this.loginName = loginName;
        this.loginProfileImage = profImage;
        this.loginRole = role;
        this.userName = username;
        localStorage.setItem("loginid", this.loginId.toString());
        localStorage.setItem("loginname", this.loginName);
        localStorage.setItem("loginprofimage", this.loginProfileImage);
        localStorage.setItem("loginrole", this.loginRole);
        localStorage.setItem("username", this.userName);
        localStorage.setItem("isLoggedin", String(true));
    }

    public clear() {
        localStorage.clear();
    }
}