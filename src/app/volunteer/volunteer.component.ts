import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {

  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {  VolunteerService } from './volunteer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-calendar-component',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  styleUrls:['./volunteer.component.css'],
  templateUrl: './volunteer.component.html',
})
export class VolunteerComponent implements OnInit {

  data: any;

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  @ViewChild('map', { static: true })
  map!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  mapData:any;



  refresh = new Subject<void>();

 

  events: CalendarEvent[] = [

  ];



  activeDayIsOpen: boolean = true;
  examDetRef!: NgbModalRef;
  mapDetRef!: NgbModalRef;
  constructor(private modal: NgbModal, private volunteerService: VolunteerService,private cdr: ChangeDetectorRef,private toastr: ToastrService, private router: Router,private route:ActivatedRoute) { }
  cal!: CalendarEvent;
  ngOnInit(): void {
    if(!localStorage.getItem('email')){
      this.toastr.warning('Please login')
      this.router.navigate(['/login/false']);
      
    }
    this.events = [];
    this.initCalendar();

    // this.data.forEach((element: any) => {
    //   //  const temp =  


    //   this.events.push( {
    //     start: new Date(element.date),
    //     title: element.subject,
    //     color: { ...colors['red'] },
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   });

    // });
    console.log(this.events);




  }
initCalendar(){
  this.events = [];
  this.volunteerService.getExams().subscribe((res) => {
    this.data = res;
    // console.log(this.data)
    this.data.forEach((element: any) => {
      console.log(new Date());
      this.cal={
        // start: new Date(element.date),
        start:addHours(startOfDay(new Date(element.date)),2),
        end: addHours(new Date(element.date), 5),
        title: element.subject,
        color: { ...colors['red'] },
        // actions: this.actions,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
        data:element
    };
    console.log(this.cal);
    this.events.push(this.cal);
    });
    this.cdr.detectChanges();
    
  })
}
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date,events,this.activeDayIsOpen);
    
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    console.log(this.activeDayIsOpen)
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(this.modalData);
    
    this.examDetRef = this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        data:null
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  register(data:any){

    this.volunteerService.register(data).subscribe();
    this.toastr.success("Registered successfully!");
    this.initCalendar();
    this.modal.dismissAll();
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  logout(){
    localStorage.removeItem("email");
    this.router.navigate(['/landing']);

  }
  goToMap(address:string){
 
    let [lat,lng,loc] = address.split(',');
    const data: any = { lat: lat ,lng:lng,loc:loc};
    // console.log(lat);
    // this.router.navigate(`../map`);
    // this.examDetRef.close();
    this.mapData = data;
    // console.log(this.modalData);
    
    this.mapDetRef = this.modal.open(this.map, { size: 'lg' });
    // this.router.navigate(
    //   [`../map`], 
    //   {
    //     // relativeTo: this.route,
    //     queryParams:queryParams,
       
    //   });
  }
}
