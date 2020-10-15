var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as list from '../providers';
import { CONNECT_EVENT, ERROR_EVENT, INJECTED_PROVIDER_ID, CACHED_PROVIDER_KEY, } from '../constants';
import { isMobile, getLocal, setLocal, removeLocal, getProviderInfoById, getProviderDescription, filterMatches, getInjectedProvider, findMatchingRequiredOptions, } from '../helpers';
import { EventController } from './events';
export class ProviderController {
    constructor(opts) {
        this.cachedProvider = '';
        this.shouldCacheProvider = false;
        this.disableInjectedProvider = false;
        this.eventController = new EventController();
        this.injectedProvider = null;
        this.providers = [];
        this.network = '';
        this.getUserOptions = () => {
            const mobile = isMobile();
            const defaultProviderList = this.providers.map(({ id }) => id);
            const displayInjected = !!this.injectedProvider && !this.disableInjectedProvider;
            const onlyInjected = displayInjected && mobile;
            const providerList = [];
            if (onlyInjected) {
                providerList.push(INJECTED_PROVIDER_ID);
            }
            else {
                if (displayInjected) {
                    providerList.push(INJECTED_PROVIDER_ID);
                }
                defaultProviderList.forEach((id) => {
                    if (id !== INJECTED_PROVIDER_ID) {
                        const result = this.shouldDisplayProvider(id);
                        if (result) {
                            providerList.push(id);
                        }
                    }
                });
            }
            const userOptions = [];
            providerList.forEach((id) => {
                let provider = this.getProvider(id);
                if (typeof provider !== 'undefined') {
                    const { id, name, logo, connector } = provider;
                    userOptions.push({
                        name,
                        logo,
                        description: getProviderDescription(provider),
                        onClick: () => this.connectTo(id, connector),
                    });
                }
            });
            return userOptions;
        };
        this.connectTo = (id, connector) => __awaiter(this, void 0, void 0, function* () {
            try {
                const providerPackage = this.getProviderOption(id, 'package');
                const providerOptions = this.getProviderOption(id, 'options');
                const opts = Object.assign({ network: this.network || undefined }, providerOptions);
                const provider = yield connector(providerPackage, opts);
                this.eventController.trigger(CONNECT_EVENT, provider);
                if (this.shouldCacheProvider && this.cachedProvider !== id) {
                    this.setCachedProvider(id);
                }
            }
            catch (error) {
                this.eventController.trigger(ERROR_EVENT);
            }
        });
        this.cachedProvider = getLocal(CACHED_PROVIDER_KEY) || '';
        this.disableInjectedProvider = opts.disableInjectedProvider;
        this.shouldCacheProvider = opts.cacheProvider;
        this.providerOptions = opts.providerOptions;
        this.network = opts.network;
        this.injectedProvider = getInjectedProvider();
        this.providers = Object.keys(list.connectors).map((id) => {
            let providerInfo;
            if (id === INJECTED_PROVIDER_ID) {
                providerInfo = this.injectedProvider || list.providers.FALLBACK;
            }
            else {
                providerInfo = getProviderInfoById(id);
            }
            // parse custom display options
            if (this.providerOptions[id]) {
                const options = this.providerOptions[id];
                if (typeof options.display !== 'undefined') {
                    providerInfo = Object.assign(Object.assign({}, providerInfo), this.providerOptions[id].display);
                }
            }
            return Object.assign(Object.assign({}, providerInfo), { connector: list.connectors[id], package: providerInfo.package });
        });
        // parse custom providers
        Object.keys(this.providerOptions)
            .filter(key => key.startsWith('custom-'))
            .map(id => {
            if (id && this.providerOptions[id]) {
                const options = this.providerOptions[id];
                if (typeof options.display !== 'undefined' &&
                    typeof options.connector !== 'undefined') {
                    this.providers.push(Object.assign(Object.assign(Object.assign(Object.assign({}, list.providers.FALLBACK), { id }), options.display), { connector: options.connector }));
                }
            }
        });
    }
    shouldDisplayProvider(id) {
        const provider = this.getProvider(id);
        if (typeof provider !== 'undefined') {
            const providerPackageOptions = this.providerOptions[id];
            if (providerPackageOptions) {
                const isProvided = !!providerPackageOptions.package;
                if (isProvided) {
                    const requiredOptions = provider.package
                        ? provider.package.required
                        : undefined;
                    if (requiredOptions && requiredOptions.length) {
                        const providedOptions = providerPackageOptions.options;
                        if (providedOptions && Object.keys(providedOptions).length) {
                            const matches = findMatchingRequiredOptions(requiredOptions, providedOptions);
                            if (requiredOptions.length === matches.length) {
                                return true;
                            }
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    getProvider(id) {
        return filterMatches(this.providers, x => x.id === id, undefined);
    }
    getProviderOption(id, key) {
        return this.providerOptions &&
            this.providerOptions[id] &&
            this.providerOptions[id][key]
            ? this.providerOptions[id][key]
            : {};
    }
    clearCachedProvider() {
        this.cachedProvider = '';
        removeLocal(CACHED_PROVIDER_KEY);
    }
    setCachedProvider(id) {
        this.cachedProvider = id;
        setLocal(CACHED_PROVIDER_KEY, id);
    }
    connectToCachedProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = this.getProvider(this.cachedProvider);
            if (typeof provider !== 'undefined') {
                yield this.connectTo(provider.id, provider.connector);
            }
        });
    }
    on(event, callback) {
        this.eventController.on({
            event,
            callback,
        });
        return () => this.eventController.off({
            event,
            callback,
        });
    }
    off(event, callback) {
        this.eventController.off({
            event,
            callback,
        });
    }
}
//# sourceMappingURL=providers.js.map