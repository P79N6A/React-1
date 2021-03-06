export interface AbortSignal extends EventTarget {
    aborted: boolean;
    onabort: (ev: Event) => any;
}
export interface AbortSignalConstructor {
    readonly prototype: AbortSignal;
    new (): AbortSignal;
}
export declare let ShimAbortSignal: AbortSignalConstructor;
export interface AbortController {
    readonly signal: AbortSignal;
    abort(): void;
}
export interface AbortControllerConstructor {
    readonly prototype: AbortController;
    new (): AbortController;
}
export declare let ShimAbortController: AbortControllerConstructor;
export default ShimAbortController;
