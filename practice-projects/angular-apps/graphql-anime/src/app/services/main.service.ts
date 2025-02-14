import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly apollo = inject(Apollo);

  query = this.apollo
    .watchQuery({
      query: gql`
        {
          Media(type: ANIME) {
            title {
              english
            }
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      console.log('result:', result);
    });
}
