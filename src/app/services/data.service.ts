import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from 'rxjs';


export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    created_at: string;
    name: string;
    location: string;
    twitter_username: string;
    blog: string;
    public_repos: number;
    followers: number;
    following: number;
}

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private readonly baseURL = 'https://api.github.com/users/';
    private login: string = '';


    constructor(private readonly http: HttpClient) { }

    GetUser(userName: string): Observable<GitHubUser> {
        if (!this.login || this.login !== userName) { this.login = userName };

        let API = this.baseURL + this.login;

        return this.http
            .get<GitHubUser>(API)
            .pipe(
                catchError(error => {
                    let errorMsg: string;
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        errorMsg = this.getServerErrorMessage(error,userName);
                    }

                    return throwError(() => errorMsg);
                })
            );
    }

    private getServerErrorMessage(error: HttpErrorResponse,userName:string): string {
        switch (error.status) {
            case 404: {
                return `User Not Found: ${userName}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }
        }


    }

}