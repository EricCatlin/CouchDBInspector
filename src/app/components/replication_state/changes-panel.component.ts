import { Component, Input } from '@angular/core';
import { CouchService } from '../../services/couch.service';

@Component({
    selector: 'changes-panel',
    templateUrl: './changes-panel.component.html'
})
export class ChangesPanel {
    replication_requested: boolean;
    _changes;
    include_docs: boolean = false;
    @Input() from_db: string;
    @Input() to_db: string;

    to_data: any;
    from_data: any;
    constructor(private couch: CouchService) {
        
    }
    GetChanges() {
        let GET = this.couch.get(this.from_db + '/_changes?include_docs=' + this.include_docs + '&since=' + this.to_data.update_seq);
        GET.then((from_res: any) => {
            from_res.results = from_res.results.sort((a, b) => { return a.changes[0].rev - b.changes[0].rev })
            from_res.doc_index = {};
            this._changes = from_res;
        })
        GET.catch(error => console.log(error));

    }

    TriggerReplication(from_db: string, to_db: string) {
        this.replication_requested = true;
        this.couch.replicate("_replicate", { source: this.from_db, target: this.to_db }, (result) => { this.replication_requested=false; })
    }


}