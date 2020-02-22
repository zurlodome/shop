import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FeatureService {

    constructor(private htttp: Http) { }

    getFeatures() {
        return this.htttp.get("/api/features")
            .map(res => res.json());
    }
}
