var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ConnectToBurnerConnect = (BurnerConnectProvider, opts) => __awaiter(void 0, void 0, void 0, function* () {
    opts.defaultNetwork = opts.defaultNetwork || opts.network;
    const provider = new BurnerConnectProvider(opts);
    yield provider.enable();
    return provider;
});
export default ConnectToBurnerConnect;
//# sourceMappingURL=burnerconnect.js.map