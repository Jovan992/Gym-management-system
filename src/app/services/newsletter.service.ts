import { Injectable } from '@angular/core';
import { MessageSnackbarService } from './message-snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  error: string;
  urlAddress: string =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=86bb8a7ec1da4812b7e4f8bad94d03e8';

  constructor() {}

  async getJSON(url: string) {
    try {
      const fetchPromise = fetch(url);
      console.log(fetchPromise);

      const resp = await fetchPromise;
      const data = await resp.json();
      if (data.status === 'error') {
        throw new Error();
      }
      return data.articles;
    } catch (err: any) {
      err = `Problem getting data, please try again`;
      throw err;
    }
  }
}
