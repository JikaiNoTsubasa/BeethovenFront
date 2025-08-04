import { Component, inject } from '@angular/core';
import { Card } from "../../../comps/card/card";
import { DBService } from '../../../services/db.service';
import { GlobalParameter } from '../../../models/dto/GlobalParameter';
import { CommonModule } from '@angular/common';
import { InputTextLive } from "../../../comps/input-text-live/input-text-live";
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-global-parameter',
  imports: [Card, CommonModule, InputTextLive],
  templateUrl: './global-parameter.html',
  styleUrl: './global-parameter.scss'
})
export class GlobalParameterPage {

  dbService = inject(DBService);
  toaster = inject(ToasterService);

  parameters: GlobalParameter[] | null = null;

  params: { [key: string]: GlobalParameter[] } = {};

  ngOnInit(){
    this.refreshParameters();
  }

  refreshParameters(){
    this.dbService.fetchGlobalParameters().subscribe({
      next: (data) => {
        this.parameters = data;
        this.params = this.filterByGroup(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  filterByGroup(params: GlobalParameter[]):{ [group: string]: GlobalParameter[] }{
    return params.reduce((acc, parameter) => {
      const group = parameter.group || 'default'; // Gestion des groupes non définis

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(parameter);
      return acc;
    }, {} as { [group: string]: GlobalParameter[] });
  }

  onParamChange(event: any, code: string) {
    this.toaster.info('Modification en cours...');
    let value = event.target.value;
    this.dbService.updateGlobalParameter(code, value).subscribe({
      next: (data) => {
        this.refreshParameters();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
