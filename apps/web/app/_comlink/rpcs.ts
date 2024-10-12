import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "./endpoint";

export const rpc: Comlink.Remote<any> = Comlink.wrap(webViewRpcEndpoint, {});
