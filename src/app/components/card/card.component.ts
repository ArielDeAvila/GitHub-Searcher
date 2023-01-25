import { Component, OnInit } from '@angular/core';
import { GitHubUser } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  user!: GitHubUser;

  constructor(private readonly userSvc: UserService) { }
  
  
  ngOnInit(): void {
    this.userSvc.userSearched$.subscribe(res => {
      this.user = {
        id: res.id,
        login: res.login,
        avatar_url: res.avatar_url,
        created_at: res.created_at,
        name: res.name == null ? 'Name not available' : res.name,
        location: res.location == null ? 'not available' : res.location,
        twitter_username: res.twitter_username == null ? 'not available' : '@ '+res.twitter_username,
        blog: res.blog,
        public_repos: res.public_repos,
        followers: res.followers,
        following: res.following
      };
    })
  }

  



}
