var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ConnectToSquarelink = (Squarelink, opts) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (opts && opts.id) {
            try {
                const id = opts.id;
                const network = opts.network || 'mainnet';
                const config = opts.config;
                const sqlk = new Squarelink(id, network, config);
                const provider = yield sqlk.getProvider();
                provider.sqlk = sqlk;
                yield provider.enable();
                return resolve(provider);
            }
            catch (error) {
                return reject(new Error('Failed to login to Squarelink'));
            }
        }
        else {
            return reject(new Error('Missing Squarelink Id'));
        }
    }));
};
export default ConnectToSquarelink;
//# sourceMappingURL=squarelink.js.map