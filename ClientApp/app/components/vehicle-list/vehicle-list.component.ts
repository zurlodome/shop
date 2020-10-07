import { SaveVehicle, Vehicle, KeyValuePair, MakeResource } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  allVehicles: Vehicle[] = [];
  makes: MakeResource[] = [];
  models: KeyValuePair[] = [];
  filter: any = {};


  constructor(private vehicleService: VehicleService) { }


  ngOnInit (): void {
    this.vehicleService.getMakes()
      .subscribe(makes => {
        this.makes = makes;
      });

    this.vehicleService.getVehicles()
      .subscribe(vehicles => {
        console.log(vehicles);
        this.vehicles = this.allVehicles = vehicles;
      });
  }

  onFilterChange () {
    var vehicles = this.allVehicles;
    var makeFound = this.makes.find(m => m.id == this.filter.makeId);
    this.models = (makeFound == null) ? [] : makeFound.models;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    if (this.filter.modelId)
      vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);


    this.vehicles = vehicles;
  }



  resetFilter () {
    this.filter = {};
    this.onFilterChange();
  }

}
