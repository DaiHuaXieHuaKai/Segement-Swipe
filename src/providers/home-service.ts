import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  constructor(public http: Http) {
  }
  getNews(page) {
    let header = new Headers();
    header.append('apikey', '011e8931911eb46bcae8aefc53bb05bb');
    return new Promise((resolve, reject) => {
      this.http.get('http://apis.baidu.com/txapi/world/world?num=20&page=' + page, { headers: header })
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }
  getJoke(page) {
    return new Promise((resolve, reject) => {
      this.http.get('http://route.showapi.com/341-2?showapi_appid=28250&showapi_sign=fdd7cb6d4f404570827c51d336416ce2&page=' + page)
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

  getHealth(page) {
    return new Promise((resolve, reject) => {
      this.http.get('http://route.showapi.com/96-109?showapi_appid=28250&showapi_sign=fdd7cb6d4f404570827c51d336416ce2&page=' + page)
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

  getPe(page) {
    return new Promise((resolve, reject) => {
      this.http.get('http://route.showapi.com/196-1?showapi_appid=28250&showapi_sign=fdd7cb6d4f404570827c51d336416ce2&num=20&page=' + page)
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

  getSpecial(page) {
    return new Promise((resolve, reject) => {
      this.http.get('http://route.showapi.com/231-1?showapi_appid=28250&showapi_sign=fdd7cb6d4f404570827c51d336416ce2&num=20&page=' + page)
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

  getBeautiful(page) {
    return new Promise((resolve, reject) => {
      this.http.get('http://route.showapi.com/197-1?showapi_appid=28250&showapi_sign=fdd7cb6d4f404570827c51d336416ce2&num=20&page=' + page)
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }
}
