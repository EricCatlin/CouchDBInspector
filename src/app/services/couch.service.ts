import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CouchService {
    host: string;
    constructor(private http: HttpClient) {
        this.host = "host";
    }
    get(url: string, callback: Function) {
        return this.http.get(this.host + url).subscribe(data => {
            callback(data);
        });
    }

    get_promise(url: string) {
        return new Promise((resolve, reject) => {
            this.http.get(this.host + url).subscribe(data => {
                resolve(data);
            },error=>{
                reject(error);
            })
        })
    }
    replicate(url: string, data: { source: string, target: string }, callback: Function) {
        return this.http.post(this.host + url, data).subscribe(data => {
            callback(data);
        });
    }

}
