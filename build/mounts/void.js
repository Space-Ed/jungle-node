"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mount = {
    load(domain, seed) {
        let root = domain.recover(seed);
        root.prime(domain);
        return root;
    }
};
