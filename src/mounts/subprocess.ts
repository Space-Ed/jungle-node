import * as Jungle from 'jungle-core'
import fs = require('fs')
import subprocess = require('child_process')

export const Mount = {

    init(){

    },

    incomingMessage(){

    },

    load(domain:Jungle.Domain, seed):Jungle.Cell{
        //we must attach to the

        process.stdin.setEncoding('utf8');

        process.stdin.on('readable', () => {
          const chunk = process.stdin.read();

          try {
              if (chunk !== null) {
                  let parsed = JSON.parse(<string>chunk)
                  process.stdout.write(`data: ${chunk}`);
              }
          }catch(e){
              process.stderr.write(e.message)
          }

          let root = domain.recover(seed)
          root.prime(domain)
          return root
        });

        process.stdin.on('end', () => {
          process.stdout.write('end');
        });

        let rootCell = domain.recover(seed)
        rootCell.prime()

        rootCell.shell.designate('**:*')

        return rootCell

    }



}
