import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-newsletter-dialog',
  templateUrl: './newsletter-dialog.component.html',
  styleUrls: ['./newsletter-dialog.component.css'],
})
export class NewsletterDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {}
}
