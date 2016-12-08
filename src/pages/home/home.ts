import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PhotoViewer } from 'ionic-native';

import { HomeService } from "../../providers/home-service";
import { UtilService } from './../../providers/util-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService, UtilService]
})
export class HomePage {
  segmentsArray = ['news', 'joke', 'health', 'pe', 'special', 'beautiful'];
  segmentModel: string = this.segmentsArray[0];
  newsLists: any;
  jokes: any;
  healths: any;
  penews: any;
  specials: any;
  images: any;
  newsPage: number = 1;
  jokePage: number = 1;
  healthPage: number = 1;
  pePage: number = 1;
  specialPage: number = 1;
  imagePage: number = 1;

  constructor(public navCtrl: NavController,
    public service: HomeService,
    public util: UtilService
  ) {
  }

  ionViewDidEnter() {
    this.getData(0, 1);
  }

  doRefresh(refresher) {
    let page: number = 1;
    this.getData(this.segmentsArray.indexOf(this.segmentModel), page);
    refresher.complete();
  }
  doInfinite(infinite) {
    if (this.segmentsArray.indexOf(this.segmentModel) == 0) {
      this.newsPage += 1;
      this.service.getNews(this.newsPage).then((data: any) => {
        this.newsLists = this.newsLists.concat(data.newslist);
      })
      infinite.complete();
    }
    if (this.segmentsArray.indexOf(this.segmentModel) == 1) {
      this.jokePage += 1;
      this.service.getJoke(this.jokePage).then((data: any) => {
        this.jokes = this.jokes.concat(data.showapi_res_body.contentlist);
      })
      infinite.complete();
    }
    if (this.segmentsArray.indexOf(this.segmentModel) == 2) {
      this.healthPage += 1;
      this.service.getHealth(this.healthPage).then((data: any) => {
        this.healths = this.healths.concat(data.showapi_res_body.pagebean.contentlist);
      })
      infinite.complete();
    }
    if (this.segmentsArray.indexOf(this.segmentModel) == 3) {
      this.pePage += 1;
      this.service.getPe(this.pePage).then((data: any) => {
        this.penews = this.penews.concat(data.showapi_res_body.newslist);
      })
      infinite.complete();
    }
    if (this.segmentsArray.indexOf(this.segmentModel) == 4) {
      this.specialPage += 1;
      this.service.getSpecial(this.specialPage).then((data: any) => {
        this.specials = this.specials.concat(data.showapi_res_body.newslist);
      })
      infinite.complete();
    }
    if (this.segmentsArray.indexOf(this.segmentModel) == 5) {
      this.imagePage += 1;
      this.service.getBeautiful(this.imagePage).then((data: any) => {
        this.images = this.images.concat(data.showapi_res_body.newslist);
      })
      infinite.complete();
    }


  }

  swipeEvent(event) {
    //向左滑
    if (event.direction == 2) {
      if (this.segmentsArray.indexOf(this.segmentModel) < 5) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
        this.getData(this.segmentsArray.indexOf(this.segmentModel), 1);
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
        this.getData(this.segmentsArray.indexOf(this.segmentModel), 1);
      }
    }
  }
  clickSegment(num) {
    this.getData(num, 1);
  }
  getData(num, page) {
    switch (num) {
      case 0:
        this.util.showLoading();
        this.service.getNews(page).then((data: any) => {
          this.newsLists = data.newslist;
          this.util.hideLoading();
        }).catch(err => { this.util.hideLoading(); this.util.showToast('获取数据失败', 'top', 1000); })
        break;
      case 1:
        this.util.showLoading();
        this.service.getJoke(page).then((data: any) => {
          this.jokes = data.showapi_res_body.contentlist;
          this.util.hideLoading();
        }).catch(err => { this.util.hideLoading(); this.util.showToast('获取数据失败', 'top', 1000); })
        break;
      case 2:
        this.util.showLoading();
        this.service.getHealth(page).then((data: any) => {
          this.healths = data.showapi_res_body.pagebean.contentlist;
          this.util.hideLoading();
        }).catch(err => { this.util.hideLoading(); this.util.showToast('获取数据失败', 'top', 1000); })
        break;
      case 3:
        this.util.showLoading();
        this.service.getPe(page).then((data: any) => {
          this.penews = data.showapi_res_body.newslist;
          this.util.hideLoading();
        }).catch(err => { this.util.hideLoading(); this.util.showToast('获取数据失败', 'top', 1000); })
        break;
      case 4:
        this.util.showLoading();
        this.service.getSpecial(page).then((data: any) => {
          this.specials = data.showapi_res_body.newslist;
          this.util.hideLoading();
        }).catch(err => { this.util.hideLoading(); this.util.showToast('获取数据失败', 'top', 1000); })
        break;
      case 5:
        this.util.showLoading();
        this.service.getBeautiful(page).then((data: any) => {
          this.images = data.showapi_res_body.newslist;
          this.util.hideLoading();
        }).catch(err => { this.util.hideLoading(); this.util.showToast('获取数据失败', 'top', 1000); })
        break;
    }
  }
  viewImage(url) {
    PhotoViewer.show(url, '', { share: false });
  }
  open(url) {
    this.util.openUrl(url);
  }
}
