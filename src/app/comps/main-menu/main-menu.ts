import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpenClose } from '../../animations';

export class SubMenuItem{
  name: string = '';
  url: string = '';
  icon: string | null = null;
}

export class MenuItem{
  name: string = '';
  url: string | null = null;
  subMenuItems: SubMenuItem[] | null = null;
  icon: string | null = null;
}

@Component({
  selector: 'app-main-menu',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
  animations: [OpenClose()]
})
export class MainMenu {

  @Input() menuItems: MenuItem [] = [
    { name: 'Home', icon: 'fa fa-home', subMenuItems: null, url: 'main' },
    { name: 'Users', icon: 'fa fa-users', url: null, subMenuItems: [
      { name: 'List', icon: 'fa fa-users', url: 'users' }
    ]
    },
    { name: 'Configuration', icon: 'fa fa-cog', url: null, subMenuItems: [
      { name: 'Parameters', icon: 'fa-solid fa-cubes', url: 'global-parameters' },
    ]},
    { name: 'Logout', icon: 'fa fa-sign-out', subMenuItems: null, url: 'logout' },
  ];
  /* [
    { name: 'Home', icon: 'fa fa-home', subMenuItems: null, url: 'main' },
    { name: 'Assessments', icon: 'fa fa-ticket', url: null, subMenuItems: [
      { name: 'List', icon: 'fa fa-ticket', url: 'assessments' },
      { name: 'Registrations', icon: 'fa-solid fa-book-open', url: 'registrations' },
      { name: 'Quizzes', icon: 'fa-solid fa-pen-clip', url: 'quizzes' },
    ] },
    { name: 'Inboxes', icon: 'fa-solid fa-inbox', subMenuItems: null, url: 'inbox' },
    { name: 'Emails', icon: 'fa-solid fa-envelope', subMenuItems: null, url: 'emails' },
    { name: 'Users', icon: 'fa fa-users', url: null, subMenuItems: [
      { name: 'List', icon: 'fa fa-users', url: 'users' },
      { name: 'Levels', icon: 'fa-solid fa-layer-group', url: 'levels' },
      { name: 'My Certificates', icon: 'fa-solid fa-certificate', url: 'mycertificates' },
      { name: 'Roles', icon: 'fa-solid fa-address-book', url: 'roles' },
      { name: 'Results', icon: 'fa-solid fa-square-poll-vertical', url: 'results' },
    ] },
    { name: 'Federation', icon: 'fa-solid fa-ranking-star', url: null, subMenuItems: [
      { name: 'Clubs', icon: 'fa-solid fa-person-swimming', url: 'clubs' },
      { name: 'Schools', icon: 'fa fa-graduation-cap', url: 'schools' },
    ] },
    { name: 'Configuration', icon: 'fa-solid fa-cog', url: null, subMenuItems: [
      { name: 'Parameters', icon: 'fa-solid fa-cubes', url: 'params' },
      { name: 'Stats', icon: 'fa-solid fa-chart-line', url: 'stats' },
      { name: 'Swin Service', icon: 'fa-solid fa-gauge-high', url: 'swim' },
      { name: 'Seeder', icon: 'fa-solid fa-seedling', url: 'seeder' },
    ] },
    { name: 'Logout', icon: 'fa fa-sign-out', url: 'logout', subMenuItems: null },
  ];
  */

  openedIndex: number | null = null;

  toggleSection(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
}
