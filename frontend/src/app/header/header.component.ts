import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Output() senderStateLoginHeader= new EventEmitter<boolean>();

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  toggleSidebar(){

    this.toggleSidebarForMe.emit();

  }

  logout():void{

    this.auth.logout();
    this.senderStateLoginHeader.emit(false);
    this.router.navigate(['/login']);

  }

}
