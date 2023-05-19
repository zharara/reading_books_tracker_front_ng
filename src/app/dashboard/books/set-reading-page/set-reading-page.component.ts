import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ConfirmationComponent } from "../../shared/components/confirmation/confirmation.component";
import { CreateOrUpdateBook } from "../../models/book";
import { BookService } from "../services/book.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-set-reading-page",
  templateUrl: "./set-reading-page.component.html",
  styleUrls: ["./set-reading-page.component.scss"],
})
export class SetReadingPageComponent implements OnInit {
  setReadingForm!: FormGroup;
  formValues: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<SetReadingPageComponent>,
    public matDialog: MatDialog,
    private service: BookService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.setReadingForm = this.fb.group({
      currentReadingPage: [
        this.data?.currentReadingPage || 0,
        Validators.required,
      ],
    });

    this.formValues = this.setReadingForm.value;
  }

  updateReadingPage() {
    let updateBook: CreateOrUpdateBook = {
      user: this.data.user._id,
      title: this.data.title,
      authors: this.data.authors,
      edition: this.data.edition,
      category: this.data.category._id,
      bookPages: this.data.bookPages,
      bookInfo: this.data.bookInfo,
      currentReadingPage: this.setReadingForm.value.currentReadingPage,
    };

    console.log(updateBook);

    this.service.updateBook(updateBook, this.data._id).subscribe((res: any) => {
      this.service.updateLocally(res);
      this.toastr.success("Updated Reading Page Succesfully", "Success");
      this.dialog.close(true);
    });
  }

  close() {
    let hasChanges = false;
    Object.keys(this.formValues).forEach((item) => {
      if (this.formValues[item] !== this.setReadingForm.value[item]) {
        hasChanges = true;
      }
    });

    if (hasChanges) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: "700px",
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
          //
        }
      });
    } else {
      this.dialog.close();
    }
  }
}
