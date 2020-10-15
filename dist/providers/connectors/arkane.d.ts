import { IAbstractConnectorOptions } from '../../helpers';
export interface IArkaneConnectorOptions extends IAbstractConnectorOptions {
    clientId: string;
    nodeUrl?: string;
    environment?: string;
}
declare const ConnectToArkane: (Arkane: any, opts: IArkaneConnectorOptions) => Promise<unknown>;
export default ConnectToArkane;
