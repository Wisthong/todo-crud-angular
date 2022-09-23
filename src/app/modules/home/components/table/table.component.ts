import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { People } from '@modules/home/models/people';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() listPeople!: People[];
  @Output() idEvent = new EventEmitter<string>(true);
  displayedColumns: string[] = [
    'name',
    'lastname',
    'birth',
    'message',
    'options',
  ];
  constructor(
    private readonly toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onDelete(element: People): void {
    if (confirm('¿Estas seguro de eliminar la tarea?')) {
      this.idEvent.emit(element.id);
    }
  }

  onUpdate(element: People) {
    console.log(element.id);
  }
}
