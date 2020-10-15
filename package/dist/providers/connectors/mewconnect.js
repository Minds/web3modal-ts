var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getChainId } from '../../helpers';
const ConnectToMewConnect = (MewConnectProvider, opts) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let infuraId = '';
        let rpc = undefined;
        let chainId = 1;
        if (opts) {
            infuraId = opts.infuraId || '';
            rpc = opts.rpc || undefined;
            if (opts.infuraId && !rpc) {
                rpc = `wss://mainnet.infura.io/ws/v3/${infuraId}`;
            }
            chainId =
                opts.network && getChainId(opts.network) ? getChainId(opts.network) : 1;
        }
        if (!MewConnectProvider.Provider.isConnected) {
            const mewConnect = new MewConnectProvider.Provider();
            const provider = mewConnect.makeWeb3Provider(chainId, rpc, true);
            mewConnect.on('disconnected', () => { });
            try {
                const address = yield mewConnect.enable();
                console.log(address); // todo remove dev item
                resolve(provider);
            }
            catch (e) {
                reject(e);
            }
        }
    }));
};
export default ConnectToMewConnect;
//# sourceMappingURL=mewconnect.js.map