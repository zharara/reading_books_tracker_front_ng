import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ConfirmationComponent } from "../../shared/components/confirmation/confirmation.component";
import { Category } from "../../models/category";
import { BookService } from "../services/book.service";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "../../categories/services/category.service";
import { CreateOrUpdateBook } from "../../../../app/dashboard/models/book";

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
    categoryService: CategoryService
  ) {
    categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newBookForm = this.fb.group({
      user: this.data?.user._id || "",
      title: [
        this.data?.title || "",
        [Validators.required, Validators.minLength(2)],
      ],
      authors: [
        this.data?.authors || "",
        [Validators.required, Validators.minLength(2)],
      ],
      edition: [this.data?.edition || "", [Validators.required]],
      category: [this.data?.category._id || "", Validators.required],
      bookInfo: [this.data?.bookInfo || ""],
      bookPages: [this.data?.bookPages || "", Validators.required],
      currentReadingPage: [this.data?.currentReadingPage || 0],
    });

    this.formValues = this.newBookForm.value;
  }

  createBook() {
    var createBook: CreateOrUpdateBook = this.newBookForm.value;
    createBook.user = JSON.parse(localStorage.getItem("user") ?? "{}")?._id ?? "";

    this.service.createBook(createBook).subscribe((res: any) => {
      this.service.addLocally(res);
      this.toastr.success("Book Created Succesfully", "Success");
      this.dialog.close(true);
    });
  }

  updateBook() {
    var updateBook: CreateOrUpdateBook = this.newBookForm.value;
    this.service.updateBook(updateBook, this.data._id).subscribe((res: any) => {
      this.service.updateLocally(res);
      this.toastr.success("Book Updated Succesfully", "Success");
      this.dialog.close(true);
    });
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
