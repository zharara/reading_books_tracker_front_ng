import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ConfirmationComponent } from "../../shared/components/confirmation/confirmation.component";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  newCategoryForm!: FormGroup;
  formValues: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddCategoryComponent>,
    public matDialog: MatDialog,
    private toastr: ToastrService,
    private service: CategoryService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.createForm();
  }

  createForm() {
    this.newCategoryForm = this.fb.group({
      id: [this.data?.id || 20],
      userId: [this.data?.userId || 1],
      name: [
        this.data?.name || "",
        [Validators.required, Validators.minLength(2)],
      ],
    });

    this.formValues = this.newCategoryForm.value;
  }

  createCategory() {
    this.service.createCategory(this.newCategoryForm.value);
    this.toastr.success("Category Created Succesfully", "Success");
    this.dialog.close(true);
  }

  updateCategory() {
    this.service.updateCategory(this.newCategoryForm.value, this.data.id);
    this.toastr.success("Category Updated Succesfully", "Success");
    this.dialog.close(true);
  }

  close() {
    let hasChanges = false;
    Object.keys(this.formValues).forEach((item) => {
      if (this.formValues[item] !== this.newCategoryForm.value[item]) {
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
