import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare const L : any;
// import * as L from 'leaflet';
@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // L:any;
  title = 'location-app';
  public lat: any;
  public lng: any;
  // public exam_lat: any;
  // public exam_lng: any;
  // public exam_loc:any;
  @Input() exam_loc:any
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
  //   this.route.queryParams
  //   .subscribe(params => {
  //     console.log(params); // { orderby: "price" }
  //     this.exam_lat = params['lat'];
  //     this.exam_lng = params['lng'];
  //     this.exam_loc = params['loc']
  //     // console.log(this.orderby); // price
  //   }
  // );
      this.getLocation();
  }


  getLocation() {
    // const L: any;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          var map = L.map('map').setView([12.9480, 80.1397], 13);
          console.log(map)
          console.log(12, 11);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

          var marker = L.marker([this.exam_loc.lat, this.exam_loc.lng]).addTo(map);
          marker.bindPopup(this.exam_loc.loc).openPopup();

          var marker = L.marker([this.lat,this.lng]).addTo(map);
          marker.bindPopup("<b>Your Location</b>").openPopup();
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
