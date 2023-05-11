import { Injectable } from '@nestjs/common';
import { HttpCustomService } from '../http/http.service';

@Injectable()
export class NotificationsService {

    // link de firebase
    url: string = "https://fcm.googleapis.com/fcm/send";

    constructor(
        private http: HttpCustomService
    ) { }

    async sendNotification(dataFoto: { token: string, url: string }) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAlhktAmw:APA91bFWM6UCsEJHWEU7BhNSQ1zprL8P8BiLR64Bq8Yl_RCAe-BDfm0tOi-bI7FSV8zB-OqsK0BuoarxN1aC56hiUcm-opkjDkpWCVCmaJLGNdXw1f0vhe4pAYj_xujOxnCsudNHxZ9-'
            }
        }
        const data = {
            "to": dataFoto.token,
            "notification": {
                "title": "Hey! Apareciste en una foto",
                "body": "Guarda tus recuerdos",
            },
            "data": {
                'url': dataFoto.url,
            }
        };
        const response = await this.http.apiPost(this.url, data, header);
        return response;
    }






}
