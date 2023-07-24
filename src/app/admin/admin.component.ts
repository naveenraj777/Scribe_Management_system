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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {

  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {  AdminService } from './admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
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
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  data: any;

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
    data:any;
  };

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt">Edit</i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="bi bi-trash"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  refresh = new Subject<void>();

  // events: CalendarEvent[] = [];

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1), 
    //   title: 'Oct 6 Sriram Bday',
    //   color: { ...colors['red'] },
    //   // actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    //   data:null
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...colors['yellow'] },
    //   // actions: this.actions,
    //   data:null
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...colors['blue'] },
    //   allDay: true,
    //   data:null
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 0),
    //   end: addHours(new Date(), 5),
    //   // end: startOfDay(new Date('2023-10-06 12:30:00')),
    //   title: 'A draggable and resizable event',
    //   color: { ...colors['yellow'] },
    //   // actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    //   data:null
    // },
  ];



  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private adminService: AdminService,private cdr: ChangeDetectorRef,private toastr: ToastrService,private router: Router) { }
  cal!: CalendarEvent;
  ngOnInit(): void {
    if(!localStorage.getItem('email')){
      this.toastr.warning('Please login')
      this.router.navigate(['/login/true']);
      
    }
    this.adminService.getExams().subscribe((res) => {
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
    console.log("Hiiiii");
    
    let data: any;
    this.adminService.getAllReg(event.data.exam_id).subscribe((res)=>{
      console.log(res);
      
      data = res;
      this.modalData = { event, action ,data};
      console.log(this.modalData.data);
      this.modal.open(this.modalContent, { size: 'lg' });
    })
    
   
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //       data:null
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  register(data:any){

    // this.adminService.register(data).subscribe();
    this.toastr.success("Registered successfully!")

    
  }
  logout(){
    localStorage.removeItem("email");
    this.router.navigate(['/landing']);

  }
}
