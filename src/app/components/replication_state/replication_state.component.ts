import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CouchService } from '../../services/couch.service';
import { ChangesPanel } from './changes-panel.component';
@Component({
    selector: 'replication-state',
    templateUrl: './replication_state.component.html'
})

export class ReplicationState implements AfterViewInit{
    ngAfterViewInit(): void {
    }
    @ViewChild(ChangesPanel) child;

    from: DB;
    to: DB;
    
    from_db: string;
    to_db: string;

    constructor(private couch: CouchService) {
        this.from = new DB();
        this.to = new DB();
        this.GetAllDBs();
        
        this.from_db = "replication_tests";
        this.to_db = "replication_tests_target";
        this.RefreshReplicationData(this.from_db, this.to_db);
    }


    GetAllDBs(){
        let GET = this.couch.get('_all_dbs');
        GET.then((result: any) => {
            this.from.tables = result.map(item=>new Table(item));
            this.to.tables = result.map(item=>new Table(item));
        });
        GET.catch(error=>console.log(error));
    }

    GetFromDB(){
        let GET = this.couch.get('_all_dbs');
        GET.then((result: any) => {
            this.from.tables = result.map(item=>new Table(item));
        });
        GET.catch(error=>console.log(error));
    }

    GetToDB(){
        let GET = this.couch.get('_all_dbs');
        GET.then((result: any) => {
            this.to.tables = result.map(item=>new Table(item));
        });
        GET.catch(error=>console.log(error));
    }


    SelectFromDB() {
        const db = this.from_db;
        this.child.from_data = null;
        let GET = this.couch.get(db);
        GET.then(result => { this.child.from_data = result;
        this.child.GetChanges()})
        GET.catch(error=>console.log(error));
        
    }


    SelectToDB() {
        const db = this.to_db;
        this.child.to_data = null;
        let GET = this.couch.get(db);
        GET.then(result => { this.child.to_data = result; this.child.GetChanges()})
        GET.catch(error=>console.log(error)); 
    }

    RefreshReplicationData(from_db: string, to_db: string) {
        let data = {};
        let GETFROM = this.couch.get(from_db);
        GETFROM.then(result => { this.child.from_data = result; this.Helper();})
        let GETTO = this.couch.get(to_db);
        GETTO.then(result => { this.child.to_data = result; this.Helper(); })
        GETFROM.catch(error=>console.log(error));
        GETTO.catch(error=>console.log(error));

    }
    Helper(){
       
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