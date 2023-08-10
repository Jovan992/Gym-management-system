import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/models/news.model';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { NewsletterDialogComponent } from '../dialogs/newsletter-dialog/newsletter-dialog.component';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
})
export class NewsletterComponent implements OnInit {
  ngOnInit(): void {
    this.error = '';
    this.getNews();
  }
  constructor(
    private newsletterService: NewsletterService,
    private dialog: MatDialog,
    private _snackBar: MessageSnackbarService
  ) {}

  news: News[] = [];
  error: string;
  /**
   * Creates news array
   * @param data news articles from API
   */
  createNewsObject(data: any) {
    this.news = data.map((article: any) => {
      return new News(
        article.urlToImage,
        article.title,
        article.description + article.description + article.description
      );
    });
    this.news = this.news.filter((article) => article.img !== null);
  }
  /**
   * Gets news from API
   */
  async getNews() {
    try {
      const data = await this.newsletterService.getJSON(
        this.newsletterService.urlAddress
      );
      this.createNewsObject(data);
    } catch (err: any) {
      this.error = err;
      this._snackBar.openSnackBar(this.error);
    }
  }
  /**
   * Opens Dialog window with the news article
   * @param data News array from api
   */
  openNewsDialog(data: News) {
    const dialogRef = this.dialog.open(NewsletterDialogComponent, {
      autoFocus: false,
      width: '50%',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {},
      error: (err) => {},
    });
  }
}
