import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatBoxComponent} from "./chat-box/chat-box.component";
import {AppComponent} from "./app.component";


const routes: Routes = [
  {
    path: 'chat-box',
    pathMatch: 'full',
    component: ChatBoxComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
