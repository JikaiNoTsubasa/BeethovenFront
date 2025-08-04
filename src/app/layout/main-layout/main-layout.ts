import { Component, inject } from '@angular/core';
import { TopBar } from "../../comps/top-bar/top-bar";
import { MainMenu } from "../../comps/main-menu/main-menu";
import { RouterModule } from '@angular/router';
import { Toaster } from "../../comps/toaster/toaster/toaster";

@Component({
  selector: 'app-main-layout',
  imports: [TopBar, MainMenu, RouterModule, Toaster],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

}
