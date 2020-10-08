import { SaveVehicle, Vehicle, KeyValuePair, MakeResource } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 10;
  vehicles: Vehicle[] = [];
  allVehicles: Vehicle[] = [];
  makes: MakeResource[] = [];
  models: KeyValuePair[] = [];
  filter: any = {};
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {}
  ];


  constructor(private vehicleService: VehicleService) { }

  ngOnInit () {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    console.log(this.queryResult);
  }

  private populateVehicles () {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => { this.queryResult = result });
  }

  onFilterChange () {
    var vehicles = this.queryResult;
    var makeFound = this.makes.find(m => m.id == this.filter.makeId);
    this.models = (makeFound == null) ? [] : makeFound.models;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    if (this.filter.modelId)
      vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);


    this.queryResult = vehicles;
    this.query.page = 1;
    //this.populateVehicles();
  }



  resetFilter () {
    this.filter = {};
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy (columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange (page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
