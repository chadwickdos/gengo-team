import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  id: number;
  member: Object;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { 
    this.id = 0;
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.http.get('https://spreadsheets.google.com/feeds/list/1dRyZMjUYXShOEYGGFDcK-g_6srBFVF8nPv2dnJiJ06c/1/public/values?alt=json')
        .subscribe(data => {
        this.member = { id: this.id,
                        name: data['feed']['entry'][this.id].gsx$name.$t, 
                        title: data['feed']['entry'][this.id].gsx$title.$t,
                        location: data['feed']['entry'][this.id].gsx$location.$t,
                        image: data['feed']['entry'][this.id].gsx$image.$t,
                        description: data['feed']['entry'][this.id].gsx$description.$t,
                        info: data['feed']['entry'][this.id].gsx$info.$t,
                        cover: data['feed']['entry'][this.id].gsx$cover.$t
                    };
        });
  }

  goBack(): void {
    this.location.back();
  }

}
