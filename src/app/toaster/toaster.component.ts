import { Component, OnInit, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material";

@Component({
  selector: "bm-toaster",
  templateUrl: "./toaster.component.html",
  styleUrls: ["./toaster.component.scss"]
})
export class ToasterComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {}

  getIcon() {
    switch (this.data.type) {
      case "success":
        return "check_circle";
      case "error":
        return "error_outline";
      case "warning":
        return "warning";
      case "info":
        return "notifications";
      case "default":
        return "chat_bubble_outline";
    }
  }
}
