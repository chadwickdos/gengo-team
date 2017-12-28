import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string;
  text: string;
  projects: string;
  commits: string;
  coffee: string;
  members: string;
  newest: Object[];

  constructor(private http: HttpClient){ 
    this.title = 'Gengo <strong>Engineering</strong>';
    this.text = 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.';
    this.projects = '0';
    this.commits = '1';
    this.coffee = '2';
    this.members = '3';
  }

  ngOnInit(): void {
    let team = [];
    let c = 0;
    this.http.get('https://spreadsheets.google.com/feeds/list/1dRyZMjUYXShOEYGGFDcK-g_6srBFVF8nPv2dnJiJ06c/1/public/values?alt=json')
        .subscribe(data => {
          for (let i = 0, len = data['feed']['entry'].length; i < len; i++) {
            if (data['feed']['entry'][i].gsx$new.$t && c < 3) {
            team[c] = { id: i,
                        name: data['feed']['entry'][i].gsx$name.$t, 
                        title: data['feed']['entry'][i].gsx$title.$t,
                        location: data['feed']['entry'][i].gsx$location.$t,
                        image: data['feed']['entry'][i].gsx$image.$t,
                        description: data['feed']['entry'][i].gsx$description.$t,
                        info: data['feed']['entry'][i].gsx$info.$t,
                        cover: data['feed']['entry'][i].gsx$cover.$t,
                        isnew: data['feed']['entry'][i].gsx$new.$t
                      };
            c++;
            }
          }
          this.newest = team;
          console.log(this.newest);
        });
    this.http.get('https://spreadsheets.google.com/feeds/list/1dRyZMjUYXShOEYGGFDcK-g_6srBFVF8nPv2dnJiJ06c/2/public/values?alt=json')
        .subscribe(data => {
          if(data['feed']['entry'][0]) {
            this.title = data['feed']['entry'][0].gsx$title.$t;
            this.text = data['feed']['entry'][0].gsx$intro.$t;
            this.projects = data['feed']['entry'][0].gsx$projects.$t;
            this.commits = data['feed']['entry'][0].gsx$commits.$t;
            this.coffee = data['feed']['entry'][0].gsx$coffee.$t;
            this.members = data['feed']['entry'][0].gsx$members.$t;
          }
    });
  }

}
