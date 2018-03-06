import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { HttpHeaders } from '@angular/common/http';
import { masterEncodedCredentials } from 'app/encodedCredentials';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8',
//     'Authorization': 'Basic ' + masterEncodedCredentials.encodedString
//   })
// };

@Injectable()
export class TwitterApiService {

  localEncodedCredentials: string;

  constructor(private http: Http) { }

  encodeCredentials(consumerKey: string, consumerSecret: string) {
    let concatenated = consumerKey + ':' + consumerSecret;
    this.localEncodedCredentials = btoa(concatenated);
    masterEncodedCredentials.encodedString = this.localEncodedCredentials;

    return btoa(concatenated);
  }

  addCustomHeaders(headers:Headers) {
    headers.append('Authorization', 'Basic ' +
      masterEncodedCredentials.encodedString);
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  }

  postToObtainABearerToken() {
    var headers = new Headers();
    this.addCustomHeaders(headers);

    return this.http.post(
      'https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', {
        headers: headers
      }
    );
  }

  getInfoTest() {
    return this.http.get('https://api.twitter.com/1.1/trends/place.json?id=1')
  }

}
