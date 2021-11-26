import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UturuncoUtils } from '../../utils/uturuncoUtils';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UnidadService {
    other_header: any;
    api;

    constructor(private http: HttpClient) {
        this.api = environment.URL + "unidad/";
        //this.api = "http://10.125.31.241:3000/unidad/";
    }
    /* particularidad de la entidad */

    getList(page: string | number, limit: string | number) {
        this.other_header = null;
        return this.http
            .get(this.api + page + "/" + limit, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doUpdate(evento: any, id: string | number) {
        return this.http
            .put(this.api + id, evento, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doDelete(id: string | number) {
        this.other_header = null;
        return this.http
            .delete(this.api + id, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doInsert(evento: any) {
        this.other_header = null;
        return this.http
            .post(this.api, evento, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doCriteria(criteria: any, one: boolean, populate: null, sort: string, page: string | number, limit: string | number) {
        this.other_header = null;

        const cr = {
            criteria: criteria,
            one: one,
            populate: populate,
            sort: sort
        };

        return this.http
            .post(this.api + "criteria/" + page + "/" + limit, cr, {
                headers: this.other_header
            })
            .toPromise().catch(err => {

            });
    }

}