import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import {environment} from '../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  constructor() { }
  // connect():Rx.Subject<MessageEvent>{
  //   this.socket = io('/aaa/xxx')
  //   let observable = new Observable(observer =>{
  //     this.socket.on('message', (data)=>{
  //       console.log('ddddd')
  //       observer.next(data)
  //     })
  //     return ()=>{
  //       this.socket.disconnect();
  //     }
  //   })
  //   let observer = {
  //     next:(data:Object) =>{
  //       this.socket.emit('message', JSON.stringify(data))
  //     },
  //   };
  //   return Rx.Subject.create(observer, observable);
  // }
}
