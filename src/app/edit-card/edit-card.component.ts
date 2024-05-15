import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Car } from '../car';

@Component({
  selector: 'edit-card',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCardComponent implements OnInit {
  @Input() editedItem!: Car;
  @Output() itemEdited = new EventEmitter<Car>();
  @Output() cancelEdit = new EventEmitter<void>();
  cardForm = new FormGroup({
    name: new FormControl(),
    model: new FormControl(),
    price: new FormControl(),
  });

  ngOnInit(): void {
    this.cardForm.setValue({
      name: this.editedItem.name,
      model: this.editedItem.model,
      price: this.editedItem.price,
    });
  }

  closeForm() {
    this.cancelEdit.emit();
  }

  saveForm() {
    this.itemEdited.emit({
      ...this.editedItem,
      ...this.cardForm.value,
    });
  }
}
