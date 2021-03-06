(function() {
    const __exports = {};
    let wasm;

    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }

    let WASM_VECTOR_LEN = 0;

    function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
    }

    let cachegetUint32Memory = null;
    function getUint32Memory() {
        if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
            cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachegetUint32Memory;
    }

    function passArray32ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 4);
        getUint32Memory().set(arg, ptr / 4);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
    }

    function getArrayU8FromWasm(ptr, len) {
        return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
    }

    let cachedGlobalArgumentPtr = null;
    function globalArgumentPtr() {
        if (cachedGlobalArgumentPtr === null) {
            cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
    }
    /**
    * Enciphers the buffer.
    * @param {Uint8Array} data
    * @param {number} delta
    * @param {number} rounds
    * @param {Uint32Array} key
    * @returns {Uint8Array}
    */
    __exports.encipher = function(data, delta, rounds, key) {
        const ptr0 = passArray8ToWasm(data);
        const len0 = WASM_VECTOR_LEN;
        const ptr3 = passArray32ToWasm(key);
        const len3 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        wasm.encipher(retptr, ptr0, len0, delta, rounds, ptr3, len3);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        if (rustptr === 0) return;
        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

    /**
    * Decipherd the buffer.
    * @param {Uint8Array} data
    * @param {number} delta
    * @param {number} rounds
    * @param {Uint32Array} key
    * @returns {Uint8Array}
    */
    __exports.decipher = function(data, delta, rounds, key) {
        const ptr0 = passArray8ToWasm(data);
        const len0 = WASM_VECTOR_LEN;
        const ptr3 = passArray32ToWasm(key);
        const len3 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        wasm.decipher(retptr, ptr0, len0, delta, rounds, ptr3, len3);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        if (rustptr === 0) return;
        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

    /**
    * Initiailise, or continue, a crc32 calculation.
    * @param {number} initial
    * @param {Uint8Array} buf
    * @param {number} pos
    * @returns {number}
    */
    __exports.crc32 = function(initial, buf, pos) {
        const ptr1 = passArray8ToWasm(buf);
        const len1 = WASM_VECTOR_LEN;
        try {
            return wasm.crc32(initial, ptr1, len1, pos) >>> 0;

        } finally {
            wasm.__wbindgen_free(ptr1, len1 * 1);

        }

    };

    /**
    * Finalise a CRC32 calculation.
    * @param {number} initial
    * @returns {number}
    */
    __exports.crc_final = function(initial) {
        return wasm.crc_final(initial) >>> 0;
    };

    const heap = new Array(32);

    heap.fill(undefined);

    heap.push(undefined, null, true, false);

    let heap_next = heap.length;

    function dropObject(idx) {
        if (idx < 36) return;
        heap[idx] = heap_next;
        heap_next = idx;
    }

    __exports.__wbindgen_object_drop_ref = function(i) { dropObject(i); };

    function init(module) {
        let result;
        const imports = { './packagedefinition': __exports };
        if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

            const response = fetch(module);
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                result = WebAssembly.instantiateStreaming(response, imports)
                .catch(e => {
                    console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                    return response
                    .then(r => r.arrayBuffer())
                    .then(bytes => WebAssembly.instantiate(bytes, imports));
                });
            } else {
                result = response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            }
        } else {

            result = WebAssembly.instantiate(module, imports)
            .then(result => {
                if (result instanceof WebAssembly.Instance) {
                    return { instance: result, module };
                } else {
                    return result;
                }
            });
        }
        return result.then(({instance, module}) => {
            wasm = instance.exports;
            init.__wbindgen_wasm_module = module;

            return wasm;
        });
    }

    self.wasm_bindgen = Object.assign(init, __exports);

})();
