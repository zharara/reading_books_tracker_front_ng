import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ConfirmationComponent } from "../../shared/components/confirmation/confirmation.component";
import { Categories, Category } from "../../data/categories-data";
import { BookService } from "../services/book.service";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "../../categories/services/category.service";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"],
})
export class AddBookComponent implements OnInit {
  categories: Category[] = [];
  newBookForm!: FormGroup;
  formValues: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddBookComponent>,
    public matDialog: MatDialog,
    private service: BookService,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.categories = categoryService.getAllCategories(null);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newBookForm = this.fb.group({
      id: [this.data?.id || 20],
      timeCreated: [this.data?.timeCreated || new Date()],
      title: [
        this.data?.title || "",
        [Validators.required, Validators.minLength(2)],
      ],
      authors: [
        this.data?.authors || "",
        [Validators.required, Validators.minLength(2)],
      ],
      edition: [this.data?.edition || "", [Validators.required]],
      category: [this.data?.category || "", Validators.required, ],
      bookInfo: [this.data?.bookInfo || ""],
      bookPages: [this.data?.bookPages || "", Validators.required,],
      currentReadingPage: [this.data?.currentReadingPage || 0],
    });

    this.formValues = this.newBookForm.value;
  }

  createBook() {
    this.service.createBook(this.newBookForm.value);
    this.toastr.success("Book Created Succesfully", "Success");
    this.dialog.close(true);
  }

  updateBook() {
    this.service.updateBook(this.newBookForm.value, this.data.id);
    this.toastr.success("Book Updated Succesfully", "Success");
    this.dialog.close(true);
  }

  close() {
    let hasChanges = false;
    Object.keys(this.formValues).forEach((item) => {
      if (this.formValues[item] !== this.newBookForm.value[item]) {
        hasChanges = true;
      }
    });

    if (hasChanges) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: "700px",
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
        }
      });
    } else {
      this.dialog.close();
    }
  }
}
