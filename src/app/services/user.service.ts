import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GitHubUser } from "./data.service";

const UserInit = {
    id: 0,
    login: "not available",
    avatar_url: "../../assets/fluidicon.png",
    created_at: '1900-01-01T05:24:19Z',
    name: "not available",
    location: "not available",
    twitter_username: "not available",
    blog: "",
    public_repos: 0,
    followers: 0,
    following: 0,
}

@Injectable({
    providedIn: 'root'
})

export class UserService{
    private user$ = new BehaviorSubject<GitHubUser>(UserInit);

    get userSearched$(): Observable<GitHubUser> {
        return this.user$.asObservable();
    }

    setUser(user: GitHubUser) {
        this.user$.next(user);
    }
}