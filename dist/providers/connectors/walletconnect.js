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
const ConnectToWalletConnect = (WalletConnectProvider, opts) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let bridge = 'https://bridge.walletconnect.org';
        let qrcode = true;
        let infuraId = '';
        let rpc = undefined;
        let chainId = 1;
        console.log('wallet connect'); // todo remove dev item
        if (opts) {
            bridge = opts.bridge || bridge;
            qrcode = typeof opts.qrcode !== 'undefined' ? opts.qrcode : qrcode;
            infuraId = opts.infuraId || '';
            rpc = opts.rpc || undefined;
            chainId =
                opts.network && getChainId(opts.network) ? getChainId(opts.network) : 1;
        }
        const provider = new WalletConnectProvider({
            bridge,
            qrcode,
            infuraId,
            rpc,
            chainId,
        });
        try {
            yield provider.enable();
            resolve(provider);
        }
        catch (e) {
            reject(e);
        }
    }));
};
export default ConnectToWalletConnect;
//# sourceMappingURL=walletconnect.js.map