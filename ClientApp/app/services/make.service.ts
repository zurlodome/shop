import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MakeService {

    constructor(private htttp: Http) { }

    getMakes() {
        return this.htttp.get("/api/makes")
            .map(res => res.json());
    }
}
