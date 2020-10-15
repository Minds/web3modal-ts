var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ConnectToArkane = (Arkane, opts) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (opts && opts.clientId) {
            try {
                const options = {
                    clientId: opts.clientId,
                    rpcUrl: opts.nodeUrl,
                    environment: opts.environment,
                    signMethod: 'POPUP',
                };
                const provider = yield window.Arkane.createArkaneProviderEngine(options);
                return resolve(provider);
            }
            catch (error) {
                console.error(error);
                return reject(new Error('Failed to login to Arkane 2'));
            }
        }
        else {
            return reject(new Error('Please provide an Arkane client id'));
        }
    }));
};
export default ConnectToArkane;
//# sourceMappingURL=arkane.js.map