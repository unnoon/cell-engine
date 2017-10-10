declare module '*.json' {
    const value: any;
    export default value;
}
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
