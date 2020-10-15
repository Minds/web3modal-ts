var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ConnectToFortmatic = (Fortmatic, opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (opts && opts.key) {
        try {
            const key = opts.key;
            const fm = new Fortmatic(key, opts.network);
            const provider = yield fm.getProvider();
            provider.fm = fm;
            yield fm.user.login();
            const isLoggedIn = yield fm.user.isLoggedIn();
            if (isLoggedIn) {
                return provider;
            }
            else {
                throw new Error('Failed to login to Fortmatic');
            }
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new Error('Missing Fortmatic key');
    }
});
export default ConnectToFortmatic;
//# sourceMappingURL=fortmatic.js.map