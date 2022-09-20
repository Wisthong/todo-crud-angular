import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { People } from '@modules/home/models/people';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @Input() listPeople!: People[];
  @Output() idEvent = new EventEmitter<string|undefined>;

  constructor(
    private readonly router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }

  onDelete(id: string | undefined){
    if(confirm('¿Estas seguro?')){
      this.idEvent.emit(id);
    }
  }

  onUpdate(id: string | undefined){
    this.router.navigate(['app/forms/'+id])
  }

}
