"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jungle_core_1 = require("jungle-core");
const http = require("http");
const url = require("url");
function URLtoDesignator(requrl, method) {
    let groups = requrl.pathname.slice(1).replace(/\//g, '.');
    let term = method.toLowerCase();
    return `${groups}:${term}`;
}
exports.Mount = {
    handle(req, res) {
    },
    load(domain, seed) {
        let root = domain.recover(seed);
        let contacts = root.shell.designate('**:*');
        let urlcontacts = {};
        console.log('detected contacts', Object.keys(contacts));
        let server = http.createServer((req, res) => {
            let scan = URLtoDesignator(url.parse(req.url), req.method);
            let contact = root.shell.designate(scan)[scan];
            if (contact === undefined) {
                res.writeHead(200, { 'Content-Type': 'text/json' });
                res.write(`unable to find path: ${req.url} try:${Object.keys(urlcontacts)}`);
                res.end();
            }
            else {
                let resp = new jungle_core_1.Junction()
                    .merge(contact.put(req))
                    .then((val) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(val);
                    res.end();
                }).catch(err => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(`unable to find page try ${Object.keys(urlcontacts)}`);
                    res.end();
                });
            }
        });
        server.on('connect', (req, cltSocket, head) => {
            console.log('connection occurred');
        });
        server.listen(7654, '127.0.0.1', () => {
            console.log('Server listening');
        });
    }
};
