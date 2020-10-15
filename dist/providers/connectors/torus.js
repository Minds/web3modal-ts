var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Supports Torus package versions 0.2.*
const ConnectToTorus = (Torus, opts) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            // defaults
            let buttonPosition = 'bottom-left';
            let apiKey = 'torus-default';
            let modalZIndex = 99999;
            let network = { host: 'mainnet' };
            let defaultVerifier = undefined;
            // parsing to Torus interfaces
            network =
                opts.networkParams || opts.network
                    ? Object.assign({ host: opts.network }, opts.networkParams) : network;
            const torus = new Torus({
                buttonPosition: ((_a = opts.config) === null || _a === void 0 ? void 0 : _a.buttonPosition) || buttonPosition,
                apiKey: ((_b = opts.config) === null || _b === void 0 ? void 0 : _b.apiKey) || apiKey,
                modalZIndex: ((_c = opts.config) === null || _c === void 0 ? void 0 : _c.modalZIndex) || modalZIndex,
            });
            yield torus.init(Object.assign(Object.assign({ showTorusButton: false }, opts.config), { network }));
            if (opts.loginParams) {
                defaultVerifier = opts.loginParams.verifier;
            }
            yield torus.login({ verifier: defaultVerifier });
            const provider = torus.provider;
            provider.torus = torus;
            resolve(provider);
        }
        catch (err) {
            reject(err);
        }
    }));
});
export default ConnectToTorus;
//# sourceMappingURL=torus.js.map