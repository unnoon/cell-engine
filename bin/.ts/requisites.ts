declare module '*.json' {
    const value: any;
    export default value;
}

/* tslint:disable-next-line:no-namespace */
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
