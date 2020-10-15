var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ConnectToAuthereum = (Authereum, opts = {}) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authereum = new Authereum(Object.assign(Object.assign({}, opts), { networkName: opts.networkName || opts.network }));
            const provider = authereum.getProvider();
            provider.authereum = authereum;
            yield provider.enable();
            resolve(provider);
        }
        catch (error) {
            return reject(error);
        }
    }));
};
export default ConnectToAuthereum;
//# sourceMappingURL=authereum.js.map