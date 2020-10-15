var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ConnectToInjected = () => __awaiter(void 0, void 0, void 0, function* () {
    let provider = null;
    if (window.ethereum) {
        provider = window.ethereum;
        try {
            yield window.ethereum.enable();
        }
        catch (error) {
            throw new Error('User Rejected');
        }
    }
    else if (window.web3) {
        provider = window.web3.currentProvider;
    }
    else {
        throw new Error('No Web3 Provider found');
    }
    return provider;
});
export default ConnectToInjected;
//# sourceMappingURL=injected.js.map