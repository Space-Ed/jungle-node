import {Domain, Cell, Junction} from 'jungle-core'

import * as http from 'http'
import * as url from 'url'


function URLtoDesignator(requrl:url.URL, method){
    let groups = requrl.pathname.slice(1).replace(/\//g, '.')
    let term = method.toLowerCase()
    return `${groups}:${term}`
}

export const Mount = {

    handle(req, res){

    },

    load(domain:Domain, seed:any){

        let root:Cell = domain.recover(seed)

        let contacts = root.shell.designate('**:*')

        let urlcontacts = {}

        console.log('detected contacts', Object.keys(contacts))

        let server = http.createServer((req, res)=>{

            let scan = URLtoDesignator(<any>url.parse(req.url), req.method)
            let contact = root.shell.designate(scan)[scan]

            if(contact === undefined){
                res.writeHead(200, { 'Content-Type': 'text/json' });
                res.write(`unable to find path: ${req.url} try:${Object.keys(urlcontacts)}`)
                res.end();
            }else{
                let resp = new Junction()
                .merge(contact.put(req))
                .then(( val ) => {
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.write(val)
                    res.end()
                }).catch(err=>{
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(`unable to find page try ${Object.keys(urlcontacts)}`)
                    res.end();
                })
            }

        })

        server.on('connect', (req, cltSocket, head) => {
            console.log('connection occurred')
        })

        server.listen(7654, '127.0.0.1', ()=>{
            console.log('Server listening')
        })

    }
}
