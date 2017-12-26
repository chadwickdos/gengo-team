import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  title = 'The Team';
  members = [];
  local = 'all';

  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam(): void {
    let team = [];
    this.http.get('https://spreadsheets.google.com/feeds/list/1dRyZMjUYXShOEYGGFDcK-g_6srBFVF8nPv2dnJiJ06c/1/public/values?alt=json')
        .subscribe(data => {
          for (let i = 0, len = data['feed']['entry'].length; i < len; i++) {
            team[i] = { id: i,
                        name: data['feed']['entry'][i].gsx$name.$t, 
                        title: data['feed']['entry'][i].gsx$title.$t,
                        location: data['feed']['entry'][i].gsx$location.$t,
                        image: data['feed']['entry'][i].gsx$image.$t,
                        description: data['feed']['entry'][i].gsx$description.$t
                      };
          }
          this.members = team;
          console.log(this.members);
        });
  }
 
  isActive(loc) {
    if (this.local === loc.toLowerCase() || this.local === 'all') {
      return true;
    }
    return false;
  }

  onSelect(select) {
    this.local = select;
  }

}
