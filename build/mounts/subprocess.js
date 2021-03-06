"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mount = {
    init() {
    },
    incomingMessage() {
    },
    load(domain, seed) {
        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', () => {
            const chunk = process.stdin.read();
            try {
                if (chunk !== null) {
                    let parsed = JSON.parse(chunk);
                    process.stdout.write(`data: ${chunk}`);
                }
            }
            catch (e) {
                process.stderr.write(e.message);
            }
            let root = domain.recover(seed);
            root.prime(domain);
            return root;
        });
        process.stdin.on('end', () => {
            process.stdout.write('end');
        });
        let rootCell = domain.recover(seed);
        rootCell.prime();
        rootCell.shell.designate('**:*');
        return rootCell;
    }
};
