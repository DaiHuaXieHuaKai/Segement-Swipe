import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';

import { ThemeableBrowser } from 'ionic-native';

@Injectable()
export class UtilService {

  loading: any;
  toast: any;
  constructor(public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      showBackdrop: false,
      cssClass: 'backColor'
    })
    this.loading.present();
  }
  hideLoading() {
    this.loading.dismiss();
  }

  showToast(message, position, duration) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    })
    this.toast.present();
  }

  openUrl(url) {
    let options = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        showPageTitle: true
      },
      backButton: {
        wwwImage: 'assets/images/back.png',
        wwwImagePressed: 'assets/images/back.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backPressed'
      },
      backButtonCanClose: true
    };
    this.showLoading();
    let browser = new ThemeableBrowser(url, '_blank', options);
    browser.on('loadstop').subscribe(data => { this.hideLoading() });
  }
}
