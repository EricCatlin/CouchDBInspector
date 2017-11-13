import { Component } from '@angular/core';
import { CouchService } from '../../services/couch.service';

@Component({
    selector: 'replication-state',
    templateUrl: './replication_state.component.html'
})

export class ReplicationState {
    to_current: any;
    from_current: any;

    _changes;


    from: DB;
    to: DB;
    
    include_docs: boolean;



    from_db: string;
    to_db: string;


    from_latest: Object;
    to_latest: Object;



    constructor(private couch: CouchService) {
        this.from = new DB();
        this.to = new DB();
        this.include_docs=false;
        this.GetAllDBs();
        
        this.from_db = "replication_tests";
        this.to_db = "replication_tests_target";
        this.RefreshReplicationData(this.from_db, this.to_db);
    }


    GetAllDBs(){
        let GET = this.couch.get_promise('_all_dbs');
        GET.then((result: any) => {
            this.from.tables = result.map(item=>new Table(item));
            this.to.tables = result.map(item=>new Table(item));
        });
        GET.catch(error=>console.log(error));
    }

    GetFromDB(){
        let GET = this.couch.get_promise('_all_dbs');
        GET.then((result: any) => {
            this.from.tables = result.map(item=>new Table(item));
        });
        GET.catch(error=>console.log(error));
    }

    GetToDB(){
        let GET = this.couch.get_promise('_all_dbs');
        GET.then((result: any) => {
            this.to.tables = result.map(item=>new Table(item));
        });
        GET.catch(error=>console.log(error));
    }


    SelectFromDB() {
        const db = this.from_db;
        this.from_current = null;
        this.couch.get(db, (result) => { this.from_current = result;})
        this._changes = null;
    }


    SelectToDB() {
        const db = this.to_db;
        this.to_current = null;
        this.couch.get(db, (result) => { this.to_current = result;})
        this._changes = null;
    }

    RefreshReplicationData(from_db: string, to_db: string) {
        let data = {};
        this.couch.get(from_db, (result) => { this.from_current = result; this.Helper();})
        this.couch.get(to_db, (result) => { this.to_current = result; this.Helper(); })
        this._changes = null;

    }
    Helper(){
        if(this.from_current && this.to_current) this.GetChanges(this.from_db,this.to_db);
    }

    GetChanges(from_db: string, to_db: string) {
        this.couch.get(from_db + '/_changes?include_docs='+this.include_docs+'&since=' + this.to_current.update_seq, from_res => {
            from_res.results = from_res.results.sort((a, b) => { return a.changes[0].rev - b.changes[0].rev })
            from_res.doc_index = {};
            this._changes = from_res;


        })
    }
    TriggerReplication(from_db: string, to_db: string) {
        this.couch.replicate("_replicate", { source: this.from_db, target: this.to_db }, (result) => { this.GetChanges(from_db,to_db); })
    }
}


export class DB {
    tables;

}

export class Table {
    name: string;
    value: string;
    label: string;
    constructor(name: string) {
        this.name = name;
        this.value = name;
        this.label = name.substring(0,50);
    }
}