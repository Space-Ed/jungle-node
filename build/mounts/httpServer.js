"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jungle_core_1 = require("jungle-core");
const http = require("http");
const url_1 = require("url");
exports.Mount = {
    load(domain, seed) {
        let root = domain.recover(seed);
        root.prime();
        let contacts = root.shell.designate('**:*');
        let urlcontacts = {};
        for (let token in contacts) {
            let contact = contacts[token];
            if (contact.spec.hasInput) {
                let [url, method] = '/' + token.replace(/\./g, '/').split(/\:/);
                urlcontacts[url] = {};
                urlcontacts[url][method] = contacts[token];
            }
        }
        let server = http.createServer((req, res) => {
            let url = new url_1.URL(req.url);
            if (urlcontacts[url.pathname] === undefined) {
                res.writeHead(404);
                res.end();
            }
            else if (urlcontacts[url.pathname][req.method]) {
                res.writeHead(404);
                res.end();
            }
            else {
                let contact = urlcontacts[url.pathname][req.method];
                let resp = new jungle_core_1.Junction()
                    .merge(contact.put(url.toJSON))
                    .then((val) => {
                    res.writeHead(200, { 'Content-Type': 'text/json' });
                    res.write(JSON.stringify(val));
                    res.end();
                }).catch(err => {
                    res.writeHead(200, { 'Content-Type': 'text/json' });
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
